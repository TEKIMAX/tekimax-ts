import * as React from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { Brain, ChevronDown } from "lucide-react"
import { Markdown } from "./markdown"

interface ReasoningProps extends React.ComponentProps<typeof Collapsible> {
    isStreaming?: boolean
}

const Reasoning = React.forwardRef<React.ElementRef<typeof Collapsible>, ReasoningProps>(
    ({ className, isStreaming, children, ...props }, ref) => {
        return (
            <Collapsible
                ref={ref}
                className={cn("group space-y-2", className)}
                {...props}
            >
                {children}
            </Collapsible>
        )
    }
)
Reasoning.displayName = "Reasoning"

const ReasoningTrigger = React.forwardRef<
    React.ElementRef<typeof CollapsibleTrigger>,
    React.ComponentProps<typeof CollapsibleTrigger>
>(({ className, children, ...props }, ref) => (
    <CollapsibleTrigger
        ref={ref}
        className={cn(
            "flex w-full items-center gap-2 rounded-md py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
            "[&[data-state=open]>svg:last-child]:rotate-180",
            className
        )}
        {...props}
    >
        <Brain className="h-4 w-4" />
        <span className="flex-1 text-left">{children}</span>
        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
    </CollapsibleTrigger>
))
ReasoningTrigger.displayName = "ReasoningTrigger"

interface ReasoningContentProps extends React.ComponentProps<typeof CollapsibleContent> {
    markdown?: boolean
}

const ReasoningContent = React.forwardRef<React.ElementRef<typeof CollapsibleContent>, ReasoningContentProps>(
    ({ className, children, markdown, ...props }, ref) => (
        <CollapsibleContent
            ref={ref}
            className={cn(
                "overflow-hidden text-sm data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
                className
            )}
            {...props}
        >
            <div className="pt-1 pb-2">
                {markdown ? (
                    <Markdown className="prose-xs text-muted-foreground">
                        {children as string}
                    </Markdown>
                ) : (
                    <div className="text-muted-foreground">{children}</div>
                )}
            </div>
        </CollapsibleContent>
    )
)
ReasoningContent.displayName = "ReasoningContent"

export { Reasoning, ReasoningTrigger, ReasoningContent }
