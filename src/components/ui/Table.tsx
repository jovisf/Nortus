'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

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
  emptyMessage,
  className,
  onRowClick,
}: TableProps<T>) {
  const tCommon = useTranslations('Common');
  const displayEmptyMessage = emptyMessage || tCommon('noData');

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-[22px] bg-white/5 pb-3',
        className
      )}
    >
      <div className="scrollbar-hide overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead>
            <TableHeader columns={columns} />
          </thead>
          <tbody className="relative">
            {isLoading ? (
              <TableMessage columns={columns} message={tCommon('loading')} />
            ) : data.length === 0 ? (
              <TableMessage columns={columns} message={displayEmptyMessage} />
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
            'px-6 py-5 text-base font-medium tracking-wider text-[var(--text-header-table)]',
            column.headerClassName
          )}
        >
          {column.header}
        </th>
      ))}
      <td
        colSpan={columns.length}
        className="absolute inset-x-0 bottom-0 h-[1px] p-0"
      >
        <div className="pointer-events-none mx-6 h-full bg-[var(--table-divider)]" />
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
        'group relative transition-colors hover:bg-white/[0.02]',
        onRowClick && 'cursor-pointer'
      )}
    >
      {columns.map((column) => (
        <td
          key={column.key}
          className={cn(
            'text-filter-text px-6 py-4 text-sm font-light',
            column.className
          )}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {column.render ? column.render(item) : (item as any)[column.key]}
        </td>
      ))}

      {!isLast && (
        <td
          colSpan={columns.length}
          className="absolute inset-x-0 bottom-0 h-[1px] p-0"
        >
          <div className="pointer-events-none mx-6 h-full bg-[var(--table-divider)]" />
        </td>
      )}
    </tr>
  );
}

function TableMessage<T>({
  columns,
  message,
}: {
  columns: Column<T>[];
  message: string;
}) {
  return (
    <tr>
      <td
        colSpan={columns.length}
        className="text-text-secondary px-6 py-10 text-center"
      >
        {message}
      </td>
    </tr>
  );
}
