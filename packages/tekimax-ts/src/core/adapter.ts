import type {
    ChatOptions,
    ChatResult,
    StreamChunk,
    ImageGenerationOptions,
    ImageEditOptions,
    ImageResult,
    ImageAnalysisOptions,
    ImageAnalysisResult,
    SpeechGenerationOptions,
    SpeechResult,
    VideoGenerationOptions,
    VideoResult,
    VideoAnalysisOptions,
    VideoAnalysisResult
} from './types'

export interface AIProvider {
    name: string

    /**
     * Send a chat completion request.
     */
    chat: (options: ChatOptions) => Promise<ChatResult>

    /**
     * Stream a chat completion.
     */
    chatStream: (options: ChatOptions) => AsyncIterable<StreamChunk>

    // --- Multi-Modal Interfaces ---

    /**
     * Generate an image.
     */
    generateImage?: (options: ImageGenerationOptions) => Promise<ImageResult>

    /**
     * Edit an image.
     */
    editImage?: (options: ImageEditOptions) => Promise<ImageResult>

    /**
     * Analyze an image (Vision).
     */
    analyzeImage?: (options: ImageAnalysisOptions) => Promise<ImageAnalysisResult>

    /**
     * Generate speech from text (TTS).
     */
    generateSpeech?: (options: SpeechGenerationOptions) => Promise<SpeechResult>

    /**
     * Generate a video.
     */
    generateVideo?: (options: VideoGenerationOptions) => Promise<VideoResult>

    /**
     * Analyze a video (Video-to-Text).
     */
    analyzeVideo?: (options: VideoAnalysisOptions) => Promise<VideoAnalysisResult>
}

