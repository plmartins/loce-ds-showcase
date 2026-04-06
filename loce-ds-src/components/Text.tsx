import { cn } from "../lib/utils";

const variantMap = {
    default: "text-sm font-semibold text-dark dark:text-light",
    supertitle: "text-2xl font-extrabold text-dark dark:text-light",
    title: "text-lg font-bold text-dark dark:text-light",
    subtitle: "text-base font-bold text-dark dark:text-light",
    description: "text-sm font-semibold text-neutral-500",
    subdescription: "text-xs font-semibold text-neutral-500",
    label: "text-xs font-semibold text-neutral-500",
    code: "text-xs font-medium font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-white/5 px-1.5 py-0.5 rounded",
} as const;

type TextVariant = keyof typeof variantMap;

type TextProps = {
    variant?: TextVariant;
    className?: string;
    children: React.ReactNode;
    as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "label" | "div";
};

function Text({ variant = "default", className, children, as: Tag = "span" }: TextProps) {
    return <Tag className={cn(variantMap[variant], className)}>{children}</Tag>;
}

export { Text, variantMap };
export type { TextProps, TextVariant };
