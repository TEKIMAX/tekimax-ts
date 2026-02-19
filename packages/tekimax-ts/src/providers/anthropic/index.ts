import Anthropic from '@anthropic-ai/sdk'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    Message,
    StreamChunk,
    ToolDefinition,
    ImageAnalysisOptions,
    ImageAnalysisResult,
    VisionCapability
} from '../../core'

export class AnthropicProvider implements AIProvider, VisionCapability {
    name = 'anthropic'
    private client: Anthropic

    constructor(options: { apiKey: string }) {
        this.client = new Anthropic({ apiKey: options.apiKey })
    }

    async analyzeImage(options: ImageAnalysisOptions): Promise<ImageAnalysisResult> {
        let imageSource: any

        if (typeof options.image === 'string') {
            const match = options.image.match(/^data:([^;]+);base64,(.+)$/)
            if (match) {
                imageSource = {
                    type: 'image' as const,
                    source: {
                        type: 'base64' as const,
                        media_type: match[1] as any,
                        data: match[2] || ''
                    }
                }
            } else {
                // URL-based image
                imageSource = {
                    type: 'image' as const,
                    source: {
                        type: 'url' as const,
                        url: options.image
                    }
                }
            }
        } else if (typeof Buffer !== 'undefined' && options.image instanceof Buffer) {
            imageSource = {
                type: 'image' as const,
                source: {
                    type: 'base64' as const,
                    media_type: 'image/png' as const,
                    data: options.image.toString('base64')
                }
            }
        } else {
            throw new Error('Unsupported image format for Anthropic')
        }

        const messages: Anthropic.MessageParam[] = [
            ...(options.messages ? this.mapMessages(options.messages) : []),
            {
                role: 'user',
                content: [
                    imageSource,
                    { type: 'text' as const, text: options.prompt || 'Describe this image' }
                ]
            }
        ]

        const response = await this.client.messages.create({
            model: options.model || 'claude-3-5-sonnet-20240620',
            max_tokens: 1024,
            messages
        })

        const text = response.content
            .filter((c: Anthropic.ContentBlock) => c.type === 'text')
            .map((b: Anthropic.ContentBlock) => (b as Anthropic.TextBlock).text)
            .join('')

        return {
            content: text,
            usage: {
                inputTokens: response.usage.input_tokens,
                outputTokens: response.usage.output_tokens,
                totalTokens: response.usage.input_tokens + response.usage.output_tokens
            }
        }
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        // Anthropic requires system as a top-level param, not a message role
        const systemMessages = options.messages.filter(m => m.role === 'system')
        let systemPrompt = systemMessages
            .map(m => typeof m.content === 'string' ? m.content : '')
            .filter(Boolean)
            .join('\n\n') || undefined

        // Anthropic doesn't have native JSON mode — inject system instruction
        if (options.responseFormat?.type === 'json_object') {
            const jsonInstruction = 'You MUST respond with valid JSON and nothing else. No markdown, no code fences, no explanation.'
            systemPrompt = systemPrompt
                ? `${systemPrompt}\n\n${jsonInstruction}`
                : jsonInstruction
        }

        const response = await this.client.messages.create({
            model: options.model || 'claude-3-5-sonnet-20240620',
            max_tokens: options.maxTokens || 1024,
            system: systemPrompt,
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
        })

        const textBlocks = response.content.filter((c: Anthropic.ContentBlock) => c.type === 'text');
        const toolUseBlocks = response.content.filter((c: Anthropic.ContentBlock) => c.type === 'tool_use');

        const text = textBlocks.map((b: Anthropic.ContentBlock) => (b as Anthropic.TextBlock).text).join('');

        let toolCalls = undefined;
        if (toolUseBlocks.length > 0) {
            toolCalls = toolUseBlocks.map((b: Anthropic.ContentBlock) => {
                const block = b as Anthropic.ToolUseBlock
                return {
                    id: block.id,
                    type: 'function' as const,
                    function: {
                        name: block.name,
                        arguments: JSON.stringify(block.input)
                    }
                }
            })
        }

        return {
            usage: {
                promptTokens: response.usage.input_tokens,
                completionTokens: response.usage.output_tokens,
                totalTokens: response.usage.input_tokens + response.usage.output_tokens
            },
            message: {
                role: 'assistant',
                content: text,
                toolCalls
            }
        }
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        // Anthropic requires system as a top-level param
        const systemMessages = options.messages.filter(m => m.role === 'system')
        const systemPrompt = systemMessages
            .map(m => typeof m.content === 'string' ? m.content : '')
            .filter(Boolean)
            .join('\n\n') || undefined

        const stream = await this.client.messages.create({
            model: options.model || 'claude-3-5-sonnet-20240620',
            max_tokens: options.maxTokens || 1024,
            system: systemPrompt,
            messages: this.mapMessages(options.messages),
            tools: options.tools?.map(this.mapTool),
            stream: true,
        })

        // Track tool call state across stream events
        let currentToolIndex = -1
        let currentToolId: string | undefined
        let currentToolName: string | undefined

        for await (const chunk of stream) {
            // Text deltas
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
                yield {
                    delta: chunk.delta.text,
                }
            }

            // Tool use: content_block_start signals a new tool call
            if (chunk.type === 'content_block_start' && chunk.content_block.type === 'tool_use') {
                currentToolIndex++
                currentToolId = chunk.content_block.id
                currentToolName = chunk.content_block.name
                yield {
                    delta: '',
                    toolCallDelta: {
                        index: currentToolIndex,
                        id: currentToolId,
                        type: 'function',
                        function: {
                            name: currentToolName,
                            arguments: ''
                        }
                    }
                }
            }

            // Tool use: input_json_delta streams the arguments
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'input_json_delta') {
                yield {
                    delta: '',
                    toolCallDelta: {
                        index: currentToolIndex,
                        id: currentToolId,
                        type: 'function',
                        function: {
                            name: '',
                            arguments: (chunk.delta as any).partial_json || ''
                        }
                    }
                }
            }

            // Usage from message_delta (final usage update)
            if (chunk.type === 'message_delta') {
                yield {
                    delta: '',
                    usage: {
                        promptTokens: 0, // Only available in message_start
                        completionTokens: (chunk as any).usage?.output_tokens || 0,
                        totalTokens: (chunk as any).usage?.output_tokens || 0
                    }
                }
            }
        }
    }

    private mapMessages(messages: Message[]): Anthropic.MessageParam[] {
        return messages
            .filter(m => m.role === 'user' || m.role === 'assistant' || m.role === 'tool')
            .map(m => {
                // Tool result messages → map to user message with tool_result content
                if (m.role === 'tool') {
                    return {
                        role: 'user' as const,
                        content: [{
                            type: 'tool_result' as const,
                            tool_use_id: m.toolCallId || 'unknown',
                            content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
                        }]
                    }
                }

                let content: string | Anthropic.ContentBlockParam[] = ''
                if (typeof m.content === 'string') {
                    content = m.content || ''
                } else if (Array.isArray(m.content)) {
                    content = (m.content as any[]).map((part: any) => {
                        if (part.type === 'text') {
                            return { type: 'text' as const, text: part.text as string }
                        }
                        if (part.type === 'image_url') {
                            const match = (part.image_url.url as string).match(/^data:([^;]+);base64,(.+)$/)
                            if (match) {
                                const mimeType = match[1] as any
                                return {
                                    type: 'image' as const,
                                    source: {
                                        type: 'base64' as const,
                                        media_type: mimeType,
                                        data: match[2] || ''
                                    }
                                }
                            }
                        }
                        return { type: 'text' as const, text: '' }
                    }).filter((part: any) => part.type !== 'text' || part.text !== '')
                }

                // Assistant messages with tool calls
                if (m.role === 'assistant' && m.toolCalls && m.toolCalls.length > 0) {
                    const assistantContent: any[] = []
                    if (typeof m.content === 'string' && m.content) {
                        assistantContent.push({ type: 'text', text: m.content })
                    }
                    for (const tc of m.toolCalls) {
                        assistantContent.push({
                            type: 'tool_use',
                            id: tc.id,
                            name: tc.function.name,
                            input: JSON.parse(tc.function.arguments)
                        })
                    }
                    return {
                        role: 'assistant' as const,
                        content: assistantContent
                    }
                }

                return {
                    role: m.role as 'user' | 'assistant',
                    content: content as any
                }
            })
    }

    private mapTool(tool: ToolDefinition): Anthropic.Tool {
        return {
            name: tool.function.name,
            description: tool.function.description,
            input_schema: tool.function.parameters as any
        }
    }
}
