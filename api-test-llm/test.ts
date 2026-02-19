import { Tekimax, OpenAIProvider } from 'tekimax-ts';

// 1. Fetch available models from our dynamic Go Proxy
async function fetchModels() {
    console.log("Fetching dynamic models from http://localhost:8080/v1/models...");
    const res = await fetch('http://localhost:8080/v1/models');
    const data = await res.json();
    return data.data; // Array of models
}

async function run() {
    const models = await fetchModels();
    console.log("\n--- Available Models ---");
    models.forEach((m: any) => console.log(`- ${m.id} (Vision: ${m.meta.vision}, Tools: ${m.meta.tools})`));

    // 2. The user selects a model from the UI (e.g. they select the first one with Vision support)
    const selectedModel = models.find((m: any) => m.meta.vision);
    if (!selectedModel) throw new Error("No vision model found");

    console.log(`\nUser selected: ${selectedModel.id}`);

    // 3. Initialize the SDK to point to the proxy
    // By using the OpenAIProvider and overriding the baseURL, the SDK becomes purely
    // an engine that will serialize the structured output to our custom proxy.
    const proxyProvider = new OpenAIProvider({
        apiKey: 'sk-fake-proxy-key',
        baseURL: 'http://localhost:8080/v1' // Point to our Go Server
    });

    const client = new Tekimax({ provider: proxyProvider });

    console.log("\nGenerating chat completion via Proxy Using SDK...");

    // 4. We can safely route the request because the UI already proved the selectedModel has Vision capabilities.
    // We pass the dynamic model ID directly to the SDK
    const result = await client.text.chat.completions.create({
        model: selectedModel.id,
        messages: [
            { role: 'user', content: 'What is this image about?' }
        ]
    });

    console.log("\n--- Proxy Result ---");
    console.log(result.message.content);
}

run().catch(console.error);
