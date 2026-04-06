import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../primitives/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./Button";

type DropdownAction = { label: string; icon?: React.ReactNode; onClick: () => void; variant?: "destructive"; disabled?: boolean; };
type DropdownActionsProps = { actions: DropdownAction[]; trigger?: React.ReactNode; align?: "start" | "center" | "end"; className?: string; };

function DropdownActions({ actions, trigger, align = "end", className }: DropdownActionsProps) {
    if (!actions.length) return null;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger || <Button variant="secondary" size="icon-sm" className={cn(className)}><MoreHorizontal size={16} /></Button>}
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align}>
                {actions.map((action, i) => {
                    const showSep = action.variant === "destructive" && i > 0;
                    return (
                        <div key={action.label}>
                            {showSep && <DropdownMenuSeparator />}
                            <DropdownMenuItem onClick={action.onClick} disabled={action.disabled} variant={action.variant} className="flex items-center gap-2">{action.icon}<span>{action.label}</span></DropdownMenuItem>
                        </div>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { DropdownActions };
export type { DropdownActionsProps, DropdownAction };
