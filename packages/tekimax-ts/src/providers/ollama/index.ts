import { Ollama } from 'ollama/browser'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    Message,
    StreamChunk,
    ToolDefinition
} from '../../core'

export class OllamaProvider implements AIProvider {
    name = 'ollama'
    private client: Ollama

    constructor(options?: { host?: string; apiKey?: string }) {
        this.client = new Ollama({
            host: options?.host || 'http://127.0.0.1:11434',
            fetch: options?.apiKey ? (url, init) => {
                const headers = new Headers(init?.headers)
                headers.set('Authorization', `Bearer ${options.apiKey}`)
                return fetch(url, {
                    ...init,
                    headers
                })
            } : undefined
        })
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        const response = await this.client.chat({
            model: options.model || 'llama2',
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
            stream: false,
            // @ts-ignore - Ollama types might not be updated yet
            think: options.think
        })

        // Handle tool calls
        let toolCalls = undefined;
        if (response.message.tool_calls) {
            toolCalls = response.message.tool_calls.map(tc => ({
                id: `call_${Math.random().toString(36).slice(2)}`,
                type: 'function' as const,
                function: {
                    name: tc.function.name,
                    arguments: JSON.stringify(tc.function.arguments)
                }
            }))
        }

        return {
            message: {
                role: 'assistant',
                content: response.message.content,
                // @ts-ignore
                thinking: response.message.thinking, // Native thinking field
                toolCalls
            }
        }
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        const stream = await this.client.chat({
            model: options.model || 'llama2',
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
            stream: true,
            // @ts-ignore
            think: options.think
        })

        for await (const part of stream) {
            const chunk: StreamChunk = {
                delta: part.message.content
            }

            // @ts-ignore
            if (part.message.thinking) {
                // @ts-ignore
                chunk.thinking = part.message.thinking
            }

            if (part.message.tool_calls) {
                // Map tool calls delta - Ollama usually sends full tool calls in stream?
                // The docs say "gather every chunk ... tool_calls"
                // We'll map them. If they are full calls, we might need logic to not duplicate.
                // But StreamChunk supports partials.
                // Assuming Ollama sends full tool call object in one go or we treat as full.
                // Adapting to our StreamChunk signature which is geared towards OpenAI deltas.
                // We might need to iterate.
                for (let i = 0; i < part.message.tool_calls.length; i++) {
                    const tc = part.message.tool_calls[i]!
                    chunk.toolCallDelta = {
                        index: i,
                        type: 'function',
                        function: {
                            name: tc.function.name,
                            arguments: JSON.stringify(tc.function.arguments)
                        }
                    }
                    // Yield separate chunk per tool call to fit our interface if needed
                    // But our interface only allows one toolCallDelta per chunk.
                    // If multiple tool calls come in one chunk, we might miss some if we don't yield multiple times.
                    // However, yield cannot be inside this forEach if we construct `chunk` outside.
                    // Let's yield here immediately for tool calls.
                    yield {
                        delta: '',
                        toolCallDelta: {
                            index: i,
                            type: 'function',
                            function: {
                                name: tc.function.name,
                                arguments: JSON.stringify(tc.function.arguments)
                            }
                        }
                    }
                }
                // Don't yield the main `chunk` again if it was only tool calls, unless it also had content.
                if (!part.message.content && !part.message.thinking) continue;
            }

            yield chunk
        }
    }

    private mapMessages(messages: Message[]): any[] {
        return messages.map(m => {
            let content = ''
            const images: string[] = []

            if (typeof m.content === 'string') {
                content = m.content || ''
            } else if (Array.isArray(m.content)) {
                for (const part of m.content) {
                    if (part.type === 'text') {
                        content += part.text
                    } else if (part.type === 'image_url') {
                        // Extract base64 from data URL
                        const match = part.image_url.url.match(/^data:image\/[a-z]+;base64,(.+)$/)
                        if (match) {
                            images.push(match[1]!)
                        }
                    }
                }
            }

            // Map tool results
            if (m.role === 'tool') {
                return {
                    role: 'tool',
                    content: content,
                    // Ollama needs tool_name or name? Docs say tool_name in one example
                    // but python sdk usage shows name matching.
                    // REST API docs say `tool_name` for role `tool`.
                    name: m.name,
                    // tool_name: m.name // redundancy
                }
            }

            return {
                role: m.role,
                content: content,
                images: images.length > 0 ? images : undefined,
                tool_calls: m.toolCalls ? m.toolCalls.map(tc => ({
                    type: 'function',
                    function: {
                        name: tc.function.name,
                        arguments: JSON.parse(tc.function.arguments)
                    }
                })) : undefined
            }
        })
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
