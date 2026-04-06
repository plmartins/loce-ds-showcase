import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

function getPortalContainer(trigger: HTMLElement | null): HTMLElement {
    if (!trigger) return document.body;
    const radixPortal = trigger.closest('[data-radix-portal]');
    if (radixPortal) return radixPortal as HTMLElement;
    return document.body;
}

type Option = {
    value: string | number;
    label: string;
    icon?: React.ReactNode;
    image?: string;
    description?: string;
    disabled?: boolean;
};

type SelectProps = {
    value?: string | number;
    onChange?: (value: string) => void;
    options: Option[];
    label?: string;
    labelAction?: { label: string; onClick: () => void };
    placeholder?: string;
    loading?: boolean;
    error?: string;
    disabled?: boolean;
    className?: string;
    name?: string;
};

function Select({
    value, onChange, options, label, labelAction, placeholder = "Selecione...",
    loading, error, disabled, className, name,
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find((o) => String(o.value) === String(value));

    const updateCoords = () => {
        const el = triggerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setCoords({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    };

    const handleSelect = (optionValue: string | number) => {
        onChange?.(String(optionValue));
        setOpen(false);
    };

    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!triggerRef.current?.contains(target) && !listRef.current?.contains(target)) setOpen(false);
        };
        const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleEsc);
        return () => { document.removeEventListener("mousedown", handleClick); document.removeEventListener("keydown", handleEsc); };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        updateCoords();
        window.addEventListener("scroll", updateCoords, true);
        window.addEventListener("resize", updateCoords);
        return () => { window.removeEventListener("scroll", updateCoords, true); window.removeEventListener("resize", updateCoords); };
    }, [open]);

    return (
        <div className="w-full flex flex-col gap-1">
            {(label || labelAction) && (
                <div className="flex items-center justify-between">
                    {label && <span className="pl-1 text-xs font-semibold text-neutral-500">{label}</span>}
                    {labelAction && !loading && (
                        <button onClick={labelAction.onClick} type="button" className="text-xs font-semibold px-2 text-neutral-900 dark:text-neutral-300 underline outline-none active:scale-95 duration-75">{labelAction.label}</button>
                    )}
                    {loading && <div className="px-2"><Loader2 size={14} className="text-neutral-400 animate-spin" /></div>}
                </div>
            )}
            {name && <input type="hidden" name={name} value={value ?? ""} />}
            <button
                ref={triggerRef} type="button" disabled={disabled}
                onClick={() => { if (!disabled) { updateCoords(); setOpen((prev) => !prev); } }}
                className={cn(
                    "w-full flex items-center justify-between gap-2 text-sm font-semibold py-2 px-4 rounded-xl text-left",
                    "bg-neutral-100 dark:bg-white/5", "ring-1 ring-neutral-300 dark:ring-neutral-600", "outline-none",
                    "disabled:opacity-50 disabled:ring-0", "transition-shadow duration-100",
                    open && "ring-neutral-400 dark:ring-neutral-500 ring-2",
                    error && "ring-red-400 dark:ring-red-500",
                    selectedOption ? "text-neutral-800 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500 font-medium",
                    className
                )}
            >
                <span className="truncate flex items-center gap-2">
                    {selectedOption?.image && <img src={selectedOption.image} alt="" className="size-5 rounded-lg object-cover shrink-0" />}
                    {selectedOption?.icon}
                    {selectedOption?.label || placeholder}
                </span>
                <ChevronDown size={16} className={cn("shrink-0 text-neutral-400 transition-transform duration-150", open && "rotate-180")} />
            </button>
            {error && <span className="pl-1 text-xs font-medium text-red-500">{error}</span>}
            {open && createPortal(
                <div ref={listRef} data-ds-portal="select" style={{ top: coords.top, left: coords.left, width: coords.width }}
                    className={cn("fixed z-[100] rounded-2xl shadow-lg overflow-hidden", "bg-white dark:bg-neutral-900", "ring-1 ring-neutral-200 dark:ring-neutral-700", "max-h-60 overflow-y-auto", "animate-in fade-in-0 zoom-in-95 duration-100")}
                >
                    {options.map((option) => {
                        const isSelected = String(option.value) === String(value);
                        return (
                            <button key={option.value} type="button" disabled={option.disabled} onClick={() => handleSelect(option.value)}
                                className={cn("w-full flex items-center gap-3 px-4 text-left outline-none", option.description ? "py-2.5" : "py-2",
                                    "hover:bg-neutral-100 dark:hover:bg-white/5",
                                    isSelected && "text-dark dark:text-light font-semibold bg-neutral-50 dark:bg-white/5",
                                    !isSelected && "text-neutral-700 dark:text-neutral-300",
                                    option.disabled && "opacity-40 pointer-events-none"
                                )}
                            >
                                {option.image && <img src={option.image} alt="" className="size-8 rounded-xl object-cover shrink-0" />}
                                {option.icon && <span className="shrink-0">{option.icon}</span>}
                                <div className="flex-1 min-w-0">
                                    <span className="block text-sm font-semibold truncate">{option.label}</span>
                                    {option.description && <span className="block text-xs text-neutral-400 dark:text-neutral-500 truncate">{option.description}</span>}
                                </div>
                                {isSelected && <Check size={14} className="shrink-0 text-dark dark:text-light" />}
                            </button>
                        );
                    })}
                    {options.length === 0 && <div className="px-4 py-3 text-sm text-neutral-400 text-center">Nenhuma opcao disponivel</div>}
                </div>,
                getPortalContainer(triggerRef.current)
            )}
        </div>
    );
}

export { Select };
export type { SelectProps, Option };
