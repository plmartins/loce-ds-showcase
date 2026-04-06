import { useState } from "react";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../primitives/dialog";
import { cn } from "../lib/utils";
import { Button } from "./Button";

type ExpandableTextareaProps = { label?: string; value: string; onChange: (value: string) => void; placeholder?: string; maxLength?: number; modalTitle?: string; className?: string; header?: React.ReactNode; };

function ExpandableTextarea({ label, value, onChange, placeholder = "Clique para editar...", maxLength, modalTitle = "Editar texto", className, header }: ExpandableTextareaProps) {
    const [open, setOpen] = useState(false);
    const counter = maxLength ? (
        <div className="flex items-center gap-1 px-3 py-1 bg-white dark:bg-white/5 rounded-xl ring-1 ring-neutral-300 dark:ring-neutral-600">
            <span className="text-[10px] font-bold text-neutral-500 tabular-nums">{value?.length || 0}/{maxLength}</span>
        </div>
    ) : null;

    return (
        <div className={cn("w-full flex flex-col gap-1", className)}>
            {label && (
                <div className="flex items-center justify-between">
                    <span className="pl-1 text-xs font-semibold text-neutral-500">{label}</span>{counter}
                </div>
            )}
            <button type="button" onClick={() => setOpen(true)} className="w-full text-left rounded-2xl bg-neutral-100 dark:bg-white/5 ring-1 ring-neutral-300 dark:ring-neutral-600 p-4 min-h-[5rem] cursor-pointer hover:ring-neutral-400 dark:hover:ring-neutral-500 transition-all group">
                {value?.trim() ? <p className="text-sm font-medium text-dark dark:text-light line-clamp-4 whitespace-pre-wrap leading-relaxed">{value}</p> : <span className="text-sm font-medium text-neutral-400">{placeholder}</span>}
                <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors"><Expand size={12} />Clique para expandir</div>
            </button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-3xl h-[80vh] flex flex-col">
                    <DialogHeader><div className="flex items-center justify-between pr-8"><DialogTitle>{modalTitle}</DialogTitle>{counter}</div></DialogHeader>
                    {header}
                    <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} spellCheck={false} autoFocus maxLength={maxLength} placeholder={placeholder}
                        className="flex-1 w-full text-sm font-medium py-3 px-4 rounded-2xl bg-transparent resize-none outline-none ring-1 ring-neutral-300 dark:ring-neutral-600 focus:ring-neutral-400 dark:focus:ring-neutral-500 focus:ring-2 transition-shadow duration-100 placeholder:font-medium placeholder:text-neutral-400 leading-relaxed" />
                    <div className="flex justify-end"><Button onClick={() => setOpen(false)}>Fechar</Button></div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export { ExpandableTextarea };
export type { ExpandableTextareaProps };
