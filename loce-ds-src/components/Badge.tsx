import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const badgeVariants = cva(
    "inline-flex items-center gap-1 rounded-xl px-2.5 text-[11px] font-semibold ring-1 ring-inset transition-colors select-none [line-height:22px]",
    {
        variants: {
            variant: {
                default: "bg-loce/10 text-loce ring-loce/20",
                secondary: "bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 ring-neutral-200 dark:ring-neutral-700",
                destructive: "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20",
                success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
                warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20",
                info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-500/20",
                outline: "bg-transparent text-neutral-600 dark:text-neutral-400 ring-neutral-200 dark:ring-neutral-700",
            },
        },
        defaultVariants: { variant: "default" },
    }
);

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
    return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
export type { BadgeProps };
