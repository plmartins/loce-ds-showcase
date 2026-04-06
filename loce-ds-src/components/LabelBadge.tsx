import { X } from "lucide-react";
import { cn } from "../lib/utils";

type LabelBadgeProps = { name: string; color: string; onRemove?: () => void; size?: "sm" | "default"; className?: string; };

function LabelBadge({ name, color, onRemove, size = "sm", className }: LabelBadgeProps) {
    return (
        <span className={cn("inline-flex items-center gap-1 font-semibold rounded-xl whitespace-nowrap", size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1", className)} style={{ backgroundColor: `${color}18`, color }}>
            <span className={cn("rounded-full shrink-0", size === "sm" ? "size-1.5" : "size-2")} style={{ backgroundColor: color }} />
            {name}
            {onRemove && (
                <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors active:scale-90 duration-75">
                    <X size={size === "sm" ? 10 : 12} />
                </button>
            )}
        </span>
    );
}

export { LabelBadge };
export type { LabelBadgeProps };
