import { AIProvider } from '../core/adapter'
import { ChatOptions, ChatResult, StreamChunk } from '../core/types'

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
