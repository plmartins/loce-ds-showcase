import { cn } from "../lib/utils";
import { Loader2 } from "lucide-react";
import { AIIcon } from "./AIIcon";

type AIButtonProps = React.ComponentProps<"button"> & { loading?: boolean; size?: "default" | "sm" | "lg"; };

function AIButton({ className, children, loading, disabled, size = "default", ...props }: AIButtonProps) {
    const sizes = { sm: "h-8 px-4 text-xs", default: "h-10 px-5 text-sm", lg: "h-12 px-7 text-base" };
    if (loading) {
        return (
            <button disabled className={cn("improve-loading relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl", "bg-loce/5 dark:bg-loce/10 text-loce", sizes[size], className)}>
                <Loader2 size={size === "sm" ? 14 : 16} className="animate-spin" /><span>{children}</span>
            </button>
        );
    }
    return (
        <button disabled={disabled} className={cn("ai-rainbow-btn relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl", "ai-rainbow-btn-bg text-loce", "active:scale-[0.97] transition-all duration-75", "disabled:opacity-50 disabled:pointer-events-none", sizes[size], className)} {...props}>
            <AIIcon size={size === "sm" ? 14 : 16} /><span>{children}</span>
        </button>
    );
}

export { AIButton };
export type { AIButtonProps };
