
import { Tekimax, AIProvider, ChatOptions, ChatResult, ImageGenerationOptions, ImageResult, SpeechGenerationOptions, SpeechResult, VideoGenerationOptions, VideoResult } from '../packages/tekimax-ts/src'

class MockMultiModalProvider implements AIProvider {
    name = 'mock-multimodal'

    async chat(options: ChatOptions): Promise<ChatResult> {
        return {
            content: "Mock Text Response",
            role: "assistant",
            usage: { inputTokens: 10, outputTokens: 5, totalTokens: 15 }
        }
    }

    async *chatStream(options: ChatOptions) {
        yield { content: "Mock", type: "text" }
        yield { content: " Stream", type: "text" }
    }

    async generateImage(options: ImageGenerationOptions): Promise<ImageResult> {
        return {
            created: Date.now(),
            data: [{ url: "https://mock.url/image.png" }]
        }
    }

    async generateSpeech(options: SpeechGenerationOptions): Promise<SpeechResult> {
        return {
            buffer: new ArrayBuffer(0), // Mock buffer
            headers: { 'Content-Type': 'audio/mpeg' }
        }
    }

    async generateVideo(options: VideoGenerationOptions): Promise<VideoResult> {
        return {
            data: [{ url: "https://mock.url/video.mp4" }]
        }
    }
}

async function runVerification() {
    console.log("1. Instantiating Tekimax Client with MockMultiModalProvider...")
    const provider = new MockMultiModalProvider()
    const client = new Tekimax({ provider })

    console.log("2. Verifying Text Namespace...")
    if (client.text && typeof client.text.generate === 'function') {
        const textRes = await client.text.chat.completions.create({
            model: 'mock',
            messages: [{ role: 'user', content: 'hello' }]
        })
        console.log("   ✅ Text OK:", textRes.content)
    } else {
        console.error("   ❌ Text Namespace Missing")
    }

    console.log("3. Verifying Images Namespace...")
    if (client.images && typeof client.images.generate === 'function') {
        const imgRes = await client.images.generate({ prompt: 'A cat' })
        console.log("   ✅ Images OK:", imgRes.data[0].url)
    } else {
        console.error("   ❌ Images Namespace Missing")
    }

    console.log("4. Verifying Audio Namespace...")
    if (client.audio && typeof client.audio.speak === 'function') {
        const audioRes = await client.audio.speak({ input: 'Hello', voice: 'alloy' })
        console.log("   ✅ Audio OK: Buffer size", audioRes.buffer.byteLength)
    } else {
        console.error("   ❌ Audio Namespace Missing")
    }

    console.log("5. Verifying Videos Namespace...")
    if (client.videos && typeof client.videos.generate === 'function') {
        const videoRes = await client.videos.generate({ prompt: 'Running cat' })
        console.log("   ✅ Videos OK:", videoRes.data[0].url)
    } else {
        console.error("   ❌ Videos Namespace Missing")
    }
}

runVerification().catch(console.error)
