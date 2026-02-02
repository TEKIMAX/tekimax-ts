import { type FC, useEffect, useRef } from "react"
import type { Message } from "tekimax-ts"
import { cn } from "../lib/utils"
import { Thinking } from "./Thinking"
import { User, Bot } from "lucide-react"

export interface MessageListProps {
    messages: Message[]
    isLoading?: boolean
    className?: string
}

export const MessageList: FC<MessageListProps> = ({ messages, isLoading, className }) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isLoading])

    return (
        <div ref={scrollRef} className={cn("flex-1 overflow-y-auto p-4 space-y-4", className)}>
            {messages.map((m, i) => (
                <div
                    key={i}
                    className={cn(
                        "flex gap-3 max-w-[85%]",
                        m.role === "user" ? "ml-auto flex-row-reverse" : ""
                    )}
                >
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                        m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}>
                        {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div className={cn(
                        "rounded-lg px-4 py-3 text-sm border",
                        m.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                    )}>
                        <div>{m.content}</div>
                        {m.toolCalls && (
                            <div className="mt-2 text-xs opacity-70 border-t pt-2 border-foreground/20">
                                {m.toolCalls.map((tc, idx) => (
                                    <div key={idx} className="font-mono">
                                        Executing: {tc.function.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {isLoading && <Thinking className="ml-12" />}
        </div>
    )
}
