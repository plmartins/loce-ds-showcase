import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, Loader2, Package, Search, X } from "lucide-react";
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
    const [position, setPosition] = useState<{ top?: number; bottom?: number; left: number; width: number }>({ left: 0, width: 0 });
    const [dropUp, setDropUp] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const hasImages = options.some((o) => o.image);

    const updatePosition = useCallback(() => {
        const el = triggerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = 320;
        const shouldDropUp = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
        setDropUp(shouldDropUp);
        if (shouldDropUp) {
            setPosition({ bottom: window.innerHeight - rect.top + 4, left: rect.left, width: rect.width });
        } else {
            setPosition({ top: rect.bottom + 4, left: rect.left, width: rect.width });
        }
    }, []);

    const handleOpen = () => {
        if (disabled) return;
        updatePosition();
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

    const handleInputChange = (q: string) => {
        setQuery(q);
        onSearch?.(q);
        if (!open) {
            updatePosition();
            setOpen(true);
        }
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
        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => { window.removeEventListener("scroll", updatePosition, true); window.removeEventListener("resize", updatePosition); };
    }, [open, updatePosition]);

    useEffect(() => {
        if (open) requestAnimationFrame(() => inputRef.current?.focus());
    }, [open]);

    const getContainer = () => {
        const radix = triggerRef.current?.closest("[data-radix-portal]");
        return (radix as HTMLElement) || document.body;
    };

    const hasValue = value !== undefined && value !== "" && displayLabel;

    const positionStyle = dropUp
        ? { bottom: position.bottom, left: position.left, width: position.width }
        : { top: position.top, left: position.left, width: position.width };

    return (
        <div className={cn("w-full flex flex-col gap-1", className)}>
            {label && <span className="pl-1 text-xs font-semibold text-neutral-500">{label}</span>}

            <div ref={triggerRef}>
                {hasValue && !open ? (
                    <div className={cn(
                        "w-full flex items-center gap-3 text-sm font-semibold py-2 px-4 rounded-xl",
                        "bg-neutral-100 dark:bg-white/5",
                        "ring-1 ring-neutral-300 dark:ring-neutral-600",
                        error && "ring-red-400 dark:ring-red-500",
                    )}>
                        {displayImage && <img src={displayImage} alt="" className="size-10 rounded-xl object-cover shrink-0" />}
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
                    <div className={cn(
                        "w-full flex items-center gap-2 text-sm py-2 px-4 rounded-xl",
                        "bg-neutral-100 dark:bg-white/5",
                        "ring-1 ring-neutral-300 dark:ring-neutral-600",
                        "transition-shadow duration-100",
                        open && "ring-neutral-400 dark:ring-neutral-500 ring-2",
                        error && "ring-red-400 dark:ring-red-500",
                        disabled && "opacity-50",
                    )}>
                        <Search size={16} className="shrink-0 text-neutral-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={open ? query : ""}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onFocus={handleOpen}
                            placeholder={placeholder}
                            disabled={disabled}
                            className="flex-1 bg-transparent outline-none text-sm font-semibold text-dark dark:text-light placeholder:text-neutral-400 placeholder:font-medium cursor-pointer focus:cursor-text"
                        />
                        {loading && <Loader2 size={16} className="shrink-0 text-neutral-400 animate-spin" />}
                        <ChevronDown size={16} className={cn("shrink-0 text-neutral-400 transition-transform duration-150", open && "rotate-180")} />
                    </div>
                )}
            </div>

            {error && <span className="pl-1 text-xs font-medium text-red-500">{error}</span>}

            {open && createPortal(
                <div ref={listRef} data-ds-portal="combobox" style={positionStyle}
                    className="fixed z-[100] rounded-2xl shadow-lg bg-white dark:bg-neutral-900 ring-1 ring-neutral-200 dark:ring-neutral-700 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100">
                    <div className="max-h-72 overflow-y-auto">
                        {options.map((option) => {
                            const isSelected = option.value === value;
                            return (
                                <button key={option.value} type="button" onClick={() => handleSelect(option)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 text-left outline-none cursor-pointer",
                                        "hover:bg-neutral-100 dark:hover:bg-white/5",
                                        isSelected && "text-dark dark:text-light font-semibold bg-neutral-50 dark:bg-white/5",
                                        !isSelected && "text-neutral-700 dark:text-neutral-300",
                                    )}>
                                    {hasImages && (
                                        option.image
                                            ? <img src={option.image} alt="" className="size-10 rounded-xl object-cover shrink-0" />
                                            : <div className="size-10 rounded-xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                                                <Package size={16} className="text-neutral-300 dark:text-neutral-600" />
                                            </div>
                                    )}
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
