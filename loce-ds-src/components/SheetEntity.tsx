import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./Button";
import { ScrollFade } from "./ScrollFade";

type SheetEntityProps = { open: boolean; onClose: () => void; title: string; description?: string; children: React.ReactNode; footer?: React.ReactNode; submitLabel?: string; cancelLabel?: string; onSubmit?: () => void; isLoading?: boolean; };

function SheetEntity({ open, onClose, title, description, children, footer, submitLabel = "Salvar", cancelLabel = "Cancelar", onSubmit, isLoading }: SheetEntityProps) {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setMounted(true);
        } else {
            setVisible(false);
            const timer = setTimeout(() => setMounted(false), 200);
            return () => clearTimeout(timer);
        }
    }, [open]);

    useEffect(() => {
        if (!mounted || !open) return;
        const raf = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(raf);
    }, [mounted, open]);

    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    useEffect(() => {
        if (!mounted) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, [mounted]);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-50">
            <div className={cn("absolute inset-0 bg-black/40 transition-opacity duration-200", visible ? "opacity-100" : "opacity-0")} onClick={onClose} />
            <div className={cn("absolute right-0 top-0 w-full sm:max-w-md flex flex-col", "bg-light dark:bg-dark shadow-xl rounded-l-3xl my-2 h-[calc(100%-16px)]", "transition-transform duration-200 ease-out", visible ? "translate-x-0" : "translate-x-full")}>
                <div className="shrink-0 px-6 pt-6 pb-4 pr-12 border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-lg font-bold text-dark dark:text-light leading-tight">{title}</h2>
                    {description && <p className="text-[13px] font-medium text-neutral-500 dark:text-neutral-400 mt-1.5 leading-snug">{description}</p>}
                    <Button variant="ghost" size="icon-sm" onClick={onClose} className="absolute right-4 top-4"><X className="h-4 w-4" /></Button>
                </div>
                <ScrollFade position="both" className="px-6 py-6">{children}</ScrollFade>
                <div className="shrink-0 px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
                    {footer || (
                        <div className="flex gap-3">
                            {!isLoading && <Button onClick={onClose} variant="secondary" className="flex-1">{cancelLabel}</Button>}
                            <Button onClick={onSubmit} variant="primary" className="flex-1" loading={isLoading}>{isLoading ? "Salvando..." : submitLabel}</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

export { SheetEntity };
export type { SheetEntityProps };
