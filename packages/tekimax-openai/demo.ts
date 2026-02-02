import { generateText } from 'tekimax-ts'
import { OpenAIProvider } from './src/index.ts'

async function main() {
    console.log('Initializing OpenAI Provider...')
    const provider = new OpenAIProvider({ apiKey: process.env.OPENAI_API_KEY || 'mock-key' })

    console.log('Calling generateText with OpenAI backend...')
    // Note: This will fail at runtime without a valid key, but demonstrates the type contract
    try {
        const result = await generateText({
            adapter: provider,
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: 'Hello from Tekimax + OpenAI!' }]
        })
        console.log('Result:', result.text)
    } catch (error: any) {
        console.log('Runtime check (expected error without key):', error.message)
    }
}

main().catch(console.error)
