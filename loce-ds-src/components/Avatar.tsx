import { useEffect, useMemo, useState } from "react";
import { User } from "lucide-react";
import { cn } from "../lib/utils";

const COLOR_VARIANTS = [
    "bg-gradient-to-br from-slate-300 to-slate-500 dark:from-slate-700 dark:to-slate-950",
    "bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-800 dark:to-slate-950",
    "bg-gradient-to-br from-indigo-300 to-indigo-500 dark:from-indigo-800 dark:to-slate-950",
    "bg-gradient-to-br from-violet-300 to-violet-500 dark:from-violet-800 dark:to-slate-950",
    "bg-gradient-to-br from-emerald-300 to-emerald-500 dark:from-emerald-800 dark:to-slate-950",
    "bg-gradient-to-br from-teal-300 to-teal-500 dark:from-teal-800 dark:to-slate-950",
    "bg-gradient-to-br from-rose-300 to-rose-500 dark:from-rose-800 dark:to-slate-950",
    "bg-gradient-to-br from-amber-300 to-amber-500 dark:from-amber-800 dark:to-slate-950",
] as const;

const hashString = (input: string) => { let hash = 0; for (let i = 0; i < input.length; i++) { hash = (hash << 5) - hash + input.charCodeAt(i); hash |= 0; } return Math.abs(hash); };
const getInitials = (name: string) => { const parts = name.trim().split(/\s+/).filter(Boolean); if (parts.length === 0) return ""; if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase(); return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase(); };

type AvatarProps = { src?: string | null; alt: string; size?: number; className?: string; fallback?: "icon" | "initials"; name?: string; offline?: boolean; };

function Avatar({ src, alt, size, className, fallback = "icon", name, offline = false }: AvatarProps) {
    const [hasError, setHasError] = useState(false);
    const normalizedSrc = src?.trim();
    const initials = useMemo(() => (fallback === "initials" ? getInitials(name || alt || "") : ""), [fallback, name, alt]);
    const colorVariant = useMemo(() => { const seed = normalizedSrc || alt || "user"; return COLOR_VARIANTS[hashString(seed) % COLOR_VARIANTS.length]; }, [normalizedSrc, alt]);
    useEffect(() => setHasError(false), [normalizedSrc]);
    const sizeStyle = size ? { width: size, height: size } : undefined;

    if (normalizedSrc && !hasError) {
        return <img src={normalizedSrc} alt={alt} style={sizeStyle} className={cn("rounded-xl object-cover", offline && "grayscale opacity-80", className)} onError={() => setHasError(true)} />;
    }

    return (
        <div aria-label={alt} role="img" style={sizeStyle} className={cn("rounded-xl flex items-center justify-center overflow-hidden select-none text-white", "border border-zinc-300/80 dark:border-white/15", colorVariant, offline && "grayscale opacity-80", className)}>
            {fallback === "initials" && initials ? (
                <span style={size ? { fontSize: Math.max(10, Math.floor(size * 0.42)) } : undefined} className="font-semibold uppercase leading-none tracking-tight">{initials}</span>
            ) : (
                <User className="w-[50%] h-[50%] opacity-80" strokeWidth={2.1} />
            )}
        </div>
    );
}

export { Avatar };
export type { AvatarProps };
