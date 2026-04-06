import { Info, type LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

type EmptyStateProps = {
    text?: string;
    description?: string;
    icon?: LucideIcon;
    action?: React.ReactNode;
    secondaryAction?: React.ReactNode;
    variant?: "default" | "minimal" | "horizontal";
    muted?: boolean;
    className?: string;
};

function EmptyState({
    text = "Nenhum resultado encontrado",
    description,
    icon: Icon = Info,
    action,
    secondaryAction,
    variant = "default",
    muted = false,
    className,
}: EmptyStateProps) {
    const iconColor = muted ? "text-neutral-400" : "text-loce";
    if (variant === "minimal") {
        return (
            <div className={cn("flex flex-col items-center justify-center gap-3 py-8 px-6 text-center", className)}>
                <div className="flex items-center justify-center size-10 rounded-2xl bg-neutral-100 dark:bg-white/5">
                    <Icon size={18} className={iconColor} />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">{text}</span>
                    {description && <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">{description}</span>}
                </div>
                {(action || secondaryAction) && <div className="flex items-center gap-2 mt-1">{secondaryAction}{action}</div>}
            </div>
        );
    }

    if (variant === "horizontal") {
        return (
            <div className={cn("flex items-center gap-16 py-8 pl-14 pr-8 rounded-2xl bg-neutral-100/50 dark:bg-white/[0.02] overflow-hidden", className)}>
                <div className="relative flex items-center justify-center shrink-0">
                    <div className="absolute size-32 rounded-full border border-neutral-200/60 dark:border-neutral-700/30" />
                    <div className="absolute size-22 rounded-full border border-neutral-200/80 dark:border-neutral-700/40" />
                    <div className="absolute size-32">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1.5 rounded-full bg-neutral-300/60 dark:bg-neutral-600/40" />
                        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-neutral-300/50 dark:bg-neutral-600/35" />
                        <div className="absolute bottom-2 left-2 size-1.5 rounded-full bg-neutral-300/30 dark:bg-neutral-600/25" />
                    </div>
                    <div className="absolute size-16 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200/50 dark:from-neutral-800 dark:to-neutral-700/30 blur-sm" />
                    <div className="relative flex items-center justify-center size-12 rounded-2xl bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 shadow-sm ring-1 ring-neutral-200/50 dark:ring-neutral-700/50">
                        <Icon size={22} className={iconColor} />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-base font-bold text-dark dark:text-light">{text}</span>
                        {description && <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{description}</span>}
                    </div>
                    {(action || secondaryAction) && <div className="flex items-center gap-3">{secondaryAction}{action}</div>}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-col items-center justify-center py-14 px-6 text-center", className)}>
            <div className="relative flex items-center justify-center">
                <div className="absolute size-40 rounded-full border border-neutral-200/60 dark:border-neutral-700/30" />
                <div className="absolute size-28 rounded-full border border-neutral-200/80 dark:border-neutral-700/40" />
                <div className="absolute size-40">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-neutral-300/60 dark:bg-neutral-600/40" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 size-1.5 rounded-full bg-neutral-300/40 dark:bg-neutral-600/30" />
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full bg-neutral-300/50 dark:bg-neutral-600/35" />
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-neutral-300/50 dark:bg-neutral-600/35" />
                    <div className="absolute top-3 right-3 size-1.5 rounded-full bg-neutral-300/40 dark:bg-neutral-600/30" />
                    <div className="absolute bottom-3 left-3 size-2 rounded-full bg-neutral-300/30 dark:bg-neutral-600/25" />
                </div>
                <div className="absolute size-20 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200/50 dark:from-neutral-800 dark:to-neutral-700/30 blur-sm" />
                <div className="relative flex items-center justify-center size-16 rounded-2xl bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 shadow-sm ring-1 ring-neutral-200/50 dark:ring-neutral-700/50">
                    <Icon size={26} className={iconColor} />
                </div>
            </div>
            <div className="flex flex-col gap-1.5 max-w-sm mt-14">
                <span className="text-base font-bold text-dark dark:text-light">{text}</span>
                {description && <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{description}</span>}
            </div>
            {(action || secondaryAction) && <div className="flex items-center gap-3 mt-4">{secondaryAction}{action}</div>}
        </div>
    );
}

export { EmptyState };
export type { EmptyStateProps };
