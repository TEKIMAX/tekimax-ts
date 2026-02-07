import type { z } from 'zod'
import type { AIProvider } from './adapter'
import type { ChatResult, Message } from './types'

export interface GenerateObjectOptions<T extends z.ZodType> {
    adapter: AIProvider
    model: string
    schema: T
    messages: Array<Message>
    temperature?: number
    maxTokens?: number
    signal?: AbortSignal
    /**
     * Maximum number of validation retries.
     * When the model returns JSON that doesn't match the schema,
     * the SDK appends the Zod error and re-prompts.
     * @default 1
     */
    maxRetries?: number
}

export interface GenerateObjectResult<T> {
    object: T
    usage?: ChatResult['usage']
}

/**
 * Generate a typed, schema-validated object from an LLM.
 *
 * Injects a system instruction asking for JSON, parses the response
 * with the provided Zod schema, and retries on validation failure.
 *
 * @example
 * ```ts
 * const result = await generateObject({
 *   adapter: provider,
 *   model: 'gpt-4o',
 *   schema: z.object({ name: z.string(), age: z.number() }),
 *   messages: [{ role: 'user', content: 'Extract: John is 30 years old' }],
 * })
 * console.log(result.object) // { name: "John", age: 30 }
 * ```
 */
export async function generateObject<T extends z.ZodType>(
    options: GenerateObjectOptions<T>
): Promise<GenerateObjectResult<z.infer<T>>> {
    const { adapter, model, schema, messages, temperature, maxTokens, signal, maxRetries = 1 } = options

    // Build JSON schema description from Zod for the system prompt
    const jsonShape = JSON.stringify(zodToJsonDescription(schema), null, 2)

    const systemMessage: Message = {
        role: 'system',
        content: `You MUST respond with valid JSON and nothing else. No markdown, no code fences, no explanation.

The JSON must match this schema:
${jsonShape}

Rules:
- Output ONLY the JSON object
- All required fields must be present
- Values must match the specified types`
    }

    const currentMessages: Message[] = [
        systemMessage,
        ...messages,
    ]

    let lastError: Error | null = null

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        const result = await adapter.chat({
            model,
            messages: currentMessages,
            temperature,
            maxTokens,
            signal,
        })

        const content = typeof result.message.content === 'string'
            ? result.message.content
            : ''

        // Strip markdown code fences if the model wraps the JSON
        const cleaned = content
            .replace(/^```(?:json)?\s*\n?/i, '')
            .replace(/\n?```\s*$/i, '')
            .trim()

        let parsed: unknown
        try {
            parsed = JSON.parse(cleaned)
        } catch {
            lastError = new Error(
                `Model returned invalid JSON (attempt ${attempt + 1}/${maxRetries + 1}): ${content.slice(0, 200)}`
            )

            if (attempt < maxRetries) {
                currentMessages.push(result.message)
                currentMessages.push({
                    role: 'user',
                    content: `Your response was not valid JSON. Parse error: ${lastError.message}. Please respond with ONLY valid JSON matching the schema.`
                })
            }
            continue
        }

        // Validate against Zod schema
        const validation = schema.safeParse(parsed)

        if (validation.success) {
            return {
                object: validation.data,
                usage: result.usage,
            }
        }

        // Validation failed — build error context for retry
        const zodErrors = (validation as any).error?.issues
            ?.map((i: any) => `${i.path.join('.')}: ${i.message}`)
            .join('; ') || 'Schema validation failed'

        lastError = new Error(
            `Schema validation failed (attempt ${attempt + 1}/${maxRetries + 1}): ${zodErrors}`
        )

        if (attempt < maxRetries) {
            currentMessages.push(result.message)
            currentMessages.push({
                role: 'user',
                content: `Your JSON didn't match the required schema. Errors: ${zodErrors}. Please fix and respond with ONLY valid JSON.`
            })
        }
    }

    throw lastError || new Error('generateObject failed')
}

/**
 * Convert a Zod schema to a simple JSON description for the system prompt.
 * This is intentionally simple — we describe types, not the full JSON Schema spec.
 */
function zodToJsonDescription(schema: z.ZodType): unknown {
    const def = (schema as any)._def

    if (!def) return { type: 'unknown' }

    switch (def.typeName) {
        case 'ZodObject': {
            const shape = def.shape?.() || {}
            const properties: Record<string, unknown> = {}
            for (const [key, value] of Object.entries(shape)) {
                properties[key] = zodToJsonDescription(value as z.ZodType)
            }
            return { type: 'object', properties }
        }
        case 'ZodArray':
            return { type: 'array', items: zodToJsonDescription(def.type) }
        case 'ZodString':
            return { type: 'string' }
        case 'ZodNumber':
            return { type: 'number' }
        case 'ZodBoolean':
            return { type: 'boolean' }
        case 'ZodEnum':
            return { type: 'string', enum: def.values }
        case 'ZodOptional':
            return { ...zodToJsonDescription(def.innerType) as any, optional: true }
        case 'ZodNullable':
            return { ...zodToJsonDescription(def.innerType) as any, nullable: true }
        case 'ZodDefault':
            return zodToJsonDescription(def.innerType)
        case 'ZodLiteral':
            return { type: typeof def.value, const: def.value }
        case 'ZodUnion':
            return { oneOf: def.options.map((o: z.ZodType) => zodToJsonDescription(o)) }
        case 'ZodRecord':
            return { type: 'object', additionalProperties: zodToJsonDescription(def.valueType) }
        default:
            return { type: 'unknown' }
    }
}
