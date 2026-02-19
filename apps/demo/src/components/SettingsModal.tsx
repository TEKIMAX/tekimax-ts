import { useState, useEffect } from "react"
import { Settings, Key, Server, X } from "lucide-react"

export function SettingsModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [apiKey, setApiKey] = useState("")
    const [baseUrl, setBaseUrl] = useState("")

    // Load saved settings
    useEffect(() => {
        setApiKey(localStorage.getItem("tekimax_custom_api_key") || "")
        setBaseUrl(localStorage.getItem("tekimax_custom_base_url") || "http://localhost:8080/v1")
    }, [])

    const saveSettings = () => {
        localStorage.setItem("tekimax_custom_api_key", apiKey)
        localStorage.setItem("tekimax_custom_base_url", baseUrl)

        // Dispatch a custom event so the main App knows to re-render the client
        window.dispatchEvent(new Event('tekimax_settings_updated'))
        setIsOpen(false)
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-100 transition-colors"
                title="Settings"
            >
                <Settings className="w-5 h-5" />
            </button>
        )
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-zinc-100 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-zinc-400" />
                        Gateway Configure
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <Key className="w-4 h-4 text-zinc-500" />
                            Internal Gateway API Key
                        </label>
                        <input
                            type="password"
                            placeholder="sk-..."
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:border-green-500/50 transition-all font-mono placeholder:text-zinc-600"
                        />
                        <p className="text-xs text-zinc-500">The Auth Token required by your internal `model.dev` proxy router.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                            <Server className="w-4 h-4 text-zinc-500" />
                            Proxy Base URL
                        </label>
                        <input
                            type="url"
                            placeholder="http://localhost:8080/v1"
                            value={baseUrl}
                            onChange={(e) => setBaseUrl(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:border-green-500/50 transition-all font-mono placeholder:text-zinc-600"
                        />
                        <p className="text-xs text-zinc-500">The endpoint hosting the unified Models route and Inference gateway.</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950/50 flex justify-end gap-3">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveSettings}
                        className="px-4 py-2 text-sm font-medium bg-zinc-100 text-zinc-900 hover:bg-white transition-colors rounded-lg"
                    >
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    )
}
