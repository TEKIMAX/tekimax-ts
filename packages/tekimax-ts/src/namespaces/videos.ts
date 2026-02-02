import { AIProvider } from '../core/adapter'
import { VideoGenerationOptions, VideoResult, VideoAnalysisOptions, VideoAnalysisResult } from '../core/types'

export class VideosNamespace {
    constructor(private provider: AIProvider) { }

    /**
     * Generate a video from a prompt.
     */
    async generate(options: VideoGenerationOptions): Promise<VideoResult> {
        if (!this.provider.generateVideo) {
            throw new Error(`Provider '${this.provider.name}' does not support video generation`)
        }
        return this.provider.generateVideo(options)
    }

    /**
     * Analyze a video (Video-to-Text).
     */
    async analyze(options: VideoAnalysisOptions): Promise<VideoAnalysisResult> {
        if (!this.provider.analyzeVideo) {
            throw new Error(`Provider '${this.provider.name}' does not support video analysis`)
        }
        return this.provider.analyzeVideo(options)
    }
}
