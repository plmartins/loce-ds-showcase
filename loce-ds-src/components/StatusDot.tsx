import { cn } from "../lib/utils";

type StatusDotProps = {
    status: "online" | "offline" | "busy" | "away";
    size?: "sm" | "default" | "lg";
    className?: string;
    pulse?: boolean;
};

const statusColors = {
    online: "bg-emerald-500",
    offline: "bg-neutral-400",
    busy: "bg-red-500",
    away: "bg-amber-500",
};

const sizes = {
    sm: "size-2",
    default: "size-2.5",
    lg: "size-3",
};

function StatusDot({ status, size = "default", className, pulse = false }: StatusDotProps) {
    return (
        <span className={cn("relative inline-block", className)}>
            <span className={cn("block rounded-full", statusColors[status], sizes[size])} />
            {pulse && status === "online" && (
                <span className={cn("absolute inset-0 rounded-full animate-ping opacity-40", statusColors[status])} />
            )}
        </span>
    );
}

export { StatusDot };
export type { StatusDotProps };
