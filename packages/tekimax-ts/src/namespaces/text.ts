import { AIProvider, EmbeddingCapability } from '../core/adapter'
import { ChatOptions, ChatResult, StreamChunk, EmbeddingOptions, EmbeddingResult } from '../core/types'

export class TextNamespace<TProvider extends AIProvider> {
    constructor(private provider: TProvider) { }

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
     * Generate embeddings for text input(s). Only available if the provider supports embeddings.
     */
    async embed(
        options: TProvider extends EmbeddingCapability ? EmbeddingOptions : never
    ): Promise<TProvider extends EmbeddingCapability ? EmbeddingResult : never> {
        if (!('embed' in this.provider)) {
            throw new Error(`Provider '${this.provider.name}' does not support embeddings`)
        }
        return (this.provider as unknown as EmbeddingCapability).embed(options as any) as any
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
