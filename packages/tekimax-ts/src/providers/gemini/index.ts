import { GoogleGenerativeAI, Part } from '@google/generative-ai'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    Message,
    StreamChunk,
    ToolDefinition,
    ImageAnalysisOptions,
    ImageAnalysisResult,
    EmbeddingOptions,
    EmbeddingResult,
    VisionCapability,
    VideoAnalysisCapability,
    EmbeddingCapability
} from '../../core'

export class GeminiProvider implements AIProvider, VisionCapability, VideoAnalysisCapability, EmbeddingCapability {
    name = 'gemini'
    private client: GoogleGenerativeAI

    constructor(options: { apiKey: string }) {
        this.client = new GoogleGenerativeAI(options.apiKey);
    }

    private convertContent(content: Message['content']): string | Array<string | Part> {
        if (!content) return ''
        if (typeof content === 'string') return content

        return content.map(part => {
            if (part.type === 'text') {
                return { text: part.text }
            }
            if (part.type === 'image_url') {
                // Parse data URI: data:image/png;base64,....
                const match = part.image_url.url.match(/^data:([^;]+);base64,(.+)$/)
                if (match) {
                    return {
                        inlineData: {
                            mimeType: match[1],
                            data: match[2] || ''
                        }
                    } as any
                }
                // Fallback or todo: handle remote URLs (Gemini might not support direct remote URLs in this API without file API)
                return { text: '[Image Url not supported directly, please use base64 data uri]' }
            }
            return { text: '' }
        })
    }

    async analyzeVideo(options: import('../../core').VideoAnalysisOptions): Promise<import('../../core').VideoAnalysisResult> {
        let videoPart: Part;
        const videoInput = options.video;

        if (typeof videoInput === 'string') {
            if (videoInput.startsWith('http')) {
                const resp = await fetch(videoInput);
                const arrayBuffer = await resp.arrayBuffer();
                const base64 = Buffer.from(arrayBuffer).toString('base64');
                videoPart = {
                    inlineData: {
                        data: base64,
                        mimeType: 'video/mp4'
                    }
                };
            } else {
                videoPart = {
                    inlineData: {
                        data: videoInput,
                        mimeType: 'video/mp4'
                    }
                }
            }
        } else if (typeof Buffer !== 'undefined' && videoInput instanceof Buffer) {
            videoPart = {
                inlineData: {
                    data: videoInput.toString('base64'),
                    mimeType: 'video/mp4'
                }
            }
        } else {
            throw new Error('Unsupported video format')
        }

        const model = this.client.getGenerativeModel({ model: options.model });
        const result = await model.generateContent([
            options.prompt || 'Analyze this video',
            videoPart
        ]);

        return {
            content: result.response.text(),
            usage: {
                inputTokens: result.response.usageMetadata?.promptTokenCount,
                outputTokens: result.response.usageMetadata?.candidatesTokenCount,
                totalTokens: result.response.usageMetadata?.totalTokenCount
            }
        }
    }

    async analyzeImage(options: ImageAnalysisOptions): Promise<ImageAnalysisResult> {
        let imagePart: Part;
        const imageInput = options.image;

        if (typeof imageInput === 'string') {
            if (imageInput.startsWith('data:')) {
                const match = imageInput.match(/^data:([^;]+);base64,(.+)$/)
                if (match) {
                    imagePart = {
                        inlineData: {
                            data: match[2] || '',
                            mimeType: match[1] || 'image/png'
                        }
                    }
                } else {
                    throw new Error('Invalid base64 data URL')
                }
            } else if (imageInput.startsWith('http')) {
                const resp = await fetch(imageInput);
                const arrayBuffer = await resp.arrayBuffer();
                const base64 = Buffer.from(arrayBuffer).toString('base64');
                const contentType = resp.headers.get('content-type') || 'image/png';
                imagePart = {
                    inlineData: {
                        data: base64,
                        mimeType: contentType
                    }
                }
            } else {
                // Assume raw base64
                imagePart = {
                    inlineData: {
                        data: imageInput,
                        mimeType: 'image/png'
                    }
                }
            }
        } else if (typeof Buffer !== 'undefined' && imageInput instanceof Buffer) {
            imagePart = {
                inlineData: {
                    data: imageInput.toString('base64'),
                    mimeType: 'image/png'
                }
            }
        } else {
            throw new Error('Unsupported image format')
        }

        const model = this.client.getGenerativeModel({ model: options.model });
        const result = await model.generateContent([
            options.prompt || 'Describe this image',
            imagePart
        ]);

        return {
            content: result.response.text(),
            usage: {
                inputTokens: result.response.usageMetadata?.promptTokenCount,
                outputTokens: result.response.usageMetadata?.candidatesTokenCount,
                totalTokens: result.response.usageMetadata?.totalTokenCount
            }
        }
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        const model = this.client.getGenerativeModel({
            model: options.model || 'gemini-pro',
            tools: options.tools ? [{ functionDeclarations: options.tools.map(this.mapTool) }] : undefined
        });

        const chat = model.startChat({
            history: this.mapHistory(options.messages),
            generationConfig: {
                maxOutputTokens: options.maxTokens,
                temperature: options.temperature,
                responseMimeType: options.responseFormat?.type === 'json_object' ? 'application/json' : undefined,
            }
        });

        const lastMsg = options.messages[options.messages.length - 1];
        if (!lastMsg) {
            return { message: { role: 'assistant', content: '' } };
        }

        const content = this.convertContent(lastMsg.content)
        const result = await chat.sendMessage(content);
        const response = result.response;
        const text = response.text();

        // Map Function Calls
        const functionCalls = response.functionCalls();
        let toolCalls = undefined;
        if (functionCalls && functionCalls.length > 0) {
            toolCalls = functionCalls.map(fc => ({
                id: fc.name, // Gemini doesn't always provide unique call IDs, usage depends on flow.
                type: 'function' as const,
                function: {
                    name: fc.name,
                    arguments: JSON.stringify(fc.args)
                }
            }))
        }

        return {
            message: {
                role: 'assistant',
                content: text,
                toolCalls
            }
        }
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        const model = this.client.getGenerativeModel({
            model: options.model || 'gemini-pro',
            tools: options.tools ? [{ functionDeclarations: options.tools.map(this.mapTool) }] : undefined
        });

        const chat = model.startChat({
            history: this.mapHistory(options.messages),
            generationConfig: {
                maxOutputTokens: options.maxTokens,
                temperature: options.temperature,
                responseMimeType: options.responseFormat?.type === 'json_object' ? 'application/json' : undefined,
            }
        });

        const lastMsg = options.messages[options.messages.length - 1];
        if (!lastMsg) {
            return;
        }

        const content = this.convertContent(lastMsg.content)
        const result = await chat.sendMessageStream(content);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();

            // Handle Tool Calls in stream
            const functionCalls = chunk.functionCalls();
            if (functionCalls && functionCalls.length > 0) {
                for (const fc of functionCalls) {
                    yield {
                        delta: '',
                        toolCallDelta: {
                            index: 0, // simplistic index
                            type: 'function',
                            function: {
                                name: fc.name,
                                arguments: JSON.stringify(fc.args)
                            }
                        }
                    }
                }
            }

            if (chunkText) {
                yield {
                    delta: chunkText
                }
            }
        }
    }

    private mapHistory(messages: Message[]): any[] {
        // Gemini expects history excluding the last message usually
        // { role: 'user' | 'model', parts: [{ text: string } | { inlineData: ... }] }
        return messages.slice(0, -1).map(m => {
            const parts: any[] = [];

            // Handle existing tool calls in history
            if (m.role === 'assistant' && m.toolCalls) {
                m.toolCalls.forEach(tc => {
                    parts.push({
                        functionCall: {
                            name: tc.function.name,
                            args: JSON.parse(tc.function.arguments)
                        }
                    })
                })
            }

            // Handle tool results
            if (m.role === 'tool') {
                // Gemini expects 'functionResponse' part for tool results
                parts.push({
                    functionResponse: {
                        name: m.name || 'unknown',
                        response: { content: m.content }
                    }
                })
            } else {
                const contentParts = this.convertContent(m.content);
                if (Array.isArray(contentParts)) {
                    parts.push(...contentParts)
                } else if (contentParts) {
                    parts.push({ text: contentParts })
                }
            }

            return {
                role: m.role === 'user' ? 'user' : 'model',
                parts: parts
            }
        });
    }

    private mapTool(tool: ToolDefinition): any {
        return {
            name: tool.function.name,
            description: tool.function.description,
            parameters: tool.function.parameters
        }
    }

    async embed(options: EmbeddingOptions): Promise<EmbeddingResult> {
        const model = this.client.getGenerativeModel({
            model: options.model || 'text-embedding-004'
        })

        const inputs = Array.isArray(options.input) ? options.input : [options.input]
        const embeddings: number[][] = []

        // Gemini embeds one text at a time via embedContent
        for (const text of inputs) {
            const result = await model.embedContent(text)
            embeddings.push(result.embedding.values)
        }

        return {
            embeddings,
            model: options.model || 'text-embedding-004',
        }
    }
}
