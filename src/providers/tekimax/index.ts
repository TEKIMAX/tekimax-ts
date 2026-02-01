import type { TekimaxAdapter } from '../../core/adapter'
import type { ChatOptions, ChatResult, StreamChunk, Message } from '../../core/types'
import { TekimaxClient } from './client'

export class TekimaxProvider implements TekimaxAdapter {
    readonly name = 'tekimax'
    private client: TekimaxClient

    constructor(options: { baseUrl?: string; apiKey?: string } = {}) {
        this.client = new TekimaxClient(options)
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        const response = await this.client.sendMessage(this.getLastUserMessage(options.messages), {
            model: options.model,
            temperature: options.temperature,
            max_output_tokens: options.maxTokens,
        })

        if (!response.text) {
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
        const stream = this.client.sendMessageStream(this.getLastUserMessage(options.messages), {
            model: options.model,
            temperature: options.temperature,
            max_output_tokens: options.maxTokens,
        })

        for await (const event of stream) {
            if (event.type === 'response.output_text.delta' && event.delta) {
                yield {
                    delta: event.delta,
                }
            }
        }
    }

    private getLastUserMessage(messages: Message[]): string {
        const lastUser = messages.slice().reverse().find(m => m.role === 'user')
        return lastUser ? lastUser.content : ''
    }
}

// Re-export the low-level client for backward compatibility
export { TekimaxClient } from './client'
