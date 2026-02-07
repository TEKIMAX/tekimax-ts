import { AIProvider } from '../core/adapter'
import { ChatOptions, ChatResult, StreamChunk, EmbeddingOptions, EmbeddingResult } from '../core/types'

export class TextNamespace {
    constructor(private provider: AIProvider) { }

    /**
     * Generate text from a prompt (Chat Completion).
     */
    async generate(options: ChatOptions): Promise<ChatResult> {
        return this.provider.chat(options)
    }

    /**
     * Stream text generation.
     */
    async *generateStream(options: ChatOptions): AsyncGenerator<StreamChunk> {
        for await (const chunk of this.provider.chatStream(options)) {
            yield chunk
        }
    }

    /**
     * Generate embeddings for text input(s).
     */
    async embed(options: EmbeddingOptions): Promise<EmbeddingResult> {
        if (!this.provider.embed) {
            throw new Error(`Provider '${this.provider.name}' does not support embeddings`)
        }
        return this.provider.embed(options)
    }

    // Alias for 'chat' to match OpenAI conventions if needed
    get chat() {
        return {
            completions: {
                create: (options: ChatOptions) => this.generate(options),
                createStream: (options: ChatOptions) => this.generateStream(options)
            }
        }
    }
}

