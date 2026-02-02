
export function BrandLogo() {
    return (
        <div className="relative mr-10">
            <img
                src="/tekimax-logo.png"
                alt="Tekimax Logo"
                className="w-30 h-10 object-contain"
            />
            <span className="absolute top-1.5 -right-7 font-bold tracking-tighter text-[10px] text-muted-foreground">SDK</span>
        </div>
    );
}
