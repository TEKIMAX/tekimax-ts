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
