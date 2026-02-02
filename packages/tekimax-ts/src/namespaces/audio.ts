import { AIProvider } from '../core/adapter'
import { SpeechGenerationOptions, SpeechResult } from '../core/types'

export class AudioNamespace {
    constructor(private provider: AIProvider) { }

    /**
     * Convert text to speech.
     */
    async speak(options: SpeechGenerationOptions): Promise<SpeechResult> {
        if (!this.provider.generateSpeech) {
            throw new Error(`Provider '${this.provider.name}' does not support speech generation`)
        }
        return this.provider.generateSpeech(options)
    }
}
