import OpenAI from 'openai'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    Message,
    StreamChunk,
    ToolDefinition,
    ToolCall
} from '../../core'

export class OpenAIProvider implements AIProvider {
    name = 'openai'
    private client: OpenAI

    constructor(options: { apiKey: string; dangerouslyAllowBrowser?: boolean }) {
        this.client = new OpenAI({
            apiKey: options.apiKey,
            dangerouslyAllowBrowser: options.dangerouslyAllowBrowser
        })
    }

    async generateSpeech(options: import('../../core').SpeechGenerationOptions): Promise<import('../../core').SpeechResult> {
        const response = await this.client.audio.speech.create({
            model: options.model || 'tts-1',
            voice: options.voice as any,
            input: options.input,
            response_format: options.response_format,
            speed: options.speed
        })

        const buffer = await response.arrayBuffer()
        return {
            buffer,
            headers: {
                'content-type': response.type
            }
        }
    }

    async generateImage(options: import('../../core').ImageGenerationOptions): Promise<import('../../core').ImageResult> {
        const response = await this.client.images.generate({
            model: options.model || 'dall-e-3',
            prompt: options.prompt,
            n: options.n,
            size: options.size as any,
            quality: options.quality as any,
            style: options.style as any,
            response_format: options.response_format,
            user: options.user
        })

        return {
            created: response.created,
            data: response.data as any
        }
    }

    async analyzeImage(options: import('../../core').ImageAnalysisOptions): Promise<import('../../core').ImageAnalysisResult> {
        const messages: any[] = [
            ...(options.messages ? this.mapMessages(options.messages) : []),
            {
                role: 'user',
                content: [
                    { type: 'text', text: options.prompt || 'Describe this image' },
                    {
                        type: 'image_url',
                        image_url: {
                            url: options.image instanceof Buffer ? `data:image/png;base64,${options.image.toString('base64')}` : options.image as string
                        }
                    }
                ]
            }
        ]

        const response = await this.client.chat.completions.create({
            model: options.model || 'gpt-4o',
            messages: messages,
            max_tokens: 1000
        })

        const choice = response.choices[0]
        if (!choice) throw new Error('No choice returned from OpenAI')

        return {
            content: choice.message.content || '',
            usage: response.usage ? {
                inputTokens: response.usage.prompt_tokens,
                outputTokens: response.usage.completion_tokens,
                totalTokens: response.usage.total_tokens
            } : undefined
        }
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        const response = await this.client.chat.completions.create({
            model: options.model,
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
            temperature: options.temperature,
            max_tokens: options.maxTokens,
        })

        const choice = response.choices[0]
        if (!choice) throw new Error('No choice returned from OpenAI')

        return {
            usage: response.usage ? {
                promptTokens: response.usage.prompt_tokens,
                completionTokens: response.usage.completion_tokens,
                totalTokens: response.usage.total_tokens
            } : undefined,
            message: this.mapResponseMessage(choice.message)
        }
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        const stream = await this.client.chat.completions.create({
            model: options.model,
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
            temperature: options.temperature,
            max_tokens: options.maxTokens,
            stream: true,
        })

        for await (const chunk of stream) {
            const choice = chunk.choices[0]
            if (!choice) continue

            const delta = choice.delta

            // Map tool calls if present
            let toolCallDelta: StreamChunk['toolCallDelta'] = undefined
            if (delta.tool_calls && delta.tool_calls.length > 0) {
                const tc = delta.tool_calls[0]
                if (tc) {
                    toolCallDelta = {
                        index: tc.index,
                        id: tc.id,
                        type: 'function',
                        function: tc.function ? {
                            name: tc.function.name,
                            arguments: tc.function.arguments
                        } : undefined
                    }
                }
            }

            yield {
                delta: delta.content || '',
                toolCallDelta,
                usage: undefined, // OpenAI stream doesn't always perform usage
            }
        }
    }

    // --- Mappers ---

    private mapMessages(messages: Message[]): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
        return messages.map(m => {
            if (m.role === 'tool') {
                return {
                    role: 'tool',
                    content: m.content || '',
                    tool_call_id: (m as any).toolCallId || 'unknown'
                } as OpenAI.Chat.Completions.ChatCompletionToolMessageParam
            }
            if (m.role === 'user') {
                if (Array.isArray(m.content)) {
                    return {
                        role: 'user',
                        content: m.content.map(c => {
                            if (c.type === 'text') {
                                return { type: 'text', text: c.text }
                            }
                            if (c.type === 'image_url') {
                                return {
                                    type: 'image_url',
                                    image_url: {
                                        url: c.image_url.url,
                                        detail: c.image_url.detail
                                    }
                                }
                            }
                            return undefined
                        }).filter(Boolean) as any
                    }
                }
                return { role: 'user', content: m.content || '' }
            }
            if (m.role === 'system') {
                return { role: 'system', content: (typeof m.content === 'string' ? m.content : '') || '' }
            }
            if (m.role === 'assistant') {
                const tool_calls = (m as any).toolCalls?.map((tc: any) => ({
                    id: tc.id,
                    type: 'function' as const,
                    function: {
                        name: tc.function.name,
                        arguments: tc.function.arguments
                    }
                }))
                return {
                    role: 'assistant',
                    content: m.content || null,
                    tool_calls
                } as OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
            }
            throw new Error(`Unknown role: ${m.role}`)
        })
    }

    private mapTool(tool: ToolDefinition): OpenAI.Chat.Completions.ChatCompletionTool {
        return {
            type: 'function',
            function: {
                name: tool.function.name,
                description: tool.function.description,
                parameters: tool.function.parameters as any
            }
        }
    }

    private mapResponseMessage(msg: OpenAI.Chat.Completions.ChatCompletionMessage): Message {
        return {
            role: msg.role,
            content: msg.content || '',
            toolCalls: msg.tool_calls?.map(tc => {
                if (tc.type === 'function') {
                    return {
                        id: tc.id,
                        function: {
                            name: tc.function.name,
                            arguments: tc.function.arguments
                        },
                        type: 'function'
                    }
                }
                return undefined
            }).filter(Boolean) as ToolCall[] | undefined
        } as unknown as Message
    }
}
