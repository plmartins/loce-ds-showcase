import { cn } from "../lib/utils";

type Tab<T extends string = string> = { key: T; label: string; icon?: React.ReactNode; count?: number };

type TabsProps<T extends string = string> = {
    tabs: Tab<T>[];
    value: T;
    onChange: (value: T) => void;
    className?: string;
    size?: "default" | "sm";
};

function Tabs<T extends string = string>({ tabs, value, onChange, className, size = "default" }: TabsProps<T>) {
    return (
        <div className={cn("flex items-center gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-white/5 ring-1 ring-neutral-200 dark:ring-neutral-700 w-fit", className)}>
            {tabs.map((tab) => {
                const isActive = tab.key === value;
                return (
                    <button key={tab.key} type="button" onClick={() => onChange(tab.key)}
                        className={cn("relative inline-flex items-center justify-center gap-1.5 font-semibold rounded-lg transition-all duration-150 select-none active:scale-[0.97]",
                            size === "default" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs",
                            isActive ? "bg-white dark:bg-neutral-800 text-loce shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700" : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                        )}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                        {tab.count !== undefined && (
                            <span className={cn("px-1.5 py-px rounded-lg text-[10px] font-bold tabular-nums",
                                isActive ? "bg-loce/15 text-loce" : "bg-neutral-200 dark:bg-white/10 text-neutral-500"
                            )}>{tab.count}</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export { Tabs };
export type { TabsProps, Tab };
