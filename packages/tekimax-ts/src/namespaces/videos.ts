import { AIProvider, VideoGenerationCapability, VideoAnalysisCapability } from '../core/adapter'
import { VideoGenerationOptions, VideoResult, VideoAnalysisOptions, VideoAnalysisResult } from '../core/types'

export class VideosNamespace<TProvider extends AIProvider> {
    constructor(private provider: TProvider) { }

    /**
     * Generate a video from a prompt. Only available if the provider supports video generation.
     */
    async generate(
        options: TProvider extends VideoGenerationCapability ? VideoGenerationOptions : never
    ): Promise<TProvider extends VideoGenerationCapability ? VideoResult : never> {
        if (!('generateVideo' in this.provider)) {
            throw new Error(`Provider '${this.provider.name}' does not support video generation`)
        }
        return (this.provider as unknown as VideoGenerationCapability).generateVideo(options as any) as any
    }

    /**
     * Analyze a video (Video-to-Text). Only available if the provider supports video analysis.
     */
    async analyze(
        options: TProvider extends VideoAnalysisCapability ? VideoAnalysisOptions : never
    ): Promise<TProvider extends VideoAnalysisCapability ? VideoAnalysisResult : never> {
        if (!('analyzeVideo' in this.provider)) {
            throw new Error(`Provider '${this.provider.name}' does not support video analysis`)
        }
        return (this.provider as unknown as VideoAnalysisCapability).analyzeVideo(options as any) as any
    }
}
