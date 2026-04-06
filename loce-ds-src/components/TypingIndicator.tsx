import { cn } from "../lib/utils";

type TypingIndicatorProps = {
    className?: string;
    size?: "sm" | "default";
};

function TypingIndicator({ className, size = "default" }: TypingIndicatorProps) {
    const dotSize = size === "sm" ? "size-1" : "size-1.5";
    return (
        <div className={cn("inline-flex items-center gap-1", className)}>
            <span className={cn(dotSize, "rounded-full bg-neutral-400 dark:bg-neutral-500 typing-dot")} style={{ animationDelay: "0ms" }} />
            <span className={cn(dotSize, "rounded-full bg-neutral-400 dark:bg-neutral-500 typing-dot")} style={{ animationDelay: "200ms" }} />
            <span className={cn(dotSize, "rounded-full bg-neutral-400 dark:bg-neutral-500 typing-dot")} style={{ animationDelay: "400ms" }} />
        </div>
    );
}

export { TypingIndicator };
export type { TypingIndicatorProps };
