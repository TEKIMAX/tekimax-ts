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

export interface Message {
    role: MessageRole
    content: string | null
    toolCalls?: Array<ToolCall>
    toolCallId?: string
    name?: string
}

export interface ChatOptions {
    model: string
    messages: Array<Message>
    tools?: Array<ToolDefinition>
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
