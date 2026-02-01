import { TekimaxClient } from './client'
import type { TekimaxAdapter } from '../../core/adapter'
import type { ChatOptions, ChatResult, Message, StreamChunk, ToolCall } from '../../core/types'

export class TekimaxProvider implements TekimaxAdapter {
    readonly name = 'tekimax'
    private client: TekimaxClient

    constructor(options: { baseUrl?: string; apiKey?: string } = {}) {
        this.client = new TekimaxClient(options)
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        // Map Core tools to API tools (Tekimax uses flat structure)
        const tools = options.tools?.map(t => ({
            type: 'function' as const,
            name: t.function.name,
            description: t.function.description ?? undefined,
            parameters: t.function.parameters as any ?? undefined,
        }))

        const response = await this.client.sendMessage(this.getLastUserMessage(options.messages), {
            model: options.model,
            temperature: options.temperature,
            max_output_tokens: options.maxTokens,
            tools,
            signal: options.signal,
        })

        // Check for tool calls
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (response.raw.output) {
            const toolCalls: Array<ToolCall> = []
            for (const item of response.raw.output) {
                if (item.type === 'function_call') {
                    toolCalls.push({
                        id: item.call_id,
                        type: 'function' as const,
                        function: {
                            name: item.name,
                            arguments: item.arguments // Already a string in generated types
                        }
                    })
                }
            }

            if (toolCalls.length > 0) {
                return {
                    message: {
                        role: 'assistant',
                        content: response.text || null,
                        toolCalls
                    }
                }
            }
        }

        if (!response.text) {
            // It's possible to have empty text if tool call (handled above) or just empty
            // But if we are here and no tool calls, it might be an error or empty completion
            if (options.tools && options.tools.length > 0) {
                // Maybe it wanted to call a tool but we missed it?
                // Or it just returned nothing.
                return { message: { role: 'assistant', content: null } }
            }
            throw new Error('No text content in response')
        }

        return {
            message: {
                role: 'assistant',
                content: response.text,
            },
        }
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        // TODO: Map tools for streaming as well
        const tools = options.tools?.map(t => ({
            type: 'function' as const,
            name: t.function.name,
            description: t.function.description ?? undefined,
            parameters: t.function.parameters as any ?? undefined,
        }))

        const stream = this.client.sendMessageStream(this.getLastUserMessage(options.messages), {
            model: options.model,
            temperature: options.temperature,
            max_output_tokens: options.maxTokens,
            tools: tools,
            signal: options.signal,
        })

        for await (const event of stream) {
            if (event.type === 'response.output_text.delta' && event.delta) {
                yield {
                    delta: event.delta,
                }
            }
        }
    }

    private getLastUserMessage(messages: Array<Message>): string {
        const lastUser = messages.slice().reverse().find(m => m.role === 'user')
        return lastUser?.content || ''
    }
}

// Re-export the low-level client for backward compatibility
export { TekimaxClient } from './client'
