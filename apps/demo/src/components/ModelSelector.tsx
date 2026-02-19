import { useState, useEffect } from "react"
import { ChevronDown, Check, Zap, Eye, Wrench, Search, Key } from "lucide-react"

export type ModelFeature = {
    id: string
    provider: string
    vision: boolean
    tools: boolean
}

interface Props {
    selectedModel: string
    onSelect: (modelId: string) => void
}

export function ModelSelector({ selectedModel, onSelect }: Props) {
    const [models, setModels] = useState<ModelFeature[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem("tekimax_custom_api_key") || "")

    const [expandedProvider, setExpandedProvider] = useState<string | null>(null)

    const fetchModels = async () => {
        setLoading(true)
        setError("")
        try {
            const baseUrl = localStorage.getItem("tekimax_custom_base_url") || "http://localhost:8080/v1"
            const apiKey = localStorage.getItem("tekimax_custom_api_key") || ""

            const res = await fetch('/api/models', {
                headers: {
                    'x-base-url': baseUrl,
                    'x-api-key': apiKey
                }
            })
            if (!res.ok) throw new Error("Failed to connect to gateway")

            const data = await res.json()
            const mapped = data.data.map((m: any) => ({
                id: m.id,
                provider: m.owned_by || "Other",
                vision: m.meta?.vision || false,
                tools: m.meta?.tools || false
            }))
            setModels(mapped)

            // Auto-select first model if none selected
            if (!selectedModel && mapped.length > 0) {
                onSelect(mapped[0].id)
            }
        } catch (err: any) {
            setError("Gateway unreachable")
            // Fallback models if disconnected
            setModels([
                { id: "gpt-4o", provider: "openai", vision: true, tools: true },
                { id: "claude-3.5-sonnet", provider: "anthropic", vision: true, tools: true }
            ])
        } finally {
            setLoading(false)
        }
    }

    // Reload models when settings change
    useEffect(() => {
        fetchModels()

        const handleUpdate = () => fetchModels()
        window.addEventListener('tekimax_settings_updated', handleUpdate)
        return () => window.removeEventListener('tekimax_settings_updated', handleUpdate)
    }, [])

    const filteredModels = models.filter(m =>
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.provider.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const groupedModels = filteredModels.reduce((acc, model) => {
        if (!acc[model.provider]) acc[model.provider] = [];
        acc[model.provider].push(model);
        return acc;
    }, {} as Record<string, ModelFeature[]>);

    const providers = Object.keys(groupedModels).sort();

    return (
        <div className="relative flex-1 max-w-xs">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium text-zinc-200"
            >
                <div className="flex items-center gap-2 truncate">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">{selectedModel || "Select Model"}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""} shrink-0 ml-2`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-20 py-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                        <div className="p-2 border-b border-zinc-800">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Search providers or models..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        // Auto-expand if searching
                                        if (e.target.value && providers.length === 1) {
                                            setExpandedProvider(providers[0])
                                        }
                                    }}
                                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-md py-1.5 pl-9 pr-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                            {loading ? "Discovering..." : error ? (
                                <span className="text-red-400 flex items-center gap-1">⚠ {error}</span>
                            ) : "Providers"}
                        </div>

                        <div className="max-h-[22rem] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                            {providers.map(provider => (
                                <div key={provider} className="mb-1">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedProvider(expandedProvider === provider ? null : provider);
                                        }}
                                        className="w-full text-left flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors bg-zinc-800/20 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="capitalize">{provider}</span>
                                            <span className="text-xs text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded-md">
                                                {groupedModels[provider].length}
                                            </span>
                                        </div>
                                        <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${expandedProvider === provider ? "rotate-180" : ""}`} />
                                    </button>

                                    {expandedProvider === provider && (
                                        <div className="pl-3 pr-1 pt-1 pb-2 space-y-0.5 border-l-2 border-zinc-800 ml-3 mt-1">

                                            <div className="pr-2 pb-1.5 mb-1.5 border-b border-zinc-800/50">
                                                <div className="relative">
                                                    <Key className="absolute left-2.5 top-1.5 w-3 h-3 text-zinc-500" />
                                                    <input
                                                        type="password"
                                                        placeholder={`Paste API Key...`}
                                                        value={apiKeyInput}
                                                        onChange={(e) => {
                                                            setApiKeyInput(e.target.value)
                                                            localStorage.setItem("tekimax_custom_api_key", e.target.value)
                                                            window.dispatchEvent(new Event('tekimax_settings_updated'))
                                                        }}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded py-1 pl-7 pr-2 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            {groupedModels[provider].map(m => (
                                                <button
                                                    key={m.id}
                                                    onClick={() => {
                                                        onSelect(m.id)
                                                        setIsOpen(false)
                                                        setSearchQuery("")
                                                    }}
                                                    className={`w-full text-left flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-colors ${selectedModel === m.id ? "bg-zinc-700 text-zinc-100" : "text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-200"
                                                        }`}
                                                >
                                                    <span className="font-mono truncate mr-2">{m.id}</span>
                                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                                        {m.vision && <span title="Vision"><Eye className="w-3 h-3 text-blue-400" /></span>}
                                                        {m.tools && <span title="Tool Calling"><Wrench className="w-3 h-3 text-orange-400" /></span>}
                                                        {selectedModel === m.id && <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {providers.length === 0 && !loading && (
                                <div className="p-3 text-center text-zinc-500 text-sm">No models found</div>
                            )}
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}
