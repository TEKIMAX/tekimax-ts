import { Loader2 } from "lucide-react"
import type { FC } from "react"
import { cn } from "../lib/utils"

export interface ThinkingProps {
    className?: string
}

export const Thinking: FC<ThinkingProps> = ({ className }) => {
    return (
        <div className={cn("flex items-center gap-2 text-muted-foreground text-sm py-2", className)}>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Thinking...</span>
        </div>
    )
}
