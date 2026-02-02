import { type FC } from "react"
import type { UseChatHelpers } from "tekimax-ts/react"
import { cn } from "../lib/utils"
import { MessageList } from "./MessageList"
import { MessageInput } from "./MessageInput"

export interface ChatProps extends UseChatHelpers {
    className?: string
    placeholder?: string
}

export const Chat: FC<ChatProps> = ({
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    className,
    placeholder
}) => {
    return (
        <div className={cn("flex flex-col h-full bg-background border rounded-lg overflow-hidden shadow-sm", className)}>
            <MessageList messages={messages} isLoading={isLoading} />
            <MessageInput
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                placeholder={placeholder}
                disabled={isLoading}
            />
        </div>
    )
}
