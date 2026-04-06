import { useState, useMemo } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../primitives/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../primitives/dropdown-menu";
import { MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./Button";

type Column<T = any> = { header: string; accessor: string; render?: (value: any, row: T) => React.ReactNode; sortable?: boolean; className?: string; };
type Action<T = any> = { label: string; icon: React.ReactNode; onClick: (row: T) => void; color?: string; condition?: (row: T) => boolean; disabled?: (row: T) => boolean; };
type DataTableProps<T = any> = { data: T[]; columns: Column<T>[]; actions?: Action<T>[]; mainActions?: Action<T>[]; emptyText?: string; rowKey?: (row: T, index: number) => string | number; onRowClick?: (row: T) => void; rowDisabled?: (row: T) => boolean; className?: string; };

function DataTable<T extends Record<string, any>>({ data, columns, actions = [], mainActions = [], emptyText = "Nenhum item encontrado", rowKey, onRowClick, rowDisabled, className }: DataTableProps<T>) {
    const [sortConfig, setSortConfig] = useState<{ accessor: string; direction: "asc" | "desc" } | null>(null);

    const handleSort = (accessor: string) => {
        setSortConfig((prev) => {
            if (prev?.accessor === accessor) return { accessor, direction: prev.direction === "asc" ? "desc" : "asc" };
            return { accessor, direction: "asc" };
        });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig) return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.accessor]; const bVal = b[sortConfig.accessor];
            if (aVal === bVal) return 0; if (aVal == null) return 1; if (bVal == null) return -1;
            if (typeof aVal === "string" && typeof bVal === "string") return sortConfig.direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            return sortConfig.direction === "asc" ? (aVal < bVal ? -1 : 1) : (aVal > bVal ? -1 : 1);
        });
    }, [data, sortConfig]);

    const hasActions = actions.length > 0 || mainActions.length > 0;
    const getKey = (row: T, idx: number) => (rowKey ? rowKey(row, idx) : idx);

    const SortIcon = ({ accessor }: { accessor: string }) => {
        if (sortConfig?.accessor !== accessor) return <ArrowUpDown size={12} className="opacity-0 group-hover/th:opacity-40 transition-opacity" />;
        return sortConfig.direction === "asc" ? <ArrowUp size={12} className="text-loce" /> : <ArrowDown size={12} className="text-loce" />;
    };

    const renderActions = (row: T) => {
        const visibleMain = mainActions.filter((a) => a.condition?.(row) ?? true);
        const visibleMore = actions.filter((a) => a.condition?.(row) ?? true);
        if (!visibleMain.length && !visibleMore.length) return null;
        return (
            <div className="flex items-center justify-end gap-1">
                {visibleMain.map((action) => {
                    const isDisabled = action.disabled?.(row);
                    return (
                        <Button key={action.label} variant="ghost" size="icon-sm" disabled={isDisabled}
                            onClick={(e) => { e.stopPropagation(); if (!isDisabled) action.onClick(row); }}
                            className="text-neutral-500 hover:text-dark dark:hover:text-light">{action.icon}</Button>
                    );
                })}
                {visibleMore.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" onClick={(e) => e.stopPropagation()} className="text-neutral-400 hover:text-dark dark:hover:text-light">
                                <MoreHorizontal size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {visibleMore.map((action) => {
                                const isDisabled = action.disabled?.(row);
                                return (
                                    <DropdownMenuItem key={action.label} disabled={isDisabled} onClick={() => { if (!isDisabled) action.onClick(row); }} className={cn("flex items-center gap-2", action.color)}>
                                        {action.icon}<span>{action.label}</span>
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        );
    };

    if (!data.length) return <div className="flex items-center justify-center py-12 text-sm text-neutral-400">{emptyText}</div>;

    return (
        <div className={cn("w-full", className)}>
            <div className="flex flex-col gap-2 md:hidden">
                {sortedData.map((row, idx) => (
                    <div key={getKey(row, idx)} onClick={() => onRowClick?.(row)}
                        className={cn("rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-700 p-4 bg-white dark:bg-white/[0.02]",
                            rowDisabled?.(row) && "opacity-50", onRowClick && "cursor-pointer active:scale-[0.99] duration-75"
                        )}>
                        <div className="flex flex-col gap-2.5">
                            {columns.map((col) => (
                                <div key={col.accessor} className="flex items-baseline justify-between gap-2">
                                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold shrink-0">{col.header}</span>
                                    <div className="text-sm font-semibold text-dark dark:text-neutral-200 text-right">
                                        {col.render ? col.render(row[col.accessor] ?? "-", row) : String(row[col.accessor] ?? "-")}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {hasActions && <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">{renderActions(row)}</div>}
                    </div>
                ))}
            </div>
            <div className="hidden md:block rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-700 bg-white dark:bg-white/[0.02] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-transparent">
                            {columns.map((col) => {
                                const sortable = col.sortable !== false;
                                return (
                                    <TableHead key={col.accessor} onClick={() => sortable && handleSort(col.accessor)}
                                        aria-sort={sortConfig?.accessor === col.accessor ? (sortConfig.direction === "asc" ? "ascending" : "descending") : undefined}
                                        className={cn("group/th", sortable && "cursor-pointer select-none", sortConfig?.accessor === col.accessor && "text-dark dark:text-light", col.className)}>
                                        <span className="inline-flex items-center gap-1.5">{col.header}{sortable && <SortIcon accessor={col.accessor} />}</span>
                                    </TableHead>
                                );
                            })}
                            {hasActions && <TableHead className="text-right w-[1%] whitespace-nowrap" />}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.map((row, idx) => (
                            <TableRow key={getKey(row, idx)} onClick={() => onRowClick?.(row)}
                                className={cn("text-sm", rowDisabled?.(row) && "opacity-50", onRowClick && "cursor-pointer")}>
                                {columns.map((col) => (
                                    <TableCell key={col.accessor} className={col.className}>
                                        {col.render ? col.render(row[col.accessor] ?? "-", row) : String(row[col.accessor] ?? "-")}
                                    </TableCell>
                                ))}
                                {hasActions && <TableCell className="w-[1%] whitespace-nowrap">{renderActions(row)}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export { DataTable };
export type { DataTableProps, Column, Action };
