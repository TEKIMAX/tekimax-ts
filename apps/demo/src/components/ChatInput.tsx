import { useState } from "react"
import { Send, Image as ImageIcon, Loader2 } from "lucide-react"

interface Props {
    input: string
    handleInputChange: (e: any) => void
    handleSubmit: (e: any) => void
    isLoading: boolean
    hasVision: boolean
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading, hasVision }: Props) {
    const [isFocused, setIsFocused] = useState(false)

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <div className="p-4 mx-auto max-w-3xl w-full">
            <form
                onSubmit={handleSubmit}
                className={`relative flex items-end gap-2 bg-zinc-900 border rounded-2xl p-2 transition-all duration-300 ${isFocused ? "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]" : "border-zinc-800 shadow-lg"
                    }`}
            >
                {/* Attachment Button */}
                {hasVision && (
                    <button
                        type="button"
                        className="p-3 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-xl transition-colors shrink-0"
                        title="Attach Image"
                    >
                        <ImageIcon className="w-5 h-5" />
                    </button>
                )}

                <textarea
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={onKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent border-0 text-zinc-100 placeholder:text-zinc-600 resize-none min-h-[44px] max-h-48 py-3 px-2 focus:outline-none focus:ring-0 text-[15px] leading-relaxed"
                    rows={1}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className={`p-3 shrink-0 rounded-xl transition-all duration-300 flex items-center justify-center ${input.trim() && !isLoading
                            ? "bg-zinc-100 text-zinc-900 hover:bg-white hover:scale-105"
                            : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"
                        }`}
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </button>
            </form>
        </div>
    )
}
