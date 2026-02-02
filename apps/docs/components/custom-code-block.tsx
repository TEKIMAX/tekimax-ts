'use client';

import { Check, Copy } from 'lucide-react';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utils file, otherwise I'll define it or use generic classnames

export function CustomCodeBlock({
    children,
    className,
    title,
    lang,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    title?: string;
    lang?: string;
    html?: string;
}) {
    const [copied, setCopied] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const onCopy = () => {
        if (ref.current) {
            navigator.clipboard.writeText(ref.current.innerText || '');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="group relative my-4 border border-zinc-800 bg-zinc-950 text-sm font-mono rounded-xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 py-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                    {/* Optional Lanaguage Icon/Badge could go here */}
                    <span className="font-medium text-foreground/80 tracking-tight">
                        {title || (lang ? lang.toUpperCase() : 'Code')}
                    </span>
                </div>
                <button
                    onClick={onCopy}
                    className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground text-[10px] uppercase font-bold tracking-wider"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="h-3 w-3" />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="relative overflow-x-auto bg-zinc-950 p-4 [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0 [&_code]:!bg-transparent [&_pre]:!whitespace-pre [&_code]:!whitespace-pre [&_code]:!divide-y-0 [&_span]:!border-t-0">
                <div ref={ref} className={cn("overflow-x-auto", className)} {...props}>
                    {props.html ? (
                        <div dangerouslySetInnerHTML={{ __html: props.html }} />
                    ) : (
                        children
                    )}
                </div>
            </div>
        </div>
    );
}
