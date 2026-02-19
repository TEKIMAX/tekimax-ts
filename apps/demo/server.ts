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
                apiKey: process.env.MODEL_PROXY_KEY || providerConfig?.apiKey || 'sk-default',
                baseURL: process.env.MODEL_PROXY_URL || providerConfig?.baseURL || 'http://localhost:8080/v1',
            })
        });

        // We can securely invoke the SDK here without dangerouslyAllowBrowser
        const response = await client.text.chat.completions.create({
            model: model || 'gpt-4o',
            messages: messages,
        });

        res.json({ content: response.message.content });
    } catch (error: any) {
        console.error('API Error:', error);
        res.status(500).json({ error: error.message });
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

        // models.dev/api.json structure: { [providerId]: { name, models: { [modelId]: { id, name, modalities, tool_call } } } }
        for (const [providerId, providerData] of Object.entries(registry)) {
            if (!providerData || !providerData.models) continue;

            for (const [modelId, modelData] of Object.entries(providerData.models)) {
                const md = modelData as any;
                models.push({
                    id: md.id || modelId,
                    object: "model",
                    created: Math.floor(Date.now() / 1000),
                    owned_by: (providerData as any).name || providerId,
                    meta: {
                        vision: md.modalities?.input?.includes("image") || false,
                        tools: md.tool_call || false,
                        audio: md.modalities?.input?.includes("audio") || false
                    }
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
