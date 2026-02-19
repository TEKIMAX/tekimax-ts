import { useCallback, useRef, useState } from 'react'
import type { AIProvider } from '../core/adapter'
import type { Message, Tool, ToolDefinition } from '../core/types'
import { Tekimax } from '../tekimax'

export interface UseChatOptions<TProvider extends AIProvider = AIProvider> {
    api?: string
    adapter?: TProvider
    client?: Tekimax<TProvider>
    model: string
    initialMessages?: Array<Message>
    tools?: Record<string, Tool>
    onFinish?: (message: Message) => void
    onError?: (error: Error) => void
    think?: boolean
    body?: any // Custom body attachments
}

export interface UseChatHelpers {
    messages: Array<Message>
    setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    append: (message: Message | string) => Promise<void>
    stop: () => void
    isLoading: boolean
}

export function useChat<TProvider extends AIProvider = AIProvider>({
    api,
    adapter,
    client,
    model,
    initialMessages = [],
    tools,
    body,
    onFinish,
    onError,
    think,
}: UseChatOptions<TProvider>): UseChatHelpers {
    const [messages, setMessages] = useState<Array<Message>>(initialMessages)
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const abortControllerRef = useRef<AbortController | null>(null)

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setInput(e.target.value)
        },
        [],
    )

    const stop = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
            abortControllerRef.current = null
            setIsLoading(false)
        }
    }, [])

    const processChat = useCallback(
        async (currentMessages: Message[]) => {
            setIsLoading(true)

            const abortController = new AbortController()
            abortControllerRef.current = abortController

            try {
                // Optimistic assistant message
                setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

                let stream: AsyncIterable<any>

                // Convert tools map to array of definitions
                const toolDefinitions: ToolDefinition[] | undefined = tools
                    ? Object.values(tools).map(t => ({
                        type: 'function',
                        function: t.function
                    }))
                    : undefined

                const options = {
                    model,
                    messages: currentMessages,
                    tools: toolDefinitions,
                    signal: abortController.signal,
                    think
                }

                if (api) {
                    // Shim standard HTTP Fetch response into AsyncIterable Stream to satisfy core logic
                    stream = (async function* () {
                        const res = await fetch(api, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ messages: currentMessages, model, ...body }),
                            signal: abortController.signal
                        })
                        if (!res.ok) throw new Error(await res.text())
                        const data = await res.json()
                        yield { delta: data.content }
                    })()
                } else if (client) {
                    stream = client.text.generateStream(options)
                } else if (adapter) {
                    stream = adapter.chatStream(options)
                } else {
                    throw new Error("useChat: No api router, client, or adapter provided")
                }

                let fullContent = ''
                let toolCallAccumulator: Record<number, {
                    index: number,
                    id?: string,
                    type: 'function',
                    function: { name: string, arguments: string }
                }> = {}

                for await (const chunk of stream) {
                    if (abortController.signal.aborted) break

                    fullContent += chunk.delta

                    if (chunk.toolCallDelta) {
                        const tc = chunk.toolCallDelta
                        if (!toolCallAccumulator[tc.index]) {
                            toolCallAccumulator[tc.index] = {
                                index: tc.index,
                                id: tc.id,
                                type: 'function',
                                function: { name: '', arguments: '' }
                            }
                        }
                        const acc = toolCallAccumulator[tc.index]! // Non-null assertion safe due to init above
                        if (tc.id) acc.id = tc.id
                        if (tc.function?.name) acc.function.name += tc.function.name
                        if (tc.function?.arguments) acc.function.arguments += tc.function.arguments
                    }

                    // Update UI (text only)
                    setMessages((prev) => {
                        const newMessages = [...prev]
                        const lastMsg = newMessages[newMessages.length - 1]
                        if (lastMsg && lastMsg.role === 'assistant') {
                            lastMsg.content = fullContent
                        }
                        return newMessages
                    })
                }

                // Handling post-stream (Tools)
                const finalToolCalls = Object.values(toolCallAccumulator).map(tc => ({
                    id: tc.id || `call_${Math.random().toString(36).slice(2)}`,
                    type: 'function' as const,
                    function: {
                        name: tc.function.name,
                        arguments: tc.function.arguments
                    }
                }))

                if (finalToolCalls.length > 0) {
                    // Update assistant message with tool calls
                    let assistantMessage: Message = {
                        role: 'assistant',
                        content: fullContent || null, // Ensure explicitly null if empty string provided there are tool calls? OpenAI allows content + tool_calls.
                        toolCalls: finalToolCalls
                    }

                    // Update state with final assistant message including tool calls
                    setMessages(prev => {
                        const newMessages = [...prev]
                        newMessages[newMessages.length - 1] = assistantMessage
                        return newMessages
                    })

                    // Execute tools
                    const toolResultMessages: Message[] = []

                    for (const tc of finalToolCalls) {
                        const tool = tools?.[tc.function.name]
                        if (tool) {
                            try {
                                const args = JSON.parse(tc.function.arguments)
                                const result = await tool.execute(args)
                                toolResultMessages.push({
                                    role: 'tool',
                                    toolCallId: tc.id,
                                    name: tc.function.name,
                                    content: JSON.stringify(result)
                                })
                            } catch (e: any) {
                                toolResultMessages.push({
                                    role: 'tool',
                                    toolCallId: tc.id,
                                    name: tc.function.name,
                                    content: JSON.stringify({ error: e.message })
                                })
                            }
                        } else {
                            // Tool not found
                            toolResultMessages.push({
                                role: 'tool',
                                toolCallId: tc.id,
                                name: tc.function.name,
                                content: JSON.stringify({ error: "Tool not found on client" })
                            })
                        }
                    }

                    // Append tool results to local state
                    setMessages(prev => [...prev, ...toolResultMessages])

                    // Recursive call
                    if (!abortController.signal.aborted) {
                        // We must pass the updated history including assistant + tool results
                        await processChat([...currentMessages, assistantMessage, ...toolResultMessages])
                    }

                } else {
                    if (onFinish && !abortController.signal.aborted) {
                        onFinish({ role: 'assistant', content: fullContent })
                    }
                }

            } catch (err: any) {
                if (err.name === 'AbortError') {
                    // User aborted, ignore
                    return
                }
                if (onError) onError(err)
            } finally {
                // Only unset loading if we are NOT recursing (handled by logic flow?) 
                // Wait, processChat sets isLoading(true) at top. 
                // Note: Recursing calls processChat which creates NEW abort controller etc.
                // We should be careful about state.
                // If recursing, the NEXT processChat will set isLoading=true.
                // THIS processChat will finish.
                // But we await the recursive call! 
                // So isLoading will finally be set to false when the whole chain unwinds.
                if (abortControllerRef.current === abortController) {
                    // Check if we are really done?
                    // Actually, we don't know if the recursive call finished or not if we don't await/track.
                    // But we DO await processChat. 
                    // So when the top level processChat returns, everything is done.
                    setIsLoading(false)
                    abortControllerRef.current = null
                }
            }
        },
        [adapter, client, model, tools, onFinish, onError, think]
    )


    const append = useCallback(
        async (messageOrContent: Message | string) => {
            if (isLoading) return

            const userMessage: Message =
                typeof messageOrContent === 'string'
                    ? { role: 'user', content: messageOrContent }
                    : messageOrContent

            setMessages((prev) => [...prev, userMessage])

            // Start processing with current messages + new user message
            await processChat([...messages, userMessage])
        },
        [isLoading, messages, processChat],
    )

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (!input.trim()) return
            append(input)
            setInput('')
        },
        [input, append],
    )

    return {
        messages,
        setMessages,
        input,
        handleInputChange,
        handleSubmit,
        append,
        stop,
        isLoading,
    }
}
