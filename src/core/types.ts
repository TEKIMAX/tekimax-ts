export type MessageRole = 'system' | 'user' | 'assistant'

export interface Message {
    role: MessageRole
    content: string
}

export interface ChatOptions {
    model: string
    messages: Array<Message>
    temperature?: number
    maxTokens?: number
    stream?: boolean
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
    usage?: {
        promptTokens: number
        completionTokens: number
        totalTokens: number
    }
}
