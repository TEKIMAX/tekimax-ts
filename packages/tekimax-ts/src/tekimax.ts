import type { AIProvider } from './core/adapter'
import type { ChatOptions, ChatResult } from './core/types'
import { TextNamespace, ImagesNamespace, AudioNamespace, VideosNamespace } from './namespaces'

export interface TekimaxOptions {
    provider: AIProvider
}

export class Tekimax {
    private provider: AIProvider

    public text: TextNamespace
    public images: ImagesNamespace
    public audio: AudioNamespace
    public videos: VideosNamespace

    constructor(options: TekimaxOptions) {
        this.provider = options.provider
        this.text = new TextNamespace(this.provider)
        this.images = new ImagesNamespace(this.provider)
        this.audio = new AudioNamespace(this.provider)
        this.videos = new VideosNamespace(this.provider)
    }

    /**
     * @deprecated Use client.text.chat instead. Kept for backward compatibility.
     */
    get chat() {
        return this.text.chat
    }
}
