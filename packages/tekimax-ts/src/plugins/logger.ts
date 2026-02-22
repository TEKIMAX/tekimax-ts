import { TekimaxPlugin, PluginContext, ChatResult, StreamChunk } from '../core/types';

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
