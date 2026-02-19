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
    VideoAnalysisResult,
    TranscriptionOptions,
    TranscriptionResult,
    EmbeddingOptions,
    EmbeddingResult,
    ModelDefinition
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

    /**
     * Optional: Fetch the catalog of available models from this provider.
     * Returns OpenResponses-compliant ModelDefinition objects fused with
     * models.dev metadata (modalities, limits, reasoning flags).
     */
    getModels?: () => Promise<ModelDefinition[]>
}

// --- Multi-Modal Capability Interfaces ---

export interface ImageGenerationCapability {
    /**
     * Generate an image.
     */
    generateImage: (options: ImageGenerationOptions) => Promise<ImageResult>
}

export interface ImageEditCapability {
    /**
     * Edit an image.
     */
    editImage: (options: ImageEditOptions) => Promise<ImageResult>
}

export interface VisionCapability {
    /**
     * Analyze an image (Vision).
     */
    analyzeImage: (options: ImageAnalysisOptions) => Promise<ImageAnalysisResult>
}

export interface SpeechGenerationCapability {
    /**
     * Generate speech from text (TTS).
     */
    generateSpeech: (options: SpeechGenerationOptions) => Promise<SpeechResult>
}

export interface TranscriptionCapability {
    /**
     * Transcribe audio to text (STT).
     */
    transcribeAudio: (options: TranscriptionOptions) => Promise<TranscriptionResult>
}

export interface VideoGenerationCapability {
    /**
     * Generate a video.
     */
    generateVideo: (options: VideoGenerationOptions) => Promise<VideoResult>
}

export interface VideoAnalysisCapability {
    /**
     * Analyze a video (Video-to-Text).
     */
    analyzeVideo: (options: VideoAnalysisOptions) => Promise<VideoAnalysisResult>
}

export interface EmbeddingCapability {
    /**
     * Generate embeddings for text input(s).
     */
    embed: (options: EmbeddingOptions) => Promise<EmbeddingResult>
}

