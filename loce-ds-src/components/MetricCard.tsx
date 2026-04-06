import { cn } from "../lib/utils";
import { Skeleton } from "./Skeleton";
import type { LucideIcon } from "lucide-react";

const accentColors = {
    green: { glow: "from-emerald-500/10 via-transparent", icon: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", ring: "ring-emerald-200/50 dark:ring-emerald-500/10" },
    red: { glow: "from-red-500/10 via-transparent", icon: "bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400", ring: "ring-red-200/50 dark:ring-red-500/10" },
    yellow: { glow: "from-amber-500/10 via-transparent", icon: "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400", ring: "ring-amber-200/50 dark:ring-amber-500/10" },
    purple: { glow: "from-violet-500/10 via-transparent", icon: "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400", ring: "ring-violet-200/50 dark:ring-violet-500/10" },
    blue: { glow: "from-blue-500/10 via-transparent", icon: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400", ring: "ring-blue-200/50 dark:ring-blue-500/10" },
} as const;

type MetricCardProps = { title: string; value: string | number; icon?: LucideIcon; image?: string; description?: string; trend?: { value: string; positive: boolean }; progress?: { value: number; color?: string }; loading?: boolean; accent?: keyof typeof accentColors; className?: string; };

function MetricCard({ title, value, icon: Icon, image, description, trend, progress, loading, accent, className }: MetricCardProps) {
    const colors = accent ? accentColors[accent] : null;
    return (
        <div className={cn("relative flex flex-col gap-2 p-5 rounded-2xl ring-1 overflow-hidden bg-white dark:bg-white/[0.03]", colors ? colors.ring : "ring-neutral-200 dark:ring-neutral-700", className)}>
            {colors && <div className={cn("absolute inset-0 bg-gradient-to-br to-50% pointer-events-none", colors.glow)} />}
            <div className="relative flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">{title}</span>
                {image ? <img src={image} alt={title} className="size-8 object-contain" /> : Icon ? (
                    <div className={cn("flex items-center justify-center size-8 rounded-xl", colors ? colors.icon : "bg-neutral-100 dark:bg-white/5 text-neutral-400")}><Icon size={16} /></div>
                ) : null}
            </div>
            {loading ? <Skeleton className="relative h-8 w-24 rounded-xl" /> : (
                <div className="relative flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-dark dark:text-light tracking-tight">{value}</span>
                    {trend && <span className={cn("text-xs font-bold", trend.positive ? "text-emerald-500" : "text-red-500")}>{trend.positive ? "+" : ""}{trend.value}</span>}
                </div>
            )}
            {(progress || description) && (
                <div className="relative flex items-center gap-2">
                    {description && <span className="text-xs font-semibold text-neutral-400 shrink-0">{description}</span>}
                    {progress && (
                        <div className="flex-1 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700">
                            <div className={cn("h-full rounded-full transition-all duration-500", progress.color || "bg-loce")} style={{ width: `${Math.min(100, Math.max(0, progress.value))}%` }} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export { MetricCard };
export type { MetricCardProps };
