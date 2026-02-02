import Anthropic from '@anthropic-ai/sdk'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    Message,
    StreamChunk,
    ToolDefinition
} from '../../core'

export class AnthropicProvider implements AIProvider {
    name = 'anthropic'
    private client: Anthropic

    constructor(options: { apiKey: string }) {
        this.client = new Anthropic({ apiKey: options.apiKey })
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        const response = await this.client.messages.create({
            model: options.model || 'claude-3-5-sonnet-20240620',
            max_tokens: options.maxTokens || 1024,
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
        })

        const textBlocks = response.content.filter(c => c.type === 'text');
        const toolUseBlocks = response.content.filter(c => c.type === 'tool_use');

        const text = textBlocks.map(b => (b as any).text).join('');

        let toolCalls = undefined;
        if (toolUseBlocks.length > 0) {
            toolCalls = toolUseBlocks.map(b => ({
                id: (b as any).id,
                type: 'function' as const,
                function: {
                    name: (b as any).name,
                    arguments: JSON.stringify((b as any).input)
                }
            }))
        }

        return {
            usage: {
                promptTokens: response.usage.input_tokens,
                completionTokens: response.usage.output_tokens,
                totalTokens: response.usage.input_tokens + response.usage.output_tokens
            },
            message: {
                role: 'assistant',
                content: text,
                toolCalls
            }
        }
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        const stream = await this.client.messages.create({
            model: options.model || 'claude-3-5-sonnet-20240620',
            max_tokens: options.maxTokens || 1024,
            messages: this.mapMessages(options.messages),
            stream: true,
        })

        for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
                yield {
                    delta: chunk.delta.text,
                }
            }
        }
    }

    private mapMessages(messages: Message[]): Anthropic.MessageParam[] {
        return messages
            .filter(m => m.role === 'user' || m.role === 'assistant')
            .map(m => {
                let content: string | Anthropic.ContentBlockParam[] = ''
                if (typeof m.content === 'string') {
                    content = m.content || ''
                } else if (Array.isArray(m.content)) {
                    content = m.content.map(part => {
                        if (part.type === 'text') {
                            return { type: 'text' as const, text: part.text }
                        }
                        if (part.type === 'image_url') {
                            const match = part.image_url.url.match(/^data:([^;]+);base64,(.+)$/)
                            if (match) {
                                // Anthropic supports explicit list of media types
                                // "image/jpeg" | "image/png" | "image/gif" | "image/webp"
                                const mimeType = match[1] as any
                                return {
                                    type: 'image' as const,
                                    source: {
                                        type: 'base64' as const,
                                        media_type: mimeType,
                                        data: match[2] || ''
                                    }
                                }
                            }
                        }
                        return { type: 'text' as const, text: '' }
                    }).filter(part => part.text !== '') // Filter out empty parts or failed images?
                }

                return {
                    role: m.role as 'user' | 'assistant',
                    content: content as any
                }
            })
    }

    private mapTool(tool: ToolDefinition): Anthropic.Tool {
        return {
            name: tool.function.name,
            description: tool.function.description,
            input_schema: tool.function.parameters as any
        }
    }
}
