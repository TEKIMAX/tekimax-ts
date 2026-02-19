import express from 'express';
import cors from 'cors';
import { Tekimax, OpenAIProvider } from 'tekimax-ts';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, model, providerConfig } = req.body;

        // Securely instantiate the Tekimax SDK *only* on the backend
        const client = new Tekimax({
            provider: new OpenAIProvider({
                apiKey: providerConfig?.apiKey || 'sk-default',
                baseURL: providerConfig?.baseURL || 'http://localhost:8080/v1',
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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend securely running on http://localhost:${PORT}`);
});
