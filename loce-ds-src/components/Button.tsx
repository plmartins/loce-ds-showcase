import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
    "relative inline-flex items-center justify-center gap-1.5 text-sm font-semibold outline-none select-none active:scale-[0.97] transition-all duration-75 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                primary: "text-white bg-loce ring-2 ring-loceSec shadow-sm hover:brightness-110",
                secondary: "text-neutral-800 dark:text-neutral-200 bg-white dark:bg-white/5 ring-1 ring-neutral-300 dark:ring-neutral-600 shadow-sm hover:bg-neutral-50 dark:hover:bg-white/10",
                destructive: "text-red-500 bg-red-500/10 ring-2 ring-red-500/30 hover:bg-red-500/15 dark:text-red-400 dark:bg-red-400/10 dark:ring-red-400/30",
                ghost: "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5",
                gradient: "text-white bg-loce ring-1 ring-loceSec shadow-md hover:shadow-lg hover:shadow-loce/25 hover:brightness-110",
                upgrade: "text-neutral-100 bg-neutral-800 border border-neutral-700 overflow-hidden before:absolute before:inset-0 before:z-0 before:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.04)_0_10px,transparent_10px,transparent_20px)] before:bg-[length:200%_200%] before:animate-[shine2_40s_linear_infinite]",
                link: "text-loce underline-offset-4 hover:underline p-0 ring-0 shadow-none",
            },
            size: {
                default: "h-9 px-4 rounded-xl",
                sm: "h-8 px-3 text-xs rounded-xl",
                lg: "h-11 px-6 text-base rounded-xl",
                icon: "size-9 rounded-xl",
                "icon-sm": "size-8 rounded-xl",
            },
        },
        defaultVariants: { variant: "primary", size: "default" },
    }
);

type ButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        loading?: boolean;
    };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        const isDisabled = disabled || loading;
        return (
            <Comp ref={ref} aria-busy={loading || undefined} className={cn(buttonVariants({ variant, size, className }))} disabled={isDisabled} {...props}>
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? <span className="opacity-70">{children}</span> : children}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
