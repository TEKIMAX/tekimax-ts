import type { AIProvider } from './adapter'
import type { GenerateTextResult, Message, Tool } from './types'

export interface GenerateTextOptions {
    model: string
    messages: Array<Message>
    tools?: Record<string, Tool>
    maxSteps?: number
    temperature?: number
    maxTokens?: number
    signal?: AbortSignal
}

export async function generateText({
    adapter,
    ...options
}: GenerateTextOptions & { adapter: AIProvider }): Promise<GenerateTextResult> {
    const { model, tools, maxSteps = 1, temperature, maxTokens, signal } = options
    const currentMessages = [...options.messages]
    let steps = 0

    // Transform tools map to array for caching/adapter
    const toolDefinitions = tools ? Object.values(tools) : undefined

    while (steps < maxSteps) {
        steps++

        const result = await adapter.chat({
            model,
            messages: currentMessages,
            tools: toolDefinitions,
            temperature,
            maxTokens,
            signal,
        })

        const { message } = result
        currentMessages.push(message)

        // If no tool calls, we are done
        if (!message.toolCalls || message.toolCalls.length === 0) {
            return {
                text: typeof message.content === 'string'
                    ? message.content || ''
                    : Array.isArray(message.content)
                        ? message.content.filter(p => p.type === 'text').map(p => (p as any).text).join('')
                        : '',
                toolCalls: [],
                toolResults: [],
                finishReason: 'stop',
                usage: result.usage || { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
            }
        }

        // Handle Tool Calls
        const toolResults = await Promise.all(
            message.toolCalls.map(async (call) => {
                const tool = tools?.[call.function.name]
                if (!tool) {
                    return {
                        id: call.id,
                        result: `Error: Tool ${call.function.name} not found`,
                    }
                }

                try {
                    const args = JSON.parse(call.function.arguments)
                    const output = await tool.execute(args)
                    return {
                        id: call.id,
                        result: output,
                    }
                } catch (error: any) {
                    return {
                        id: call.id,
                        result: `Error executing tool: ${error.message}`,
                    }
                }
            })
        )

        // Add tool results to messages
        for (const res of toolResults) {
            currentMessages.push({
                role: 'tool',
                content: JSON.stringify(res.result),
                toolCallId: res.id,
                name: message.toolCalls.find(c => c.id === res.id)?.function.name,
            })
        }

        // Loop continues to next step to let model process results
    }

    // If we exit loop, max steps reached
    return {
        text: '',
        toolCalls: [],
        toolResults: [],
        finishReason: 'length', // or 'tool_calls' if strictly ending on tools
        usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
        warnings: ['Max steps reached'],
    }
}
