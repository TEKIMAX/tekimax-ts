import OpenAI from 'openai'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    Message,
    StreamChunk,
    ToolDefinition,
    ToolCall
} from '../../core'

// Grok uses OpenAI-compatible API
export class GrokProvider implements AIProvider {
    name = 'grok'
    private client: OpenAI

    constructor(options: { apiKey: string }) {
        this.client = new OpenAI({
            apiKey: options.apiKey,
            baseURL: 'https://api.x.ai/v1'
        })
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        const response = await this.client.chat.completions.create({
            model: options.model || 'grok-beta',
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
            temperature: options.temperature,
            max_tokens: options.maxTokens,
            response_format: options.responseFormat ? { type: options.responseFormat.type } : undefined,
        })

        const choice = response.choices[0]
        if (!choice) throw new Error('No choice returned from Grok')

        return {
            usage: response.usage ? {
                promptTokens: response.usage.prompt_tokens,
                completionTokens: response.usage.completion_tokens,
                totalTokens: response.usage.total_tokens
            } : undefined,
            message: this.mapResponseMessage(choice.message)
        }
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        const stream = await this.client.chat.completions.create({
            model: options.model || 'grok-beta',
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
            temperature: options.temperature,
            max_tokens: options.maxTokens,
            stream: true,
            response_format: options.responseFormat ? { type: options.responseFormat.type } : undefined,
        })

        for await (const chunk of stream) {
            const choice = chunk.choices[0]
            if (!choice) continue

            const delta = choice.delta

            let toolCallDelta: StreamChunk['toolCallDelta'] = undefined
            if (delta.tool_calls && delta.tool_calls.length > 0) {
                const tc = delta.tool_calls[0]
                if (tc) {
                    toolCallDelta = {
                        index: tc.index,
                        id: tc.id,
                        type: 'function',
                        function: tc.function ? {
                            name: tc.function.name,
                            arguments: tc.function.arguments
                        } : undefined
                    }
                }
            }

            yield {
                delta: delta.content || '',
                toolCallDelta,
            }
        }
    }

    private mapMessages(messages: Message[]): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
        return messages.map(m => {
            if (m.role === 'tool') {
                return {
                    role: 'tool',
                    content: (typeof m.content === 'string' ? m.content : '') || '',
                    tool_call_id: m.toolCallId || 'unknown'
                } as OpenAI.Chat.Completions.ChatCompletionToolMessageParam
            }
            if (m.role === 'system') {
                return { role: 'system', content: (typeof m.content === 'string' ? m.content : '') || '' }
            }
            if (m.role === 'user') {
                return { role: 'user', content: (typeof m.content === 'string' ? m.content : '') || '' }
            }
            if (m.role === 'assistant') {
                const tool_calls = m.toolCalls?.map(tc => ({
                    id: tc.id,
                    type: 'function' as const,
                    function: {
                        name: tc.function.name,
                        arguments: tc.function.arguments
                    }
                }))
                return {
                    role: 'assistant',
                    content: (typeof m.content === 'string' ? m.content : '') || null,
                    tool_calls
                } as OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
            }
            throw new Error(`Unknown role: ${m.role}`)
        })
    }

    private mapTool(tool: ToolDefinition): OpenAI.Chat.Completions.ChatCompletionTool {
        return {
            type: 'function',
            function: {
                name: tool.function.name,
                description: tool.function.description,
                parameters: tool.function.parameters as any
            }
        }
    }

    private mapResponseMessage(msg: OpenAI.Chat.Completions.ChatCompletionMessage): Message {
        return {
            role: msg.role,
            content: msg.content || '',
            toolCalls: msg.tool_calls?.map(tc => {
                if (tc.type === 'function') {
                    return {
                        id: tc.id,
                        function: {
                            name: tc.function.name,
                            arguments: tc.function.arguments
                        },
                        type: 'function'
                    }
                }
                return undefined
            }).filter(Boolean) as ToolCall[] | undefined
        } as unknown as Message
    }
}

