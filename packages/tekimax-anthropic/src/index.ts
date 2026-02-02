import Anthropic from '@anthropic-ai/sdk'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    Message,
    StreamChunk,
    ToolDefinition
} from 'tekimax-ts'

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

        const contentBlock = response.content[0]
        if (!contentBlock || contentBlock.type !== 'text') {
            // Handle tool use blocks or empty
            if (contentBlock && contentBlock.type === 'tool_use') {
                // For simplicity, returning empty text for now in this basic adapter ref
                // Full implementation would map tool calls back
                // Anthropic split content/tool_use is different from OpenAI
            }
            // Fallback
            return { message: { role: 'assistant', content: '' } }
        }

        return {
            usage: {
                promptTokens: response.usage.input_tokens,
                completionTokens: response.usage.output_tokens,
                totalTokens: response.usage.input_tokens + response.usage.output_tokens
            },
            message: {
                role: 'assistant',
                content: contentBlock.text
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
        // Basic mapping - Anthropic enforces user/assistant alternation strictly
        return messages
            .filter(m => m.role === 'user' || m.role === 'assistant')
            .map(m => ({
                role: m.role as 'user' | 'assistant',
                content: m.content || ''
            }))
    }

    private mapTool(tool: ToolDefinition): Anthropic.Tool {
        return {
            name: tool.function.name,
            description: tool.function.description,
            input_schema: tool.function.parameters as any
        }
    }
}
