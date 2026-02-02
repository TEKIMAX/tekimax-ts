import { Ollama } from 'ollama'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    Message,
    StreamChunk,
    ToolDefinition
} from 'tekimax-ts'

export class OllamaProvider implements AIProvider {
    name = 'ollama'
    private client: Ollama

    constructor(options?: { host?: string }) {
        this.client = new Ollama({ host: options?.host || 'http://127.0.0.1:11434' })
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        const response = await this.client.chat({
            model: options.model || 'llama2',
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
            stream: false
        })

        return {
            message: {
                role: 'assistant',
                content: response.message.content
            }
        }
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        const stream = await this.client.chat({
            model: options.model || 'llama2',
            messages: this.mapMessages(options.messages),
            stream: true
        })

        for await (const part of stream) {
            yield {
                delta: part.message.content
            }
        }
    }

    private mapMessages(messages: Message[]): any[] {
        return messages.map(m => ({
            role: m.role,
            content: m.content
        }))
    }

    private mapTool(tool: ToolDefinition): any {
        return {
            type: 'function',
            function: {
                name: tool.function.name,
                description: tool.function.description,
                parameters: tool.function.parameters
            }
        }
    }
}
