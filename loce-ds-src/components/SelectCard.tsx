import { cn } from "../lib/utils";

type SelectCardOption<T extends string = string> = { value: T; label: string; description?: string; icon?: React.ReactNode; };
type SelectCardProps<T extends string = string> = { options: SelectCardOption<T>[]; value?: T; onChange?: (value: T) => void; columns?: 1 | 2 | 3 | 4; layout?: "horizontal" | "vertical"; className?: string; };

function SelectCard<T extends string = string>({ options, value, onChange, columns = 2, layout = "horizontal", className }: SelectCardProps<T>) {
    const gridCols = { 1: "grid-cols-1", 2: "grid-cols-1 md:grid-cols-2", 3: "grid-cols-1 md:grid-cols-3", 4: "grid-cols-2 md:grid-cols-4" };

    return (
        <div className={cn("grid gap-3", gridCols[columns], className)}>
            {options.map((option) => {
                const isSelected = option.value === value;
                if (layout === "vertical") {
                    return (
                        <button key={option.value} type="button" onClick={() => onChange?.(option.value)}
                            className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl ring-2 text-center transition-all duration-100 active:scale-[0.98] cursor-pointer",
                                isSelected ? "ring-loce bg-loce/5 dark:bg-loce/10" : "ring-neutral-300 dark:ring-neutral-600 bg-white dark:bg-white/[0.02] hover:ring-neutral-400 dark:hover:ring-neutral-500"
                            )}>
                            {option.icon && <div className={cn("flex items-center justify-center size-10 rounded-2xl shrink-0 transition-colors", isSelected ? "bg-loce/10 text-loce" : "bg-neutral-100 dark:bg-white/5 text-neutral-400")}>{option.icon}</div>}
                            <span className="text-sm font-semibold text-dark dark:text-light">{option.label}</span>
                            {option.description && <span className={cn("text-xs font-medium", isSelected ? "text-loce/70" : "text-neutral-500")}>{option.description}</span>}
                        </button>
                    );
                }
                return (
                    <button key={option.value} type="button" onClick={() => onChange?.(option.value)}
                        className={cn("flex items-center gap-3 p-4 rounded-2xl ring-2 text-left transition-all duration-100 active:scale-[0.98] cursor-pointer",
                            isSelected ? "ring-loce bg-loce/5 dark:bg-loce/10" : "ring-neutral-300 dark:ring-neutral-600 bg-white dark:bg-white/[0.02] hover:ring-neutral-400 dark:hover:ring-neutral-500"
                        )}>
                        {option.icon && <div className={cn("flex items-center justify-center size-10 rounded-2xl shrink-0 transition-colors", isSelected ? "bg-loce/10 text-loce" : "bg-neutral-100 dark:bg-white/5 text-neutral-400")}>{option.icon}</div>}
                        <div className="flex-1 min-w-0">
                            <span className="block text-sm font-semibold text-dark dark:text-light">{option.label}</span>
                            {option.description && <span className={cn("block text-xs font-semibold mt-0.5", isSelected ? "text-loce/70" : "text-neutral-500")}>{option.description}</span>}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

export { SelectCard };
export type { SelectCardProps, SelectCardOption };
