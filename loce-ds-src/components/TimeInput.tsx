import { forwardRef } from "react";
import { cn } from "../lib/utils";

type TimeInputProps = Omit<React.ComponentProps<"input">, "type"> & { label?: string; };

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
    ({ className, label, ...props }, ref) => (
        <div className="flex flex-col gap-1">
            {label && <span className="pl-1 text-xs font-semibold text-neutral-500">{label}</span>}
            <div className="relative flex items-center">
                <input ref={ref} type="time" className={cn("w-full text-sm font-semibold py-2 px-3 rounded-xl", "bg-neutral-100 dark:bg-white/5", "text-neutral-800 dark:text-neutral-100", "ring-1 ring-neutral-300 dark:ring-neutral-600", "outline-none", "focus:ring-neutral-400 dark:focus:ring-neutral-500 focus:ring-2 transition-shadow duration-100", "disabled:opacity-50", className)} {...props} />
            </div>
        </div>
    )
);
TimeInput.displayName = "TimeInput";

export { TimeInput };
export type { TimeInputProps };
