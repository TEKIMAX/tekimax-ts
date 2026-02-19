import { AIProvider, ImageGenerationCapability, ImageEditCapability, VisionCapability } from '../core/adapter'
import { ImageGenerationOptions, ImageEditOptions, ImageResult, ImageAnalysisOptions, ImageAnalysisResult } from '../core/types'

export class ImagesNamespace<TProvider extends AIProvider> {
    constructor(private provider: TProvider) { }

    /**
     * Generate images from a prompt. Only available if the provider supports image generation.
     */
    async generate(
        options: TProvider extends ImageGenerationCapability ? ImageGenerationOptions : never
    ): Promise<TProvider extends ImageGenerationCapability ? ImageResult : never> {
        if (!('generateImage' in this.provider)) {
            throw new Error(`Provider '${this.provider.name}' does not support image generation`)
        }
        return (this.provider as unknown as ImageGenerationCapability).generateImage(options as any) as any
    }

    /**
     * Edit an image with a prompt. Only available if the provider supports image editing.
     */
    async edit(
        options: TProvider extends ImageEditCapability ? ImageEditOptions : never
    ): Promise<TProvider extends ImageEditCapability ? ImageResult : never> {
        if (!('editImage' in this.provider)) {
            throw new Error(`Provider '${this.provider.name}' does not support image editing`)
        }
        return (this.provider as unknown as ImageEditCapability).editImage(options as any) as any
    }

    /**
     * Analyze an image (Vision). Only available if the provider supports vision analytics.
     */
    async analyze(
        options: TProvider extends VisionCapability ? ImageAnalysisOptions : never
    ): Promise<TProvider extends VisionCapability ? ImageAnalysisResult : never> {
        if (!('analyzeImage' in this.provider)) {
            throw new Error(`Provider '${this.provider.name}' does not support image analysis`)
        }
        return (this.provider as unknown as VisionCapability).analyzeImage(options as any) as any
    }
}
