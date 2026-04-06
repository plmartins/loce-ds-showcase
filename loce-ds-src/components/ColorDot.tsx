import { cn } from "../lib/utils";

type ColorDotProps = {
    color: string;
    size?: "sm" | "default" | "lg";
    className?: string;
    label?: string;
};

const sizes = {
    sm: "size-2",
    default: "size-3",
    lg: "size-4",
};

function ColorDot({ color, size = "default", className, label }: ColorDotProps) {
    if (label) {
        return (
            <span className={cn("inline-flex items-center gap-1.5", className)}>
                <span className={cn("rounded-full shrink-0", sizes[size])} style={{ backgroundColor: color }} />
                <span className="text-sm font-semibold text-dark dark:text-light">{label}</span>
            </span>
        );
    }
    return <span className={cn("inline-block rounded-full shrink-0", sizes[size], className)} style={{ backgroundColor: color }} />;
}

export { ColorDot };
export type { ColorDotProps };
