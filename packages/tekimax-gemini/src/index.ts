import { GoogleGenerativeAI } from '@google/generative-ai'
import type {
    AIProvider,
    ChatOptions,
    ChatResult,
    Message,
    StreamChunk,
    ToolDefinition
} from 'tekimax-ts'

export class GeminiProvider implements AIProvider {
    name = 'gemini'
    private client: GoogleGenerativeAI

    constructor(options: { apiKey: string }) {
        this.client = new GoogleGenerativeAI(options.apiKey);
    }

    async chat(options: ChatOptions): Promise<ChatResult> {
        const model = this.client.getGenerativeModel({ model: options.model || 'gemini-pro' });

        const chat = model.startChat({
            history: this.mapHistory(options.messages),
            generationConfig: {
                maxOutputTokens: options.maxTokens,
                temperature: options.temperature,
            }
        });

        const lastMsg = options.messages[options.messages.length - 1];
        const result = await chat.sendMessage(lastMsg.content || '');
        const response = result.response;
        const text = response.text();

        return {
            message: {
                role: 'assistant',
                content: text
            }
        }
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        const model = this.client.getGenerativeModel({ model: options.model || 'gemini-pro' });

        const chat = model.startChat({
            history: this.mapHistory(options.messages),
            generationConfig: {
                maxOutputTokens: options.maxTokens,
                temperature: options.temperature,
            }
        });

        const lastMsg = options.messages[options.messages.length - 1];
        const result = await chat.sendMessageStream(lastMsg.content || '');

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            yield {
                delta: chunkText
            }
        }
    }

    private mapHistory(messages: Message[]): any[] {
        // Gemini expects history excluding the last message usually, or specific format
        // { role: 'user' | 'model', parts: [{ text: string }] }
        return messages.slice(0, -1).map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
        }));
    }
}
