'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Column<T> {
    header: string | ReactNode;
    key: string;
    render?: (item: T) => ReactNode;
    className?: string;
    headerClassName?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
    className?: string;
    onRowClick?: (item: T) => void;
}

export function Table<T>({
    columns,
    data,
    isLoading,
    emptyMessage = 'Nenhum dado encontrado.',
    className,
    onRowClick
}: TableProps<T>) {
    return (
        <div className={cn('w-full overflow-hidden bg-white/5 pb-3 rounded-[22px]', className)}>
            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <TableHeader columns={columns} />
                    </thead>
                    <tbody className="relative">
                        {isLoading ? (
                            <TableMessage columns={columns} message="Carregando..." />
                        ) : data.length === 0 ? (
                            <TableMessage columns={columns} message={emptyMessage} />
                        ) : (
                            data.map((item, index) => (
                                <TableRow
                                    key={index}
                                    item={item}
                                    columns={columns}
                                    onRowClick={onRowClick}
                                    isLast={index === data.length - 1}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function TableHeader<T>({ columns }: { columns: Column<T>[] }) {
    return (
        <tr className="relative">
            {columns.map((column) => (
                <th
                    key={column.key}
                    className={cn(
                        "px-6 py-5 text-[var(--text-header-table)] text-base tracking-wider font-medium",
                        column.headerClassName
                    )}
                >
                    {column.header}
                </th>
            ))}
            <td colSpan={columns.length} className="absolute inset-x-0 bottom-0 p-0 h-[1px]">
                <div className="mx-6 h-full bg-[var(--table-divider)] pointer-events-none" />
            </td>
        </tr>
    );
}

interface TableRowProps<T> {
    item: T;
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    isLast: boolean;
}

function TableRow<T>({ item, columns, onRowClick, isLast }: TableRowProps<T>) {
    return (
        <tr
            onClick={() => onRowClick?.(item)}
            className={cn(
                "group relative transition-colors hover:bg-white/[0.02]",
                onRowClick && "cursor-pointer"
            )}
        >
            {columns.map((column) => (
                <td
                    key={column.key}
                    className={cn(
                        "px-6 py-4 text-sm text-filter-text font-light",
                        column.className
                    )}
                >
                    {column.render ? column.render(item) : (item as any)[column.key]}
                </td>
            ))}

            {!isLast && (
                <td colSpan={columns.length} className="absolute inset-x-0 bottom-0 p-0 h-[1px]">
                    <div className="mx-6 h-full bg-[var(--table-divider)] pointer-events-none" />
                </td>
            )}
        </tr>
    );
}

function TableMessage<T>({ columns, message }: { columns: Column<T>[], message: string }) {
    return (
        <tr>
            <td colSpan={columns.length} className="px-6 py-10 text-center text-text-secondary">
                {message}
            </td>
        </tr>
    );
}
