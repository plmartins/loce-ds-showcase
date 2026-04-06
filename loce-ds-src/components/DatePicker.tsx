import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, X } from "lucide-react";
import { Calendar } from "../primitives/calendar";
import { cn } from "../lib/utils";

function getPortalContainer(trigger: HTMLElement | null): HTMLElement {
    if (!trigger) return document.body;
    const radixPortal = trigger.closest('[data-radix-portal]');
    if (radixPortal) return radixPortal as HTMLElement;
    return document.body;
}

type DatePickerProps = { label?: string; value?: Date; onChange?: (date: Date | undefined) => void; placeholder?: string; error?: string; disabled?: boolean; clearable?: boolean; className?: string; minDate?: Date; maxDate?: Date; locale?: any; };

function DatePicker({ label, value, onChange, placeholder = "Selecione uma data", error, disabled, clearable = true, className, minDate, maxDate, locale }: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const calRef = useRef<HTMLDivElement>(null);
    const formatted = value ? value.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";

    const updateCoords = () => { const el = triggerRef.current; if (!el) return; const rect = el.getBoundingClientRect(); setCoords({ top: rect.bottom + 4, left: rect.left }); };

    useEffect(() => {
        if (!open) return; updateCoords();
        const handleClick = (e: MouseEvent) => { const t = e.target as HTMLElement; if (!triggerRef.current?.contains(t) && !calRef.current?.contains(t)) setOpen(false); };
        const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        const handleScroll = () => updateCoords();
        document.addEventListener("mousedown", handleClick); document.addEventListener("keydown", handleEsc);
        window.addEventListener("scroll", handleScroll, true); window.addEventListener("resize", handleScroll);
        return () => { document.removeEventListener("mousedown", handleClick); document.removeEventListener("keydown", handleEsc); window.removeEventListener("scroll", handleScroll, true); window.removeEventListener("resize", handleScroll); };
    }, [open]);

    return (
        <div className={cn("w-full flex flex-col gap-1", className)}>
            {label && <span className="pl-1 text-xs font-semibold text-neutral-500">{label}</span>}
            <button ref={triggerRef} type="button" disabled={disabled} onClick={() => { updateCoords(); setOpen((p) => !p); }}
                className={cn("w-full flex items-center gap-2 text-sm font-semibold py-2 px-4 rounded-xl text-left",
                    "bg-neutral-100 dark:bg-white/5", "ring-1 ring-neutral-300 dark:ring-neutral-600", "outline-none disabled:opacity-50 disabled:ring-0", "transition-shadow duration-100",
                    open && "ring-neutral-400 dark:ring-neutral-500 ring-2", error && "ring-red-400 dark:ring-red-500",
                    value ? "text-neutral-800 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500 font-medium"
                )}>
                <CalendarDays size={16} className="shrink-0 text-neutral-400" />
                <span className="flex-1 truncate">{formatted || placeholder}</span>
                {value && clearable && (
                    <span role="button" onClick={(e) => { e.stopPropagation(); onChange?.(undefined); }} className="shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"><X size={14} /></span>
                )}
            </button>
            {error && <span className="pl-1 text-xs font-medium text-red-500">{error}</span>}
            {open && createPortal(
                <div ref={calRef} data-ds-portal="datepicker" style={{ top: coords.top, left: coords.left }}
                    className="fixed z-[100] rounded-2xl shadow-lg bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-700 overflow-hidden p-1 animate-in fade-in-0 zoom-in-95 duration-100">
                    <Calendar locale={locale} mode="single" selected={value} onSelect={(date) => { onChange?.(date); setOpen(false); }}
                        disabled={(date) => { if (minDate && date < minDate) return true; if (maxDate && date > maxDate) return true; return false; }} />
                </div>,
                getPortalContainer(triggerRef.current)
            )}
        </div>
    );
}

export { DatePicker };
export type { DatePickerProps };
