import type { ChatOptions, ChatResult, StreamChunk } from './types'

export interface AIProvider {
    name: string

    /**
     * Send a chat completion request.
     */
    chat: (options: ChatOptions) => Promise<ChatResult>

    /**
     * Stream a chat completion.
     */
    chatStream: (options: ChatOptions) => AsyncIterable<StreamChunk>
}
