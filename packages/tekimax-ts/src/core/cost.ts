/**
 * Cost estimation for LLM API calls.
 *
 * Prices are per 1M tokens in USD (as of Feb 2026).
 * Returns null for unknown models — this is intentionally not an error.
 */

export interface CostEstimate {
    inputCost: number
    outputCost: number
    totalCost: number
    currency: 'USD'
}

export interface TokenUsage {
    promptTokens: number
    completionTokens: number
    totalTokens: number
}

interface ModelPricing {
    inputPerMillion: number
    outputPerMillion: number
}

/**
 * Pricing table for popular models (per 1M tokens, USD).
 * Sources: official pricing pages as of Feb 2026.
 */
const MODEL_PRICES: Record<string, ModelPricing> = {
    // OpenAI
    'gpt-4o': { inputPerMillion: 2.50, outputPerMillion: 10.00 },
    'gpt-4o-mini': { inputPerMillion: 0.15, outputPerMillion: 0.60 },
    'gpt-4-turbo': { inputPerMillion: 10.00, outputPerMillion: 30.00 },
    'gpt-4': { inputPerMillion: 30.00, outputPerMillion: 60.00 },
    'gpt-3.5-turbo': { inputPerMillion: 0.50, outputPerMillion: 1.50 },
    'o1': { inputPerMillion: 15.00, outputPerMillion: 60.00 },
    'o1-mini': { inputPerMillion: 3.00, outputPerMillion: 12.00 },
    'o3-mini': { inputPerMillion: 1.10, outputPerMillion: 4.40 },

    // Anthropic
    'claude-3-5-sonnet-20240620': { inputPerMillion: 3.00, outputPerMillion: 15.00 },
    'claude-3-5-sonnet-latest': { inputPerMillion: 3.00, outputPerMillion: 15.00 },
    'claude-3-5-haiku-latest': { inputPerMillion: 0.80, outputPerMillion: 4.00 },
    'claude-3-opus-20240229': { inputPerMillion: 15.00, outputPerMillion: 75.00 },
    'claude-3-sonnet-20240229': { inputPerMillion: 3.00, outputPerMillion: 15.00 },
    'claude-3-haiku-20240307': { inputPerMillion: 0.25, outputPerMillion: 1.25 },

    // Google Gemini
    'gemini-1.5-pro': { inputPerMillion: 1.25, outputPerMillion: 5.00 },
    'gemini-1.5-flash': { inputPerMillion: 0.075, outputPerMillion: 0.30 },
    'gemini-2.0-flash': { inputPerMillion: 0.10, outputPerMillion: 0.40 },
    'gemini-pro': { inputPerMillion: 0.50, outputPerMillion: 1.50 },

    // Grok (xAI)
    'grok-beta': { inputPerMillion: 5.00, outputPerMillion: 15.00 },
    'grok-2': { inputPerMillion: 2.00, outputPerMillion: 10.00 },

    // OpenRouter pass-through (popular models)
    'deepseek/deepseek-r1': { inputPerMillion: 0.55, outputPerMillion: 2.19 },
    'deepseek-r1': { inputPerMillion: 0.55, outputPerMillion: 2.19 },
    'meta-llama/llama-3-70b-instruct': { inputPerMillion: 0.59, outputPerMillion: 0.79 },
    'mistralai/mistral-large-latest': { inputPerMillion: 2.00, outputPerMillion: 6.00 },
}

/**
 * Estimate the cost of an API call based on token usage.
 *
 * @returns CostEstimate or null if the model is not in the price table.
 *
 * @example
 * ```ts
 * const result = await client.text.generate({ model: 'gpt-4o', ... })
 * const cost = estimateCost(result.usage, 'gpt-4o')
 * if (cost) console.log(`$${cost.totalCost.toFixed(4)}`)
 * ```
 */
export function estimateCost(
    usage: TokenUsage | undefined | null,
    model: string
): CostEstimate | null {
    if (!usage) return null

    const pricing = MODEL_PRICES[model]
    if (!pricing) return null

    const inputCost = (usage.promptTokens / 1_000_000) * pricing.inputPerMillion
    const outputCost = (usage.completionTokens / 1_000_000) * pricing.outputPerMillion

    return {
        inputCost: Math.round(inputCost * 1_000_000) / 1_000_000, // 6 decimal precision
        outputCost: Math.round(outputCost * 1_000_000) / 1_000_000,
        totalCost: Math.round((inputCost + outputCost) * 1_000_000) / 1_000_000,
        currency: 'USD',
    }
}

/**
 * Get all models in the price table.
 */
export function getSupportedCostModels(): string[] {
    return Object.keys(MODEL_PRICES)
}

/**
 * Register a custom model price (or override an existing one).
 *
 * @example
 * ```ts
 * registerModelPrice('my-custom-model', { inputPerMillion: 1.0, outputPerMillion: 2.0 })
 * ```
 */
export function registerModelPrice(
    model: string,
    pricing: { inputPerMillion: number; outputPerMillion: number }
): void {
    MODEL_PRICES[model] = pricing
}
