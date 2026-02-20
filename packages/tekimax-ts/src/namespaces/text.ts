import { AIProvider, EmbeddingCapability } from '../core/adapter'
import { ChatOptions, ChatResult, StreamChunk, EmbeddingOptions, EmbeddingResult, TekimaxPlugin, PluginContext } from '../core/types'

export class TextNamespace<TProvider extends AIProvider> {
    constructor(private provider: TProvider, private plugins: TekimaxPlugin[] = []) { }

    private async runBeforeRequest(options: ChatOptions): Promise<PluginContext> {
        let context: PluginContext = {
            model: options.model,
            messages: [...options.messages],
            timestamp: Date.now(),
            requestOptions: { ...options }
        }
        for (const plugin of this.plugins) {
            if (plugin.beforeRequest) {
                const updated = await plugin.beforeRequest(context)
                if (updated) context = updated
            }
        }
        return context
    }

    /**
     * Generate text from a prompt (Chat Completion).
     */
    async generate(options: ChatOptions): Promise<ChatResult> {
        const context = await this.runBeforeRequest(options)
        const activeOptions = { ...options, messages: context.messages, model: context.model }

        const result = await this.provider.chat(activeOptions)

        for (const plugin of this.plugins) {
            if (plugin.afterResponse) await plugin.afterResponse(context, result)
        }
        return result
    }

    /**
     * Stream text generation.
     */
    async *generateStream(options: ChatOptions): AsyncGenerator<StreamChunk> {
        const context = await this.runBeforeRequest(options)
        const activeOptions = { ...options, messages: context.messages, model: context.model }

        for await (const chunk of this.provider.chatStream(activeOptions)) {
            for (const plugin of this.plugins) {
                if (plugin.onStreamChunk) plugin.onStreamChunk(context, chunk)
            }
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
