import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Tekimax, OpenAIProvider } from 'tekimax-ts';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, model, providerConfig } = req.body;

        // Securely instantiate the Tekimax SDK *only* on the backend
        const client = new Tekimax({
            provider: new OpenAIProvider({
                apiKey: (providerConfig?.apiKey && providerConfig.apiKey !== 'sk-default')
                    ? providerConfig.apiKey
                    : process.env.MODEL_PROXY_KEY || 'sk-default',
                baseURL: (providerConfig?.baseURL && providerConfig.baseURL !== 'http://localhost:8080/v1')
                    ? providerConfig.baseURL
                    : process.env.MODEL_PROXY_URL || 'https://api.model.dev/v1',
            })
        });

        // We can securely invoke the SDK here without dangerouslyAllowBrowser
        const response = await client.text.chat.completions.create({
            model: model || 'gpt-4o',
            messages: messages,
        });

        res.json({ content: response.message.content });
    } catch (error: any) {
        console.error('Proxy Error executing SDK Chat completion:', error);
        res.status(500).json({ error: error.message || "Unknown proxy connection error encountered." });
    }
});

app.get('/api/models', async (req, res) => {
    try {
        const response = await fetch('https://models.dev/api.json');

        if (!response.ok) {
            throw new Error(`Upstream error: ${response.status} ${response.statusText}`);
        }

        const registry = await response.json() as Record<string, any>;
        const models: any[] = [];

        // Map models.dev registry into OpenResponses-compliant ModelDefinition[]
        for (const [providerId, providerData] of Object.entries(registry)) {
            if (!providerData || !providerData.models) continue;

            for (const [modelId, modelData] of Object.entries(providerData.models)) {
                const md = modelData as any;
                models.push({
                    id: md.id || modelId,
                    name: md.name || modelId,
                    family: md.family || undefined,
                    provider: providerData.name || providerId,

                    // OpenResponses Capability Mapping
                    attachment: md.attachment || false,
                    tool_call: md.tool_call || false,
                    structured_output: md.structured_output || false,
                    reasoning: md.reasoning || false,

                    // Modalities (direct passthrough from models.dev)
                    modalities: md.modalities || { input: ['text'], output: ['text'] },

                    // Token Limits
                    limit: md.limit || { context: 4096, output: 4096 },

                    // Cost (if available)
                    ...(md.cost ? { cost: md.cost } : {})
                });
            }
        }

        res.json({ object: "list", data: models });
    } catch (error: any) {
        console.error('Models API Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend securely running on http://localhost:${PORT}`);
});
