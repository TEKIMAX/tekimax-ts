import type { AIProvider } from './core/adapter'
import type { ChatOptions, ChatResult, TekimaxPlugin } from './core/types'
import { TextNamespace, ImagesNamespace, AudioNamespace, VideosNamespace } from './namespaces'

export interface TekimaxOptions<TProvider extends AIProvider> {
    provider: TProvider
    plugins?: TekimaxPlugin[]
}

export class Tekimax<TProvider extends AIProvider> {
    private provider: TProvider
    public plugins: TekimaxPlugin[]

    public text: TextNamespace<TProvider>
    public images: ImagesNamespace<TProvider>
    public audio: AudioNamespace<TProvider>
    public videos: VideosNamespace<TProvider>

    constructor(options: TekimaxOptions<TProvider>) {
        this.provider = options.provider
        this.plugins = options.plugins || []

        // Fire onInit for all plugins
        for (const plugin of this.plugins) {
            if (plugin.onInit) plugin.onInit(this)
        }

        this.text = new TextNamespace<TProvider>(this.provider, this.plugins)
        this.images = new ImagesNamespace<TProvider>(this.provider)
        this.audio = new AudioNamespace<TProvider>(this.provider)
        this.videos = new VideosNamespace<TProvider>(this.provider)
    }

    /**
     * @deprecated Use client.text.chat instead. Kept for backward compatibility.
     */
    get chat() {
        return this.text.chat
    }
}
