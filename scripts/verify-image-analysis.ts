
import { Tekimax, AIProvider, ImageAnalysisOptions, ImageAnalysisResult } from '../packages/tekimax-ts/src'

class MockVisionProvider implements AIProvider {
    name = 'mock-vision'

    // Implement required chat/chatStream with strict types
    async chat(options: any): Promise<any> { return { message: { role: 'assistant', content: '' } } }
    async *chatStream(options: any): AsyncIterable<any> { yield { delta: '' } }

    async analyzeImage(options: ImageAnalysisOptions): Promise<ImageAnalysisResult> {
        console.log(`   👀 Analyzing image with model: ${options.model}`)
        return {
            content: "I see a futuristic city with glowing neon lights.",
            usage: { totalTokens: 150 }
        }
    }
}

async function runVerification() {
    console.log("1. Instantiating Tekimax Client (Vision)...")
    const provider = new MockVisionProvider()
    const client = new Tekimax({ provider })

    console.log("2. Verifying Image Analysis...")
    if (client.images && typeof client.images.analyze === 'function') {
        const analysis = await client.images.analyze({
            image: "https://mock.url/image.png",
            model: "gpt-4o",
            prompt: "Describe this image"
        })
        console.log("   ✅ Image Analysis OK:", analysis.content)
    } else {
        console.error("   ❌ Image Analysis Missing")
        process.exit(1)
    }
}

runVerification().catch(console.error)
