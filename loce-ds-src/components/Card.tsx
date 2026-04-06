import { cn } from "../lib/utils";

type CardProps = React.ComponentProps<"div">;

function Card({ className, ...props }: CardProps) {
    return <div className={cn("rounded-2xl bg-white dark:bg-white/[0.03] ring-1 ring-neutral-200 dark:ring-neutral-700", className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("flex flex-col gap-1.5 px-5 pt-5 pb-3", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
    return <h3 className={cn("text-base font-bold text-dark dark:text-light", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
    return <p className={cn("text-sm text-neutral-500", className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("px-5 py-3", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("flex items-center gap-2 px-5 pb-5 pt-3 border-t border-neutral-200 dark:border-neutral-700", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
