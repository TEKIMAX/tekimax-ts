import { TekimaxPlugin, PluginContext } from '../core/types';

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
