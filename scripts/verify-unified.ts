import { Tekimax } from '../packages/tekimax-ts/src';
import { AIProvider } from '../packages/tekimax-ts/src/core/adapter';
import { ChatOptions, ChatResult, StreamChunk } from '../packages/tekimax-ts/src/core/types';

// Mock Provider for testing proper delegation
class MockProvider implements AIProvider {
    name = 'mock';
    async chat(options: ChatOptions): Promise<ChatResult> {
        console.log(`[MockProvider] Received request for model: ${options.model}`);
        return {
            message: {
                role: 'assistant',
                content: `Response to: ${options.messages[0].content}`
            }
        };
    }

    async *chatStream(options: ChatOptions): AsyncIterable<StreamChunk> {
        yield { delta: 'Stream' };
    }
}

async function run() {
    console.log('--- Verifying Unified Tekimax Client ---');

    // 1. Initialize Client with Mock Provider
    const client = new Tekimax({ provider: new MockProvider() });
    console.log('✅ Client Initialized');

    // 2. Send Request
    console.log('Sending request...');
    const response = await client.chat.completions.create({
        model: 'test-model',
        messages: [{ role: 'user', content: 'Hello Unified SDK' }]
    });

    // 3. Verify Response
    if (response.message.content === 'Response to: Hello Unified SDK') {
        console.log('✅ Response content match');
        console.log('✅ Unified Client Verification Passed');
    } else {
        console.error('❌ Verification Failed: Content mismatch');
        console.log('Received:', response);
        process.exit(1);
    }
}

run().catch(err => {
    console.error('❌ Script Runtime Error:', err);
    process.exit(1);
});
