import { Brain, Cpu, User } from "lucide-react"

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

interface Props {
    messages: Message[]
}

function parseThinking(content: string) {
    // Simple regex to parse `<think>...</think>` from DeepSeek / R1 model responses
    const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/)
    if (thinkMatch) {
        return {
            thinking: thinkMatch[1].trim(),
            actualText: content.replace(/<think>[\s\S]*?<\/think>/, '').trim()
        }
    }
    return { thinking: null, actualText: content }
}

export function MessageList({ messages }: Props) {
    return (
        <div className="flex-1 overflow-y-auto px-4 py-8 space-y-8 scroll-smooth will-change-scroll pb-32">
            {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                        <Cpu className="w-8 h-8 text-zinc-600" />
                    </div>
                    <h2 className="text-xl font-medium tracking-tight text-zinc-400">Tekimax Platform AI</h2>
                    <p className="text-zinc-500 max-w-sm text-sm">Select a dynamic model from your internal API gateway and say hello to test the pipeline.</p>
                </div>
            )}

            {messages.map((m) => {
                const { thinking, actualText } = parseThinking(m.content)
                const isUser = m.role === 'user'

                return (
                    <div
                        key={m.id}
                        className={`max-w-3xl mx-auto flex gap-4 w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${isUser ? "flex-row-reverse" : "flex-row"
                            }`}
                    >
                        {/* Avatar */}
                        <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-1 border ${isUser ? "bg-zinc-800 border-zinc-700 ml-2" : "bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500/20 mr-2"
                            }`}>
                            {isUser ? <User className="w-4 h-4 text-zinc-400" /> : <Cpu className="w-4 h-4 text-green-400" />}
                        </div>

                        {/* Bubble */}
                        <div className={`flex flex-col gap-2 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
                            {/* Reasoning Block */}
                            {thinking && (
                                <details className="w-full text-zinc-400 text-sm bg-zinc-900 border border-zinc-800/50 rounded-xl p-3 shadow-inner group cursor-pointer transition-all hover:border-zinc-700">
                                    <summary className="font-medium list-none flex items-center gap-2 select-none group-open:mb-3">
                                        <Brain className="w-4 h-4 text-zinc-500 group-open:text-green-500 transition-colors" />
                                        <span className="group-open:text-green-500 transition-colors">Analyzed context...</span>
                                    </summary>
                                    <p className="font-mono text-xs whitespace-pre-wrap leading-relaxed opacity-80">{thinking}</p>
                                </details>
                            )}

                            {/* Chat Content */}
                            {actualText && (
                                <div
                                    className={`px-5 py-3.5 text-[15px] leading-relaxed ${isUser
                                        ? "bg-zinc-200 text-zinc-900 rounded-2xl rounded-tr-sm"
                                        : "bg-transparent text-zinc-100 rounded-2xl rounded-tl-sm prose prose-invert prose-green max-w-none"
                                        }`}
                                >
                                    <div className="whitespace-pre-wrap">{actualText}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
