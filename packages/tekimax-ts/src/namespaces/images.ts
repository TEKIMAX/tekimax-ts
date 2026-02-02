import { AIProvider } from '../core/adapter'
import { ImageGenerationOptions, ImageEditOptions, ImageResult, ImageAnalysisOptions, ImageAnalysisResult } from '../core/types'

export class ImagesNamespace {
    constructor(private provider: AIProvider) { }

    /**
     * Generate images from a prompt.
     */
    async generate(options: ImageGenerationOptions): Promise<ImageResult> {
        if (!this.provider.generateImage) {
            throw new Error(`Provider '${this.provider.name}' does not support image generation`)
        }
        return this.provider.generateImage(options)
    }

    /**
     * Edit an image with a prompt.
     */
    async edit(options: ImageEditOptions): Promise<ImageResult> {
        if (!this.provider.editImage) {
            throw new Error(`Provider '${this.provider.name}' does not support image editing`)
        }
        return this.provider.editImage(options)
    }

    /**
     * Analyze an image (Vision).
     */
    async analyze(options: ImageAnalysisOptions): Promise<ImageAnalysisResult> {
        if (!this.provider.analyzeImage) {
            throw new Error(`Provider '${this.provider.name}' does not support image analysis`)
        }
        return this.provider.analyzeImage(options)
    }
}
