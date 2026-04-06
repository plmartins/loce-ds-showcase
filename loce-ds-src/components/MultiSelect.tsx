import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Plus, X } from "lucide-react";
import { cn } from "../lib/utils";
import { Avatar } from "./Avatar";

type MultiSelectOption = { value: string; label: string; image?: string; description?: string; };
type MultiSelectProps = { label?: string; options: MultiSelectOption[]; value: string[]; onChange: (value: string[]) => void; placeholder?: string; addLabel?: string; className?: string; };

function MultiSelect({ label, options, value, onChange, placeholder, addLabel = "Adicionar", className }: MultiSelectProps) {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const toggle = (val: string) => onChange(value.includes(val) ? value.filter((v) => v !== val) : [...value, val]);
    const remove = (val: string) => onChange(value.filter((v) => v !== val));

    const updateCoords = () => { const el = triggerRef.current; if (!el) return; const rect = el.getBoundingClientRect(); setCoords({ top: rect.bottom + 4, left: rect.left, width: rect.width }); };

    useEffect(() => {
        if (!open) return; updateCoords();
        const handleClick = (e: MouseEvent) => { const t = e.target as HTMLElement; if (!triggerRef.current?.contains(t) && !listRef.current?.contains(t)) setOpen(false); };
        const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("mousedown", handleClick); document.addEventListener("keydown", handleEsc);
        window.addEventListener("scroll", updateCoords, true); window.addEventListener("resize", updateCoords);
        return () => { document.removeEventListener("mousedown", handleClick); document.removeEventListener("keydown", handleEsc); window.removeEventListener("scroll", updateCoords, true); window.removeEventListener("resize", updateCoords); };
    }, [open]);

    const selectedOptions = value.map((v) => options.find((o) => o.value === v)).filter(Boolean) as MultiSelectOption[];
    const getContainer = () => { const radix = triggerRef.current?.closest("[data-radix-portal]"); return (radix as HTMLElement) || document.body; };

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            {label && <span className="pl-1 text-xs font-semibold text-neutral-500">{label}</span>}
            <div ref={triggerRef} className="flex flex-wrap items-center gap-1.5">
                {selectedOptions.map((opt) => (
                    <span key={opt.value} className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-xl ring-1 ring-neutral-300 dark:ring-neutral-600 bg-neutral-50 dark:bg-white/[0.03]">
                        {opt.image ? <Avatar src={opt.image} alt={opt.label} size={22} fallback="initials" name={opt.label} /> : <Avatar alt={opt.label} size={22} fallback="initials" name={opt.label} />}
                        <span className="text-xs font-semibold text-dark dark:text-light">{opt.label}</span>
                        <button type="button" onClick={() => remove(opt.value)} className="size-4 rounded-xl flex items-center justify-center hover:bg-red-500/20 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"><X size={10} /></button>
                    </span>
                ))}
                <button type="button" onClick={() => { updateCoords(); setOpen((p) => !p); }}
                    className="flex items-center gap-1 py-1 px-2.5 rounded-xl ring-1 ring-neutral-300 dark:ring-neutral-600 hover:ring-neutral-400 dark:hover:ring-neutral-500 transition-all text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer">
                    <Plus size={12} /><span className="text-[11px] font-semibold">{addLabel}</span>
                </button>
            </div>
            {value.length === 0 && placeholder && <span className="text-xs font-medium text-neutral-400 pl-1">{placeholder}</span>}
            {open && createPortal(
                <div ref={listRef} data-ds-portal="multiselect" style={{ top: coords.top, left: coords.left, width: Math.max(coords.width, 220) }}
                    className="fixed z-[100] rounded-2xl shadow-lg bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-700 max-h-60 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-100">
                    {options.map((opt) => {
                        const selected = value.includes(opt.value);
                        return (
                            <button key={opt.value} type="button" onClick={() => toggle(opt.value)} className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-white/5 cursor-pointer">
                                <div className={cn("size-4 rounded-md shrink-0 flex items-center justify-center ring-1 transition-all", selected ? "bg-dark dark:bg-light ring-dark dark:ring-light" : "ring-neutral-300 dark:ring-neutral-600")}>
                                    {selected && <Check size={10} className="text-light dark:text-dark" />}
                                </div>
                                {opt.image ? <Avatar src={opt.image} alt={opt.label} size={24} fallback="initials" name={opt.label} /> : <Avatar alt={opt.label} size={24} fallback="initials" name={opt.label} />}
                                <div className="flex-1 min-w-0">
                                    <span className="block text-sm font-semibold truncate text-dark dark:text-light">{opt.label}</span>
                                    {opt.description && <span className="block text-xs font-medium text-neutral-400 truncate">{opt.description}</span>}
                                </div>
                            </button>
                        );
                    })}
                    {options.length === 0 && <div className="px-4 py-3 text-sm text-neutral-400 text-center">Nenhuma opcao</div>}
                </div>,
                getContainer()
            )}
        </div>
    );
}

export { MultiSelect };
export type { MultiSelectProps, MultiSelectOption };
