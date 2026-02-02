import OpenAI from 'openai'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    StreamChunk
} from 'tekimax-ts'

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
            messages: options.messages as any, // Simple cast for compat
            temperature: options.temperature,
            max_tokens: options.maxTokens,
        })

        const choice = response.choices[0]
        return {
            message: {
                role: 'assistant',
                content: choice?.message?.content || ''
            }
        }
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        const stream = await this.client.chat.completions.create({
            model: options.model || 'grok-beta',
            messages: options.messages as any,
            stream: true,
        })

        for await (const chunk of stream) {
            yield {
                delta: chunk.choices[0]?.delta?.content || ''
            }
        }
    }
}
