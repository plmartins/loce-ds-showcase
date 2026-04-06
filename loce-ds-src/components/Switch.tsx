import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../lib/utils";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
    label?: string;
    description?: string;
};

function Switch({ className, label, description, ...props }: SwitchProps) {
    const switchEl = (
        <SwitchPrimitive.Root
            className={cn(
                "peer inline-flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent shadow-sm transition-all outline-none cursor-pointer",
                "data-[state=checked]:bg-loce data-[state=unchecked]:bg-neutral-200 dark:data-[state=unchecked]:bg-neutral-700",
                "focus-visible:ring-2 focus-visible:ring-loce/30",
                "disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                className={cn(
                    "pointer-events-none block size-4 rounded-full bg-white shadow-sm ring-0 transition-transform",
                    "data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0.5"
                )}
            />
        </SwitchPrimitive.Root>
    );

    if (label) {
        return (
            <label className="flex items-center gap-3 cursor-pointer">
                {switchEl}
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-dark dark:text-light">{label}</span>
                    {description && <span className="text-xs font-semibold text-neutral-500">{description}</span>}
                </div>
            </label>
        );
    }

    return switchEl;
}

export { Switch };
export type { SwitchProps };
