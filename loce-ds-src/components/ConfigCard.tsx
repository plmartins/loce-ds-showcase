import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

type ConfigCardProps = {
    icon?: LucideIcon;
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
};

function ConfigCard({ icon: Icon, title, description, children, className }: ConfigCardProps) {
    return (
        <div className={cn("rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-700 bg-white dark:bg-white/[0.02] p-6", className)}>
            <div className="flex items-start gap-3 mb-5">
                {Icon && (
                    <div className="flex items-center justify-center size-10 rounded-2xl bg-loce/10 shrink-0">
                        <Icon size={20} className="text-loce" />
                    </div>
                )}
                <div className="flex flex-col gap-0.5 pt-1">
                    <span className="text-base font-bold text-dark dark:text-light">{title}</span>
                    {description && <span className="text-sm font-medium text-neutral-500">{description}</span>}
                </div>
            </div>
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    );
}

export { ConfigCard };
export type { ConfigCardProps };
