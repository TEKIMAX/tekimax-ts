import { AIProvider, SpeechGenerationCapability, TranscriptionCapability } from '../core/adapter'
import { SpeechGenerationOptions, SpeechResult, TranscriptionOptions, TranscriptionResult } from '../core/types'

export class AudioNamespace<TProvider extends AIProvider> {
    constructor(private provider: TProvider) { }

    /**
     * Convert text to speech. Only available if the provider supports TTS.
     */
    async speak(
        options: TProvider extends SpeechGenerationCapability ? SpeechGenerationOptions : never
    ): Promise<TProvider extends SpeechGenerationCapability ? SpeechResult : never> {
        if (!('generateSpeech' in this.provider)) {
            throw new Error(`Provider '${this.provider.name}' does not support speech generation`)
        }
        return (this.provider as unknown as SpeechGenerationCapability).generateSpeech(options as any) as any
    }

    /**
     * Transcribe audio to text. Only available if the provider supports STT.
     */
    async transcribe(
        options: TProvider extends TranscriptionCapability ? TranscriptionOptions : never
    ): Promise<TProvider extends TranscriptionCapability ? TranscriptionResult : never> {
        if (!('transcribeAudio' in this.provider)) {
            throw new Error(`Provider '${this.provider.name}' does not support audio transcription`)
        }
        return (this.provider as unknown as TranscriptionCapability).transcribeAudio(options as any) as any
    }
}
