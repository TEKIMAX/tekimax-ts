import { Send } from "lucide-react"
import { type ChangeEvent, type FormEvent, type FC, type KeyboardEvent } from "react"
import { cn } from "../lib/utils"

export interface MessageInputProps {
    input: string
    handleInputChange: (e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e?: any) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

export const MessageInput: FC<MessageInputProps> = ({
    input,
    handleInputChange,
    handleSubmit,
    placeholder = "Type a message...",
    className,
    disabled
}) => {
    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (!disabled && input.trim()) {
                handleSubmit(e as unknown as FormEvent)
            }
        }
    }

    return (
        <form className={cn("relative flex items-end w-full p-4 bg-background border-t", className)} onSubmit={handleSubmit}>
            <div className="relative w-full flex items-center gap-2">
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex min-h-[44px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none max-h-32"
                    rows={1}
                    style={{ height: '44px' }} // Simple fixed height for now, could actuate
                />
                <button
                    type="submit"
                    disabled={disabled || !input.trim()}
                    className="inline-flex items-center justify-center p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                >
                    <Send className="w-5 h-5" />
                    <span className="sr-only">Send</span>
                </button>
            </div>
        </form>
    )
}
