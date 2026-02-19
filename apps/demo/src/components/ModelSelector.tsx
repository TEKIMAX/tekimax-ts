import { useState, useEffect } from "react"
import { ChevronDown, Check, Zap, Eye, Wrench, Search } from "lucide-react"

export type ModelFeature = {
    id: string
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
            setModels([{ id: "gpt-4o", vision: true, tools: true }, { id: "claude-3.5-sonnet", vision: true, tools: true }])
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

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium text-zinc-200"
            >
                <Zap className="w-4 h-4 text-emerald-400" />
                {selectedModel || "Select Model"}
                <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-72 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-20 py-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

                        <div className="p-2 border-b border-zinc-800">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2 w-4 h-4 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Search models..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-md py-1.5 pl-9 pr-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="px-3 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-zinc-800">
                            {loading ? "Discovering Models..." : error ? (
                                <span className="text-red-400 flex items-center gap-1">⚠ {error}</span>
                            ) : "Available Models"}
                        </div>

                        <div className="max-h-64 overflow-y-auto p-1">
                            {models.filter(m => m.id.toLowerCase().includes(searchQuery.toLowerCase())).map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => {
                                        onSelect(m.id)
                                        setIsOpen(false)
                                        setSearchQuery("") // Reset search on select
                                    }}
                                    className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${selectedModel === m.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-300 hover:bg-zinc-800/50 hover:text-zinc-100"
                                        }`}
                                >
                                    <span className="font-medium truncate">{m.id}</span>
                                    <div className="flex items-center gap-1.5">
                                        {m.vision && <span title="Vision Support"><Eye className="w-3.5 h-3.5 text-blue-400" /></span>}
                                        {m.tools && <span title="Tool Calling Support"><Wrench className="w-3.5 h-3.5 text-orange-400" /></span>}
                                        {selectedModel === m.id && <Check className="w-4 h-4 text-emerald-400 ml-1" />}
                                    </div>
                                </button>
                            ))}
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}
