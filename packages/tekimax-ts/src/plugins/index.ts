import { TekimaxPlugin, PluginContext, ChatResult, StreamChunk, Message } from '../core/types';

/**
 * Security: PII Filter Plugin
 * Redacts sensitive standard patterns (like emails and SSNs) from messages
 * before they are sent to the provider.
 */
export class PIIFilterPlugin implements TekimaxPlugin {
    name = 'PIIFilterPlugin';
    private patterns = {
        email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    };

    async beforeRequest(context: PluginContext): Promise<PluginContext | void> {
        context.messages = context.messages.map(msg => {
            if (typeof msg.content === 'string') {
                let safeContent = msg.content;
                safeContent = safeContent.replace(this.patterns.email, '[REDACTED EMAIL]');
                safeContent = safeContent.replace(this.patterns.ssn, '[REDACTED SSN]');
                return { ...msg, content: safeContent };
            }
            return msg;
        });
        return context;
    }
}

/**
 * Scalability: Max Context Overflow Plugin
 * Prevents token overflow in long-running loops by aggressively
 * shifting out the oldest messages (excluding the system prompt)
 * when the message array exceeds the configured limit.
 */
export class MaxContextOverflowPlugin implements TekimaxPlugin {
    name = 'MaxContextOverflowPlugin';

    constructor(private maxMessages: number = 20) { }

    async beforeRequest(context: PluginContext): Promise<PluginContext | void> {
        if (context.messages.length > this.maxMessages) {
            // Keep the first message if it's a system prompt
            const hasSystem = context.messages[0]?.role === 'system';
            const systemMsg = hasSystem ? context.messages[0] : null;

            // Slice the most recent N messages
            const recentMsgs = context.messages.slice(-(this.maxMessages - (hasSystem ? 1 : 0)));

            context.messages = hasSystem && systemMsg ? [systemMsg, ...recentMsgs] : recentMsgs;
            console.warn(`[MaxContextOverflowPlugin] Truncated chat history to ${this.maxMessages} messages to preserve context limits.`);
        }
        return context;
    }
}

/**
 * Telemetry: basic Logger Plugin
 * Logs payloads, streaming chunks, and tool execution boundaries.
 */
export class LoggerPlugin implements TekimaxPlugin {
    name = 'LoggerPlugin';

    onInit() {
        console.log('[LoggerPlugin] Tekimax SDK initialized with Logger Plugin active.');
    }

    async beforeRequest(context: PluginContext) {
        console.log(`[LoggerPlugin] Sending request to model: ${context.model} (${context.messages.length} messages)`);
    }

    async afterResponse(context: PluginContext, result: ChatResult) {
        console.log(`[LoggerPlugin] Received completion from ${context.model}. Usage:`, result.usage);
    }

    onStreamChunk(context: PluginContext, chunk: StreamChunk) {
        if (chunk.usage) {
            console.log(`[LoggerPlugin] Stream completed. Final usage:`, chunk.usage);
        }
    }

    async beforeToolExecute(toolName: string, args: unknown) {
        console.log(`[LoggerPlugin] Executing tool '${toolName}' with args:`, args);
    }

    async afterToolExecute(toolName: string, result: unknown) {
        console.log(`[LoggerPlugin] Tool '${toolName}' returned successfully.`);
    }
}
