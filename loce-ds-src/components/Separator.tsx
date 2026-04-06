import { cn } from "../lib/utils";

type SeparatorProps = {
    className?: string;
    orientation?: "horizontal" | "vertical";
    label?: string;
};

function Separator({ className, orientation = "horizontal", label }: SeparatorProps) {
    if (label) {
        return (
            <div className={cn("flex items-center gap-3", className)}>
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                <span className="text-xs font-medium text-neutral-400 select-none">{label}</span>
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
            </div>
        );
    }
    if (orientation === "vertical") {
        return <div className={cn("w-px h-full bg-neutral-200 dark:bg-neutral-700", className)} />;
    }
    return <div className={cn("w-full h-px bg-neutral-200 dark:bg-neutral-700", className)} />;
}

export { Separator };
export type { SeparatorProps };
