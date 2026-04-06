import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./Button";

const buildPages = (current: number, total: number) => {
    if (total <= 1) return [1];
    const pages = new Set<number>();
    pages.add(1); pages.add(total);
    for (let i = current - 2; i <= current + 2; i++) { if (i > 1 && i < total) pages.add(i); }
    return Array.from(pages).sort((a, b) => a - b);
};

type PaginationBarProps = { page: number; totalPages: number; total: number; pageSize?: number; onPageChange: (page: number) => void; className?: string; };

function PaginationBar({ page, totalPages, total, pageSize = 20, onPageChange, className }: PaginationBarProps) {
    if (totalPages <= 1) return null;
    const rangeStart = total ? (page - 1) * pageSize + 1 : 0;
    const rangeEnd = total ? Math.min(page * pageSize, total) : 0;
    const pages = buildPages(page, totalPages);

    return (
        <div className={cn("flex flex-col gap-3 md:flex-row md:items-center md:justify-end", className)}>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                <span>{total.toLocaleString("pt-BR")} resultados</span><span>·</span><span>{rangeStart}–{rangeEnd}</span><span>·</span><span>Pagina {page} de {totalPages}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
                <Button variant="secondary" size="icon-sm" disabled={page === 1} onClick={() => onPageChange(Math.max(1, page - 1))}><ChevronLeft size={16} /></Button>
                {pages.map((p, i) => {
                    const prev = pages[i - 1];
                    const showEllipsis = prev && p - prev > 1;
                    return (
                        <div key={p} className="flex items-center gap-1.5">
                            {showEllipsis && <span className="text-neutral-400 px-1">...</span>}
                            <button type="button" onClick={() => onPageChange(p)}
                                className={cn("min-w-9 h-9 rounded-xl text-sm font-semibold ring-1 transition-colors active:scale-95 duration-75",
                                    p === page ? "bg-loce/15 text-loce ring-loce/30" : "bg-white dark:bg-white/5 text-neutral-500 ring-neutral-300 dark:ring-neutral-600 hover:bg-neutral-50 dark:hover:bg-white/10"
                                )}>{p}</button>
                        </div>
                    );
                })}
                <Button variant="secondary" size="icon-sm" disabled={page >= totalPages} onClick={() => onPageChange(Math.min(totalPages, page + 1))}><ChevronRight size={16} /></Button>
            </div>
        </div>
    );
}

export { PaginationBar };
export type { PaginationBarProps };
