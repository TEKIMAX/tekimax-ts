export type MessageRole = 'system' | 'user' | 'assistant' | 'tool'

export interface ToolCall {
    id: string
    type: 'function'
    function: {
        name: string
        arguments: string
    }
}

export interface ToolDefinition {
    type: 'function'
    function: {
        name: string
        description?: string
        parameters?: Record<string, unknown>
    }
}

export interface Tool<T = any> extends ToolDefinition {
    execute: (args: T) => Promise<unknown>
}

export interface GenerateTextResult {
    text: string
    toolCalls: Array<ToolCall>
    toolResults: Array<{ id: string; result: unknown }>
    finishReason: 'stop' | 'length' | 'tool_calls' | 'error' | 'unknown'
    usage: {
        promptTokens: number
        completionTokens: number
        totalTokens: number
    }
    warnings?: Array<string>
}

export interface TextContentPart {
    type: 'text'
    text: string
}

export interface ImageContentPart {
    type: 'image_url'
    image_url: {
        url: string // Can be base64 data URL
        detail?: 'auto' | 'low' | 'high'
    }
}

export type ContentPart = TextContentPart | ImageContentPart

export interface Message {
    role: MessageRole
    content: string | Array<ContentPart> | null
    thinking?: string // Native thinking field from provider
    toolCalls?: Array<ToolCall>
    toolCallId?: string
    name?: string
}

// --- Multi-Modal Types (Celeste Parity) ---

// Images
export interface ImageGenerationOptions {
    prompt: string
    model?: string
    n?: number
    size?: string
    quality?: string
    style?: string
    response_format?: 'url' | 'b64_json'
    user?: string
}

export interface ImageEditOptions extends ImageGenerationOptions {
    image: string | Blob | Buffer // Base64 or File
    mask?: string | Blob | Buffer
}

export interface ImageContent {
    url?: string
    b64_json?: string
    revised_prompt?: string
}

export interface ImageResult {
    created: number
    data: ImageContent[]
}

export interface ImageAnalysisOptions {
    image: string | Blob | Buffer // URL, Base64, or File
    prompt?: string
    model: string
    messages?: Array<Message>
}

export interface ImageAnalysisResult {
    content: string
    usage?: {
        inputTokens?: number
        outputTokens?: number
        totalTokens?: number
    }
}

// Audio
export interface SpeechGenerationOptions {
    input: string
    model?: string
    voice: string
    response_format?: 'mp3' | 'opus' | 'aac' | 'flac' | 'wav' | 'pcm'
    speed?: number
}

export interface SpeechResult {
    buffer: ArrayBuffer
    headers?: Record<string, string>
}

// Video
export interface VideoGenerationOptions {
    prompt: string
    model?: string
    aspect_ratio?: string
    duration_seconds?: number
}

export interface VideoContent {
    url?: string
    b64_json?: string
}

export interface VideoResult {
    data: VideoContent[]
}

export interface VideoAnalysisOptions {
    video: string | Blob | Buffer // URL, Base64, or File
    prompt?: string
    model: string
    messages?: Array<Message> // For multi-turn context
}

export interface VideoAnalysisResult {
    content: string
    usage?: {
        inputTokens?: number
        outputTokens?: number
        totalTokens?: number
    }
}


export interface ChatOptions {
    model: string
    messages: Array<Message>
    tools?: Array<ToolDefinition>
    temperature?: number
    maxTokens?: number
    stream?: boolean
    think?: boolean // Enable thinking parameter
    signal?: AbortSignal
    /** Force a specific response format. 'json_object' enables JSON mode. */
    responseFormat?: { type: 'json_object' | 'text' }
}

export interface ChatResult {
    message: Message
    usage?: {
        promptTokens: number
        completionTokens: number
        totalTokens: number
    }
}

export interface StreamChunk {
    delta: string
    thinking?: string // Partial thinking delta
    toolCallDelta?: {
        index: number
        id?: string
        type?: 'function'
        function?: {
            name?: string
            arguments?: string
        }
    }
    usage?: {
        promptTokens: number
        completionTokens: number
        totalTokens: number
    }
}

export interface TranscriptionOptions {
    file: File | Blob | Buffer
    model?: string
    language?: string
    prompt?: string
    response_format?: 'json' | 'text' | 'srt' | 'verbose_json' | 'vtt'
    temperature?: number
}

export interface TranscriptionResult {
    text: string
    language?: string
    duration?: number
    segments?: Array<{ start: number; end: number; text: string }>
}

// --- Embeddings ---

export interface EmbeddingOptions {
    /** The text(s) to embed. Pass a string for a single embedding or an array for batch. */
    input: string | string[]
    /** The embedding model to use (e.g., 'text-embedding-3-small'). */
    model?: string
    /** Number of dimensions for the output embedding (supported by some models). */
    dimensions?: number
}

export interface EmbeddingResult {
    /** Array of embedding vectors — one per input string. */
    embeddings: number[][]
    /** Model used for the embeddings. */
    model: string
    usage?: {
        promptTokens: number
        totalTokens: number
    }
}

// --- Models.dev + OpenResponses Fusion Types ---

export interface ModelLimit {
    /** Maximum context window size in tokens */
    context: number
    /** Maximum output tokens */
    output: number
}

export interface ModelModalities {
    input: Array<'text' | 'image' | 'audio' | 'video' | 'file'>
    output: Array<'text' | 'image' | 'audio' | 'video'>
}

export interface ModelCost {
    /** Cost per 1M input tokens (USD) */
    input?: number
    /** Cost per 1M output tokens (USD) */
    output?: number
    /** Cost per 1M cached input tokens (USD) */
    cache_read?: number
}

/**
 * OpenResponses-compliant reasoning configuration.
 * Maps from `models.dev` boolean `reasoning` flag into
 * the official `ReasoningEffortEnum` from openresponses/openresponses.
 */
export interface OpenResponsesReasoningConfig {
    effort?: 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh'
    summary?: 'none' | 'terse' | 'verbose' | 'detailed'
}

/**
 * A standardized model definition that fuses the `models.dev` catalog
 * with the `openresponses.org` specification.
 *
 * This type is returned by providers that support catalog introspection
 * (e.g., fetching from `https://models.dev/api.json`).
 */
export interface ModelDefinition {
    /** Unique model identifier (e.g. "gpt-4o", "glm-4.6") */
    id: string
    /** Human-readable display name */
    name: string
    /** Model architecture family (e.g. "gpt", "glm", "deepseek") */
    family?: string
    /** Provider name (e.g. "OpenAI", "Ollama Cloud") */
    provider?: string

    // --- OpenResponses Mapped Capabilities ---

    /** Whether the model supports file/image/audio attachments in input */
    attachment: boolean
    /** Whether the model supports function/tool calling */
    tool_call: boolean
    /** Whether the model supports structured JSON output */
    structured_output?: boolean

    /**
     * Reasoning capability.
     * - `false`: No reasoning support.
     * - `true`: Reasoning supported (default effort = "medium").
     * - `OpenResponsesReasoningConfig`: Fine-grained reasoning control
     *   per the official openresponses.org ReasoningEffortEnum.
     */
    reasoning: boolean | OpenResponsesReasoningConfig

    // --- Metadata ---

    /** Supported input/output modalities */
    modalities: ModelModalities
    /** Token limits */
    limit: ModelLimit
    /** Pricing per 1M tokens */
    cost?: ModelCost
}
