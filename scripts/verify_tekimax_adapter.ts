
import { TekimaxProvider } from '../packages/tekimax-ts/dist/index.js';

async function verify() {
    console.log("🔍 Verifying TekimaxProvider Stateless History...");

    let capturedBody: any = null;

    // Mock fetch to capture the request body
    global.fetch = async (url: string | URL | Request, init?: RequestInit) => {
        if (init && init.body) {
            capturedBody = JSON.parse(init.body as string);
        }
        return new Response(JSON.stringify({
            id: 'mock-id',
            model: 'mock-model',
            output: [{
                type: 'message',
                role: 'assistant',
                content: [{ type: 'output_text', text: 'Mock response' }]
            }]
        }));
    }

    const provider = new TekimaxProvider({ apiKey: 'fake-key' });

    const messages = [
        { role: 'user' as const, content: 'Hello' },
        { role: 'assistant' as const, content: 'Hi there' },
        { role: 'user' as const, content: 'How are you?' }
    ];

    await provider.chat({
        model: 'tekimax-1',
        messages: messages
    });

    if (!capturedBody) {
        console.error("❌ No request made!");
        process.exit(1);
    }

    console.log("📦 Request Body Input:", JSON.stringify(capturedBody.input, null, 2));

    if (Array.isArray(capturedBody.input) && capturedBody.input.length === 3) {
        console.log("✅ SUCCESS: TekimaxProvider sent full history as array!");
        console.log("   - Message 1:", capturedBody.input[0]);
        console.log("   - Message 3:", capturedBody.input[2]);
    } else {
        console.error("❌ FAILURE: Input was not an array of 3 messages.", capturedBody.input);
        process.exit(1);
    }
}

verify().catch(console.error);
