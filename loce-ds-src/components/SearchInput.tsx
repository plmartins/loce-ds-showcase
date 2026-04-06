import { forwardRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

type SearchInputProps = Omit<React.ComponentProps<"input">, "type"> & { onClear?: () => void; loading?: boolean; };

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className, value, onClear, loading, ...props }, ref) => {
        const hasValue = value !== undefined && value !== "";
        return (
            <div className="relative flex items-center">
                <Search size={16} className="absolute left-3 text-neutral-400 pointer-events-none" />
                <input ref={ref} type="text" value={value}
                    className={cn("w-full text-sm font-semibold py-2 pl-9 pr-9 rounded-xl", "bg-neutral-100 dark:bg-white/5", "text-neutral-800 dark:text-neutral-100",
                        "ring-1 ring-neutral-300 dark:ring-neutral-600", "outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500 placeholder:font-medium",
                        "focus:ring-neutral-400 dark:focus:ring-neutral-500 focus:ring-2 transition-shadow duration-100", className
                    )} {...props}
                />
                <div className="absolute right-3 flex items-center">
                    {loading ? <Loader2 size={14} className="text-neutral-400 animate-spin" /> : hasValue && onClear ? (
                        <button type="button" onClick={onClear} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 active:scale-90 duration-75"><X size={14} /></button>
                    ) : null}
                </div>
            </div>
        );
    }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
export type { SearchInputProps };
