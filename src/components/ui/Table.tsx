'use client';

import { ReactNode } from 'react';

export interface Column<T> {
    header: string;
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
        <div className={`w-full overflow-hidden bg-white/5 pb-3 rounded-[22px] ${className}`}>
            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                        <tr className="relative">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-5 text-[var(--text-header-table)] text-base  tracking-wider font-medium ${column.headerClassName || ''}`}
                                >
                                    {column.header}
                                </th>
                            ))}
                            {/* Unified Header Divider - Inset from start and end */}
                            <td colSpan={columns.length} className="absolute inset-x-0 bottom-0 p-0 h-[1px]">
                                <div className="mx-6 h-full bg-[var(--table-divider)] pointer-events-none" />
                            </td>
                        </tr>
                    </thead>
                    <tbody className="relative">
                        {isLoading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-10 text-center text-text-secondary">
                                    Carregando...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-10 text-center text-text-secondary">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((item, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    onClick={() => onRowClick?.(item)}
                                    className={`group relative transition-colors hover:bg-white/[0.02] ${onRowClick ? 'cursor-pointer' : ''}`}
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column.key}
                                            className={`px-6 py-4 text-sm text-filter-text font-light ${column.className || ''}`}
                                        >
                                            {column.render ? column.render(item) : (item as any)[column.key]}
                                        </td>
                                    ))}

                                    {/* Unified Row Divider - Inset from start and end of row */}
                                    {rowIndex < data.length - 1 && (
                                        <td colSpan={columns.length} className="absolute inset-x-0 bottom-0 p-0 h-[1px]">
                                            <div className="mx-6 h-full bg-[var(--table-divider)] pointer-events-none" />
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
