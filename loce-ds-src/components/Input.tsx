import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

type InputProps = React.ComponentProps<"input"> & {
    label?: string;
    labelAction?: { label: string; onClick: () => void };
    hint?: string;
    loading?: boolean;
    error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, labelAction, hint, loading, error, ...props }, ref) => {
        return (
            <div className="w-full flex flex-col gap-1">
                {(label || labelAction) && (
                    <div className="flex items-center justify-between">
                        {label && <span className="pl-1 text-xs font-semibold text-neutral-500">{label}</span>}
                        {labelAction && !loading && (
                            <button onClick={labelAction.onClick} type="button" className="text-xs font-semibold px-2 text-neutral-900 dark:text-neutral-300 underline outline-none active:scale-95 duration-75">
                                {labelAction.label}
                            </button>
                        )}
                        {loading && (
                            <div className="px-2"><Loader2 size={14} className="text-neutral-400 animate-spin" /></div>
                        )}
                    </div>
                )}
                <div className="relative flex items-center">
                    <input
                        ref={ref}
                        aria-invalid={!!error || undefined}
                        className={cn(
                            "w-full text-sm font-semibold py-2 px-4 rounded-xl",
                            "bg-neutral-100 dark:bg-white/5",
                            "text-neutral-800 dark:text-neutral-100",
                            "ring-1 ring-neutral-300 dark:ring-neutral-600",
                            "outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500 placeholder:font-medium",
                            "disabled:opacity-50 disabled:ring-0",
                            "focus:ring-neutral-400 dark:focus:ring-neutral-500 focus:ring-2 transition-shadow duration-100",
                            error && "ring-red-400 dark:ring-red-500 focus:ring-red-400",
                            hint && "pr-14",
                            className
                        )}
                        {...props}
                    />
                    {hint && (
                        <div className="select-none absolute right-1 py-1 px-2 flex items-center justify-center rounded-xl bg-neutral-200 dark:bg-white/5">
                            <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-400">{hint}</span>
                        </div>
                    )}
                </div>
                {error && <span className="pl-1 text-xs font-medium text-red-500">{error}</span>}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
