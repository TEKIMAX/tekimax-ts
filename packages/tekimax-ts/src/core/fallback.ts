import type { AIProvider } from './adapter'
import type { ChatOptions, ChatResult, StreamChunk } from './types'

export interface FallbackProviderOptions {
    /**
     * Custom predicate to determine if an error should trigger a fallback.
     * Default: falls back on any error.
     */
    shouldFallback?: (error: Error, providerName: string) => boolean

    /**
     * Called when a provider fails and the SDK falls back to the next one.
     * Useful for logging or monitoring.
     */
    onFallback?: (error: Error, failedProvider: string, nextProvider: string) => void
}

/**
 * A provider that tries multiple providers in order, falling back on failure.
 *
 * If the first provider throws, it tries the second, then the third, etc.
 * If all providers fail, the last error is thrown.
 *
 * @example
 * ```ts
 * const provider = new FallbackProvider([
 *   new OpenAIProvider({ apiKey: process.env.OPENAI_API_KEY! }),
 *   new AnthropicProvider({ apiKey: process.env.ANTHROPIC_API_KEY! }),
 *   new GeminiProvider({ apiKey: process.env.GEMINI_API_KEY! }),
 * ])
 *
 * const client = new Tekimax({ provider })
 * // If OpenAI is down, it automatically tries Anthropic, then Gemini
 * ```
 */
export class FallbackProvider implements AIProvider {
    name: string
    private providers: AIProvider[]
    private options: FallbackProviderOptions

    constructor(providers: AIProvider[], options: FallbackProviderOptions = {}) {
        if (providers.length === 0) {
            throw new Error('FallbackProvider requires at least one provider')
        }
        this.providers = providers
        this.options = options
        this.name = `fallback(${providers.map(p => p.name).join(', ')})`
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        return this.tryProviders(
            (provider) => provider.chat(options),
            'chat'
        )
    }

    chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        const self = this
        const iterable: AsyncIterable<StreamChunk> = {
            [Symbol.asyncIterator]() {
                let resolved = false
                let innerIterator: AsyncIterator<StreamChunk> | null = null

                return {
                    async next() {
                        if (!resolved) {
                            // Try each provider for the stream connection
                            const stream = await self.tryProviders(
                                async (provider) => provider.chatStream(options),
                                'chatStream'
                            )
                            innerIterator = stream[Symbol.asyncIterator]()
                            resolved = true
                        }
                        return innerIterator!.next()
                    },
                    async return() {
                        if (innerIterator?.return) {
                            return innerIterator.return()
                        }
                        return { value: undefined as any, done: true }
                    }
                }
            }
        }
        return iterable
    }

    // --- Multi-modal: delegate to first provider that supports the capability ---

    get generateImage() {
        const provider = this.providers.find(p => p.generateImage)
        return provider?.generateImage?.bind(provider)
    }

    get editImage() {
        const provider = this.providers.find(p => p.editImage)
        return provider?.editImage?.bind(provider)
    }

    get analyzeImage() {
        const provider = this.providers.find(p => p.analyzeImage)
        return provider?.analyzeImage?.bind(provider)
    }

    get generateSpeech() {
        const provider = this.providers.find(p => p.generateSpeech)
        return provider?.generateSpeech?.bind(provider)
    }

    get transcribeAudio() {
        const provider = this.providers.find(p => p.transcribeAudio)
        return provider?.transcribeAudio?.bind(provider)
    }

    get generateVideo() {
        const provider = this.providers.find(p => p.generateVideo)
        return provider?.generateVideo?.bind(provider)
    }

    get analyzeVideo() {
        const provider = this.providers.find(p => p.analyzeVideo)
        return provider?.analyzeVideo?.bind(provider)
    }

    get embed() {
        const provider = this.providers.find(p => p.embed)
        return provider?.embed?.bind(provider)
    }

    /**
     * Try each provider in order. On failure, fall back to the next.
     */
    private async tryProviders<T>(
        fn: (provider: AIProvider) => Promise<T>,
        method: string
    ): Promise<T> {
        let lastError: Error | null = null

        for (let i = 0; i < this.providers.length; i++) {
            const provider = this.providers[i]!
            try {
                return await fn(provider)
            } catch (error: any) {
                lastError = error

                // Check if we should fallback
                if (this.options.shouldFallback && !this.options.shouldFallback(error, provider.name)) {
                    throw error // User says don't fallback for this error
                }

                // Notify about the fallback
                const nextProvider = this.providers[i + 1]
                if (nextProvider && this.options.onFallback) {
                    this.options.onFallback(error, provider.name, nextProvider.name)
                }
            }
        }

        throw lastError || new Error(`All providers failed for ${method}`)
    }
}
