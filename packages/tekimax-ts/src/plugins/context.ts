import { TekimaxPlugin, PluginContext } from '../core/types';

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
