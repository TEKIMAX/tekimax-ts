import type { AIProvider } from './adapter'
import type { ChatOptions, ChatResult, StreamChunk } from './types'

export interface RetryOptions {
    /**
     * Maximum number of retries (not counting the initial attempt).
     * @default 3
     */
    maxRetries?: number

    /**
     * Initial delay in milliseconds before the first retry.
     * @default 1000
     */
    initialDelayMs?: number

    /**
     * Multiplier applied to the delay after each retry.
     * @default 2
     */
    backoffMultiplier?: number

    /**
     * Maximum delay cap in milliseconds.
     * @default 30000
     */
    maxDelayMs?: number

    /**
     * Whether to add random jitter (±25%) to the delay.
     * Prevents thundering herd when multiple clients retry simultaneously.
     * @default true
     */
    jitter?: boolean

    /**
     * Custom predicate to determine if an error should trigger a retry.
     * Default: retries on rate limits (429), server errors (5xx), and network errors.
     */
    shouldRetry?: (error: Error, attempt: number) => boolean

    /**
     * AbortSignal — cancels all pending retries immediately.
     */
    signal?: AbortSignal
}

/**
 * Default retry predicate: retries on rate limits, server errors, and network errors.
 */
function defaultShouldRetry(error: Error): boolean {
    const message = error.message?.toLowerCase() || ''
    const status = (error as any)?.status || (error as any)?.statusCode

    // Rate limit
    if (status === 429) return true

    // Server errors
    if (typeof status === 'number' && status >= 500 && status < 600) return true

    // Network errors
    if (message.includes('econnrefused') ||
        message.includes('econnreset') ||
        message.includes('etimedout') ||
        message.includes('fetch failed') ||
        message.includes('network') ||
        message.includes('socket hang up')) {
        return true
    }

    return false
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(new DOMException('Aborted', 'AbortError'))
            return
        }

        const timer = setTimeout(resolve, ms)

        signal?.addEventListener('abort', () => {
            clearTimeout(timer)
            reject(new DOMException('Aborted', 'AbortError'))
        }, { once: true })
    })
}

function computeDelay(
    attempt: number,
    initialDelayMs: number,
    backoffMultiplier: number,
    maxDelayMs: number,
    jitter: boolean
): number {
    let delay = initialDelayMs * Math.pow(backoffMultiplier, attempt)
    delay = Math.min(delay, maxDelayMs)

    if (jitter) {
        // ±25% jitter
        const jitterRange = delay * 0.25
        delay = delay - jitterRange + Math.random() * jitterRange * 2
    }

    return Math.round(delay)
}

/**
 * Execute an async function with retry and exponential backoff.
 *
 * @example
 * ```ts
 * const result = await withRetry(
 *   () => client.text.generate({ model: 'gpt-4o', messages }),
 *   { maxRetries: 3, initialDelayMs: 1000 }
 * )
 * ```
 */
export async function withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const {
        maxRetries = 3,
        initialDelayMs = 1000,
        backoffMultiplier = 2,
        maxDelayMs = 30000,
        jitter = true,
        shouldRetry = defaultShouldRetry,
        signal,
    } = options

    let lastError: Error | null = null

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn()
        } catch (error: any) {
            lastError = error

            // Don't retry if aborted
            if (signal?.aborted) throw error

            // Don't retry if not retryable or last attempt
            if (attempt === maxRetries || !shouldRetry(error, attempt)) {
                throw error
            }

            const delay = computeDelay(attempt, initialDelayMs, backoffMultiplier, maxDelayMs, jitter)
            await sleep(delay, signal)
        }
    }

    throw lastError || new Error('withRetry: unexpected exit')
}

/**
 * Wrap an AIProvider with automatic retry on all chat/chatStream calls.
 *
 * @example
 * ```ts
 * const resilientProvider = createRetryProvider(openaiProvider, { maxRetries: 3 })
 * const client = new Tekimax({ provider: resilientProvider })
 * // All calls through this client now auto-retry on failures
 * ```
 */
export function createRetryProvider<TProvider extends AIProvider>(
    provider: TProvider,
    options: RetryOptions = {}
): TProvider {
    return new Proxy(provider, {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver)

            if (typeof value === 'function' && typeof prop === 'string') {
                if (prop === 'chatStream') {
                    return function (chatOptions: ChatOptions): AsyncIterable<StreamChunk> {
                        // For streaming, we retry the initial connection.
                        const iterable: AsyncIterable<StreamChunk> = {
                            [Symbol.asyncIterator]() {
                                let innerIterator: AsyncIterator<StreamChunk> | null = null

                                return {
                                    async next() {
                                        if (!innerIterator) {
                                            const stream = await withRetry(
                                                async () => value.call(target, chatOptions),
                                                { ...options, signal: chatOptions.signal || options.signal }
                                            )
                                            innerIterator = stream[Symbol.asyncIterator]()
                                        }
                                        return innerIterator!.next()
                                    },
                                    async return() {
                                        if (innerIterator?.return) {
                                            return innerIterator.return()
                                        }
                                        return { value: undefined, done: true }
                                    }
                                }
                            }
                        }
                        return iterable
                    }
                }

                const promiseMethods = [
                    'chat', 'generateImage', 'editImage', 'analyzeImage',
                    'generateSpeech', 'transcribeAudio', 'generateVideo',
                    'analyzeVideo', 'embed'
                ]

                if (promiseMethods.includes(prop)) {
                    return function (...args: any[]) {
                        const callOpts = args[0] || {}
                        const sig = callOpts.signal || options.signal
                        return withRetry(() => value.apply(target, args), { ...options, signal: sig })
                    }
                }
            }

            // Bind other methods (like internal class helpers) to the target to preserve `this` context
            if (typeof value === 'function') {
                return value.bind(target)
            }

            return value
        }
    })
}
