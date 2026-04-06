import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import { cn } from "../lib/utils";

type ComboBoxOption = {
    value: string;
    label: string;
    image?: string;
    description?: string;
};

type ComboBoxProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    displayLabel?: string;
    displayImage?: string;
    options: ComboBoxOption[];
    onChange?: (value: string, option: ComboBoxOption) => void;
    onClear?: () => void;
    onSearch?: (query: string) => void;
    loading?: boolean;
    emptyText?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
};

function ComboBox({
    label, placeholder = "Buscar...", value, displayLabel, displayImage,
    options, onChange, onClear, onSearch, loading, emptyText = "Nenhum resultado", error, disabled, className,
}: ComboBoxProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateCoords = () => {
        const el = triggerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setCoords({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    };

    const handleOpen = () => {
        if (disabled) return;
        updateCoords();
        setOpen(true);
        setQuery("");
        onSearch?.("");
    };

    const handleClose = () => {
        setOpen(false);
        setQuery("");
    };

    const handleSelect = (option: ComboBoxOption) => {
        onChange?.(option.value, option);
        handleClose();
    };

    const handleSearch = (q: string) => {
        setQuery(q);
        onSearch?.(q);
    };

    useEffect(() => {
        if (!open) return;
        const handleClick = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (!triggerRef.current?.contains(t) && !listRef.current?.contains(t)) handleClose();
        };
        const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
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

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 10);
    }, [open]);

    const getContainer = () => {
        const radix = triggerRef.current?.closest("[data-radix-portal]");
        return (radix as HTMLElement) || document.body;
    };

    const hasValue = value !== undefined && value !== "" && displayLabel;

    return (
        <div className={cn("w-full flex flex-col gap-1", className)}>
            {label && <span className="pl-1 text-xs font-semibold text-neutral-500">{label}</span>}

            <div ref={triggerRef}>
                {hasValue ? (
                    <div className={cn(
                        "w-full flex items-center gap-3 text-sm font-semibold py-2 px-4 rounded-xl",
                        "bg-neutral-100 dark:bg-white/5",
                        "ring-1 ring-neutral-300 dark:ring-neutral-600",
                        error && "ring-red-400 dark:ring-red-500",
                    )}>
                        {displayImage && <img src={displayImage} alt="" className="size-8 rounded-xl object-cover shrink-0" />}
                        <span className="flex-1 truncate text-dark dark:text-light">{displayLabel}</span>
                        {onClear && (
                            <button type="button" onClick={(e) => { e.stopPropagation(); onClear(); }}
                                className="shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer">
                                <X size={14} />
                            </button>
                        )}
                        <button type="button" onClick={handleOpen} disabled={disabled}
                            className="shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer disabled:opacity-50">
                            <ChevronDown size={16} />
                        </button>
                    </div>
                ) : (
                    <button type="button" onClick={handleOpen} disabled={disabled}
                        className={cn(
                            "w-full flex items-center gap-2 text-sm font-semibold py-2 px-4 rounded-xl text-left cursor-pointer",
                            "bg-neutral-100 dark:bg-white/5",
                            "ring-1 ring-neutral-300 dark:ring-neutral-600",
                            "outline-none disabled:opacity-50 transition-shadow duration-100",
                            open && "ring-neutral-400 dark:ring-neutral-500 ring-2",
                            error && "ring-red-400 dark:ring-red-500",
                            "text-neutral-400 dark:text-neutral-500 font-medium",
                        )}>
                        <Search size={16} className="shrink-0 text-neutral-400" />
                        <span className="flex-1 truncate">{placeholder}</span>
                        <ChevronDown size={16} className={cn("shrink-0 text-neutral-400 transition-transform duration-150", open && "rotate-180")} />
                    </button>
                )}
            </div>

            {error && <span className="pl-1 text-xs font-medium text-red-500">{error}</span>}

            {open && createPortal(
                <div ref={listRef} data-ds-portal="combobox" style={{ top: coords.top, left: coords.left, width: coords.width }}
                    className="fixed z-[100] rounded-2xl shadow-lg bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-700 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
                    <div className="p-2 border-b border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-2 px-2">
                            <Search size={14} className="shrink-0 text-neutral-400" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder={placeholder}
                                className="flex-1 text-sm font-semibold bg-transparent outline-none text-dark dark:text-light placeholder:text-neutral-400 placeholder:font-medium"
                            />
                            {loading && <Loader2 size={14} className="shrink-0 text-neutral-400 animate-spin" />}
                        </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {options.map((option) => {
                            const isSelected = option.value === value;
                            return (
                                <button key={option.value} type="button" onClick={() => handleSelect(option)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 text-left outline-none cursor-pointer",
                                        option.description || option.image ? "py-2.5" : "py-2",
                                        "hover:bg-neutral-100 dark:hover:bg-white/5",
                                        isSelected && "text-dark dark:text-light font-semibold bg-neutral-50 dark:bg-white/5",
                                        !isSelected && "text-neutral-700 dark:text-neutral-300",
                                    )}>
                                    {option.image && <img src={option.image} alt="" className="size-8 rounded-xl object-cover shrink-0" />}
                                    <div className="flex-1 min-w-0">
                                        <span className="block text-sm font-semibold truncate">{option.label}</span>
                                        {option.description && <span className="block text-xs text-neutral-400 dark:text-neutral-500 truncate">{option.description}</span>}
                                    </div>
                                    {isSelected && <Check size={14} className="shrink-0 text-dark dark:text-light" />}
                                </button>
                            );
                        })}
                        {!loading && options.length === 0 && (
                            <div className="px-4 py-6 text-sm text-neutral-400 text-center">{emptyText}</div>
                        )}
                        {loading && options.length === 0 && (
                            <div className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-neutral-400">
                                <Loader2 size={14} className="animate-spin" />Buscando...
                            </div>
                        )}
                    </div>
                </div>,
                getContainer()
            )}
        </div>
    );
}

export { ComboBox };
export type { ComboBoxProps, ComboBoxOption };
