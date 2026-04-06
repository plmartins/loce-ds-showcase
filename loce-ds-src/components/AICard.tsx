import { RefreshCw } from "lucide-react";
import { cn } from "../lib/utils";
import { AIIcon } from "./AIIcon";
import { SparklesText } from "./SparklesText";

type AICardProps = { title?: string; icon?: React.ReactNode; children: React.ReactNode; glow?: boolean; onRefresh?: () => void; refreshing?: boolean; className?: string; };

function AICard({ title = "Resumo da IA", icon = <AIIcon size={18} />, children, glow = false, onRefresh, refreshing = false, className }: AICardProps) {
    return (
        <div className={cn("ai-card rounded-2xl p-4", glow && "improve-loading", className)}>
            <div className="flex items-center gap-2.5 mb-1.5">
                <div className="ai-card-icon flex items-center justify-center size-9 rounded-2xl">{icon}</div>
                <SparklesText className="text-sm font-bold text-loce flex-1" sparkleCount={4}>{title}</SparklesText>
                {onRefresh && (
                    <button type="button" onClick={onRefresh} disabled={refreshing} className="flex items-center justify-center size-7 rounded-xl text-loce hover:bg-loce/10 active:scale-90 duration-75 transition-colors disabled:opacity-50">
                        <RefreshCw size={14} className={cn(refreshing && "animate-spin")} />
                    </button>
                )}
            </div>
            <div className="text-[13px] font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed">{children}</div>
        </div>
    );
}

export { AICard };
export type { AICardProps };
