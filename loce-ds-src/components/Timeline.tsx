import { cn } from "../lib/utils";

type TimelineItem = { icon?: React.ReactNode; title: string; description?: string; time?: string; color?: string; };
type TimelineProps = { items: TimelineItem[]; className?: string; };

function Timeline({ items, className }: TimelineProps) {
    return (
        <div className={cn("flex flex-col", className)}>
            {items.map((item, i) => {
                const isLast = i === items.length - 1;
                return (
                    <div key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                            <div className={cn("grid place-items-center size-8 rounded-2xl shrink-0", item.color || "bg-neutral-100 dark:bg-white/5 text-neutral-400")}>{item.icon}</div>
                            {!isLast && <div className="w-px flex-1 min-h-6 bg-neutral-200 dark:bg-neutral-700" />}
                        </div>
                        <div className={cn("flex-1 min-w-0 min-h-8 flex flex-col justify-center pb-6", isLast && "pb-0")}>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-semibold text-dark dark:text-light">{item.title}</span>
                                {item.time && <span className="text-[11px] font-semibold text-neutral-400 shrink-0">{item.time}</span>}
                            </div>
                            {item.description && <span className="block text-xs font-semibold text-neutral-500">{item.description}</span>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export { Timeline };
export type { TimelineProps, TimelineItem };
