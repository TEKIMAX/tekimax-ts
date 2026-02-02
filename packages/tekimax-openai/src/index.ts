import OpenAI from 'openai'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    Message,
    StreamChunk,
    ToolDefinition,
    ToolCall
} from 'tekimax-ts'

export class OpenAIProvider implements AIProvider {
    name = 'openai'
    private client: OpenAI

    constructor(options: { apiKey: string }) {
        this.client = new OpenAI({ apiKey: options.apiKey })
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        const response = await this.client.chat.completions.create({
            model: options.model,
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
            temperature: options.temperature,
            max_tokens: options.maxTokens,
        })

        const choice = response.choices[0]
        if (!choice) throw new Error('No choice returned from OpenAI')

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
            model: options.model,
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
            temperature: options.temperature,
            max_tokens: options.maxTokens,
            stream: true,
        })

        for await (const chunk of stream) {
            const choice = chunk.choices[0]
            if (!choice) continue

            yield {
                delta: choice.delta.content || '',
                usage: undefined, // OpenAI stream doesn't always perform usage
            }
        }
    }

    // --- Mappers ---

    private mapMessages(messages: Message[]): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
        return messages.map(m => {
            if (m.role === 'tool') {
                return {
                    role: 'tool',
                    content: m.content || '',
                    tool_call_id: (m as any).toolCallId || 'unknown'
                } as OpenAI.Chat.Completions.ChatCompletionToolMessageParam
            }
            if (m.role === 'user') {
                return { role: 'user', content: m.content || '' }
            }
            if (m.role === 'system') {
                return { role: 'system', content: m.content || '' }
            }
            if (m.role === 'assistant') {
                const tool_calls = (m as any).toolCalls?.map((tc: any) => ({
                    id: tc.id,
                    type: 'function' as const,
                    function: {
                        name: tc.function.name,
                        arguments: tc.function.arguments
                    }
                }))
                return {
                    role: 'assistant',
                    content: m.content || null,
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
            toolCalls: msg.tool_calls?.map(tc => ({
                id: tc.id,
                function: {
                    name: tc.function.name,
                    arguments: tc.function.arguments
                },
                type: 'function'
            }))
        } as unknown as Message
    }
}
