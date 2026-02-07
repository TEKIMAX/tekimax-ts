import type { AIProvider } from './adapter'
import type { ChatOptions, ChatResult, StreamChunk } from './types'

/**
 * Middleware interface for intercepting provider calls.
 *
 * - `beforeChat`: Runs before each chat/chatStream call. Can modify options.
 * - `afterChat`: Runs after each chat call completes. Can modify the result.
 * - `onError`: Runs when a chat call throws. Can recover, re-throw, or log.
 *
 * All hooks are optional. Middleware runs in array order for `before` hooks
 * and reverse order for `after` hooks (onion model).
 */
export interface Middleware {
    name?: string

    /**
     * Intercept before a chat request is sent.
     * Return modified options to alter the request, or return as-is to pass through.
     */
    beforeChat?: (options: ChatOptions) => Promise<ChatOptions> | ChatOptions

    /**
     * Intercept after a chat response is received.
     * Return modified result to alter the response, or return as-is to pass through.
     */
    afterChat?: (result: ChatResult, options: ChatOptions) => Promise<ChatResult> | ChatResult

    /**
     * Handle errors from chat calls.
     * Throw to propagate, return a ChatResult to recover.
     */
    onError?: (error: Error, options: ChatOptions) => Promise<ChatResult | void> | ChatResult | void

    /**
     * Intercept each streaming chunk.
     * Return modified chunk, or return as-is to pass through.
     */
    onStreamChunk?: (chunk: StreamChunk, options: ChatOptions) => StreamChunk
}

/**
 * Wrap a provider with middleware interceptors.
 *
 * Middleware runs in the order provided for `beforeChat` and `onStreamChunk`,
 * and in reverse order for `afterChat` (onion/pipeline model).
 *
 * @example
 * ```ts
 * const logger: Middleware = {
 *   name: 'logger',
 *   beforeChat: async (options) => {
 *     console.log('→', options.model)
 *     return options
 *   },
 *   afterChat: async (result) => {
 *     console.log('←', result.usage?.totalTokens, 'tokens')
 *     return result
 *   },
 * }
 *
 * const provider = wrapProvider(openaiProvider, [logger])
 * const client = new Tekimax({ provider })
 * ```
 */
export function wrapProvider(
    provider: AIProvider,
    middlewares: Middleware[]
): AIProvider {
    return {
        ...provider,
        name: provider.name,

        chat: createWrappedChat(provider, middlewares),
        chatStream: createWrappedChatStream(provider, middlewares),

        // Multi-modal methods pass through unmodified.
        // Middleware only applies to chat/chatStream for now.
        generateImage: provider.generateImage?.bind(provider),
        editImage: provider.editImage?.bind(provider),
        analyzeImage: provider.analyzeImage?.bind(provider),
        generateSpeech: provider.generateSpeech?.bind(provider),
        transcribeAudio: provider.transcribeAudio?.bind(provider),
        generateVideo: provider.generateVideo?.bind(provider),
        analyzeVideo: provider.analyzeVideo?.bind(provider),
    }
}

function createWrappedChat(
    provider: AIProvider,
    middlewares: Middleware[]
): AIProvider['chat'] {
    return async (options: ChatOptions): Promise<ChatResult> => {
        // Run beforeChat in order
        let currentOptions = options
        for (const mw of middlewares) {
            if (mw.beforeChat) {
                currentOptions = await mw.beforeChat(currentOptions)
            }
        }

        try {
            let result = await provider.chat(currentOptions)

            // Run afterChat in reverse order (onion model)
            for (let i = middlewares.length - 1; i >= 0; i--) {
                const mw = middlewares[i]!
                if (mw.afterChat) {
                    result = await mw.afterChat(result, currentOptions)
                }
            }

            return result
        } catch (error: any) {
            // Run onError in order — first one to return a result wins
            for (const mw of middlewares) {
                if (mw.onError) {
                    const recovered = await mw.onError(error, currentOptions)
                    if (recovered) return recovered
                }
            }
            throw error
        }
    }
}

function createWrappedChatStream(
    provider: AIProvider,
    middlewares: Middleware[]
): AIProvider['chatStream'] {
    return (options: ChatOptions): AsyncIterable<StreamChunk> => {
        const iterable: AsyncIterable<StreamChunk> = {
            [Symbol.asyncIterator]() {
                let innerIterator: AsyncIterator<StreamChunk> | null = null
                let resolvedOptions: ChatOptions = options

                return {
                    async next() {
                        if (!innerIterator) {
                            // Run beforeChat in order
                            for (const mw of middlewares) {
                                if (mw.beforeChat) {
                                    resolvedOptions = await mw.beforeChat(resolvedOptions)
                                }
                            }

                            try {
                                const stream = provider.chatStream(resolvedOptions)
                                innerIterator = stream[Symbol.asyncIterator]()
                            } catch (error: any) {
                                for (const mw of middlewares) {
                                    if (mw.onError) {
                                        await mw.onError(error, resolvedOptions)
                                    }
                                }
                                throw error
                            }
                        }

                        const result = await innerIterator.next()

                        if (result.done) {
                            return result
                        }

                        // Run onStreamChunk in order
                        let chunk = result.value
                        for (const mw of middlewares) {
                            if (mw.onStreamChunk) {
                                chunk = mw.onStreamChunk(chunk, resolvedOptions)
                            }
                        }

                        return { value: chunk, done: false }
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
}

// --- Built-in Middleware ---

/**
 * Logging middleware — logs model, token usage, and latency to console.
 *
 * @example
 * ```ts
 * const provider = wrapProvider(openaiProvider, [loggingMiddleware()])
 * ```
 */
export function loggingMiddleware(options?: { prefix?: string }): Middleware {
    const prefix = options?.prefix || '[tekimax]'
    let startTime: number

    return {
        name: 'logging',
        beforeChat: async (opts) => {
            startTime = Date.now()
            console.log(`${prefix} → ${opts.model} (${opts.messages.length} messages)`)
            return opts
        },
        afterChat: async (result, opts) => {
            const elapsed = Date.now() - startTime
            const tokens = result.usage?.totalTokens ?? '?'
            console.log(`${prefix} ← ${opts.model} (${tokens} tokens, ${elapsed}ms)`)
            return result
        },
        onError: async (error, opts) => {
            console.error(`${prefix} ✗ ${opts.model}: ${error.message}`)
        }
    }
}
