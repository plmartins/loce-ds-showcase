import { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";

type CheckboxProps = Omit<React.ComponentProps<"input">, "type"> & {
    label?: string;
    description?: string;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, description, checked, onChange, disabled, ...props }, ref) => {
        return (
            <label className={cn("inline-flex gap-3 cursor-pointer select-none", description ? "items-start" : "items-center", disabled && "opacity-50 cursor-not-allowed", className)}>
                <div className={cn("relative shrink-0", description && "mt-0.5")}>
                    <input ref={ref} type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="peer sr-only" {...props} />
                    <div className={cn("size-5 rounded-md ring-1 transition-all duration-100 flex items-center justify-center",
                        checked ? "bg-loce ring-loce text-white" : "bg-white dark:bg-white/5 ring-neutral-300 dark:ring-neutral-600 hover:ring-neutral-400 dark:hover:ring-neutral-500"
                    )}>
                        {checked && <Check size={14} strokeWidth={3} />}
                    </div>
                </div>
                {(label || description) && (
                    <div className="flex flex-col gap-0.5">
                        {label && <span className="text-sm font-semibold text-dark dark:text-light leading-tight">{label}</span>}
                        {description && <span className="text-xs font-semibold text-neutral-500 leading-tight">{description}</span>}
                    </div>
                )}
            </label>
        );
    }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
