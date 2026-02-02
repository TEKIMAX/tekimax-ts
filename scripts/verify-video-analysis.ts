
import { Tekimax, AIProvider, ChatOptions, ChatResult, ImageGenerationOptions, ImageResult, SpeechGenerationOptions, SpeechResult, VideoGenerationOptions, VideoResult, VideoAnalysisOptions, VideoAnalysisResult } from '../packages/tekimax-ts/src'

class MockMultiModalProvider implements AIProvider {
    name = 'mock-multimodal'

    async chat(options: ChatOptions): Promise<ChatResult> {
        return {
            content: "Mock Text Response",
            role: "assistant",
        }
    }

    async *chatStream(options: ChatOptions) {
        yield { content: "Mock", type: "text" }
    }

    async generateImage(options: ImageGenerationOptions): Promise<ImageResult> {
        return { created: Date.now(), data: [{ url: "https://mock.url/image.png" }] }
    }

    async generateSpeech(options: SpeechGenerationOptions): Promise<SpeechResult> {
        return { buffer: new ArrayBuffer(0) }
    }

    async generateVideo(options: VideoGenerationOptions): Promise<VideoResult> {
        return { data: [{ url: "https://mock.url/video.mp4" }] }
    }

    async analyzeVideo(options: VideoAnalysisOptions): Promise<VideoAnalysisResult> {
        return {
            content: "The video shows a cat running in a field of sunflowers.",
            usage: { totalTokens: 100 }
        }
    }
}

async function runVerification() {
    console.log("1. Instantiating Tekimax Client...")
    const provider = new MockMultiModalProvider()
    const client = new Tekimax({ provider })

    console.log("2. Verifying Video Analysis...")
    if (typeof client.videos.analyze === 'function') {
        const analysis = await client.videos.analyze({
            video: "https://mock.url/video.mp4",
            model: "veo",
            prompt: "Describe the video"
        })
        console.log("   ✅ Video Analysis OK:", analysis.content)
    } else {
        console.error("   ❌ Video Analysis Missing")
    }
}

runVerification().catch(console.error)
