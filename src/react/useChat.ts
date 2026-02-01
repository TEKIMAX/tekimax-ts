 import { useCallback, useRef, useState } from 'react'
import type { TekimaxAdapter } from '../core/adapter'
import type { Message } from '../core/types'

export interface UseChatOptions {
    adapter: TekimaxAdapter
    model: string
    initialMessages?: Array<Message>
    onFinish?: (message: Message) => void
    onError?: (error: Error) => void
}

export interface UseChatHelpers {
    messages: Array<Message>
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    append: (message: Message | string) => Promise<void>
    stop: () => void
    isLoading: boolean
}

export function useChat({
    adapter,
    model,
    initialMessages = [],
    onFinish,
    onError,
}: UseChatOptions): UseChatHelpers {
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

    const append = useCallback(
        async (messageOrContent: Message | string) => {
            if (isLoading) return

            const userMessage: Message =
                typeof messageOrContent === 'string'
                    ? { role: 'user', content: messageOrContent }
                    : messageOrContent

            setMessages((prev) => [...prev, userMessage])
            setIsLoading(true)

            const abortController = new AbortController()
            abortControllerRef.current = abortController

            try {
                const currentMessages = [...messages, userMessage]

                // Optimistic assistant message
                setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

                const stream = adapter.chatStream({
                    model,
                    messages: currentMessages,
                    signal: abortController.signal,
                })

                let fullContent = ''

                for await (const chunk of stream) {
                    if (abortController.signal.aborted) break
                    fullContent += chunk.delta
                    setMessages((prev) => {
                        const newMessages = [...prev]
                        const lastMsg = newMessages[newMessages.length - 1]
                        if (lastMsg.role === 'assistant') {
                            lastMsg.content = fullContent
                        }
                        return newMessages
                    })
                }

                if (onFinish && !abortController.signal.aborted) {
                    onFinish({ role: 'assistant', content: fullContent })
                }
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    // User aborted, ignore
                    return
                }
                if (onError) onError(err)
            } finally {
                setIsLoading(false)
                abortControllerRef.current = null
            }
        },
        [adapter, model, messages, isLoading, onFinish, onError],
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
        input,
        handleInputChange,
        handleSubmit,
        append,
        stop,
        isLoading,
    }
}
