import { cn } from "../lib/utils";

type SkeletonProps = React.ComponentProps<"div">;

function Skeleton({ className, ...props }: SkeletonProps) {
    return <div className={cn("animate-pulse rounded-2xl bg-neutral-200/60 dark:bg-white/5", className)} {...props} />;
}

function SkeletonText({ className, lines = 3 }: { className?: string; lines?: number }) {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton key={i} className={cn("h-3 rounded-xl", i === lines - 1 && "w-3/4")} />
            ))}
        </div>
    );
}

function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn("rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-700 p-4 space-y-3", className)}>
            <Skeleton className="h-4 w-1/3 rounded-xl" />
            <SkeletonText lines={2} />
        </div>
    );
}

export { Skeleton, SkeletonText, SkeletonCard };
