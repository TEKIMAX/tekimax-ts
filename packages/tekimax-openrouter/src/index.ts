import OpenAI from 'openai'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    StreamChunk
} from 'tekimax-ts'

// OpenRouter uses OpenAI-compatible API
export class OpenRouterProvider implements AIProvider {
    name = 'openrouter'
    private client: OpenAI

    constructor(options: { apiKey: string }) {
        this.client = new OpenAI({
            apiKey: options.apiKey,
            baseURL: 'https://openrouter.ai/api/v1',
            defaultHeaders: {
                'HTTP-Referer': 'https://tekimax.com', // Required by OpenRouter
                'X-Title': 'Tekimax SDK'
            }
        })
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        const response = await this.client.chat.completions.create({
            model: options.model,
            messages: options.messages as any,
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
            model: options.model,
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
