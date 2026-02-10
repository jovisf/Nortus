'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Table, Badge, Pagination } from '@/components/ui';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { useActiveClientsTable } from './useActiveClientsTable';
import { ActiveClientsFilters } from './ActiveClientsFilters';
import type { ActiveClientsTableProps } from './ActiveClientsTable.types';
import type { Column } from '@/components/ui';
import type { ActiveClient } from '@/types';
import { useTranslations } from 'next-intl';

export function ActiveClientsTable({
  clients,
  filters,
  availableFilters,
  onFilterChange,
  className,
}: ActiveClientsTableProps) {
  const t = useTranslations('Dashboard.table');
  const tDash = useTranslations('Dashboard');

  const {
    searchInput,
    handleSearchChange,
    sortOrder,
    toggleSortOrder,
    page,
    setPage,
    totalPages,
    paginatedClients,
    totalItems,
    itemsPerPage,
    statusOptions,
    typeOptions,
    locationOptions,
  } = useActiveClientsTable({ clients, availableFilters });

  const columns = useMemo<Column<ActiveClient>[]>(
    () => [
      {
        header: (
          <div
            className="flex cursor-pointer items-center gap-2 transition-colors select-none hover:text-white"
            onClick={toggleSortOrder}
          >
            {t('name')}
            {sortOrder === 'asc' ? (
              <ArrowDownAZ size={16} />
            ) : (
              <ArrowUpAZ size={16} />
            )}
          </div>
        ),
        key: 'name',
        render: (client: ActiveClient) => (
          <div className="flex flex-col">
            <span className="text-base font-bold text-white">
              {client.name}
            </span>
            <span className="text-filter-text/60 text-xs">{client.email}</span>
          </div>
        ),
      },
      {
        header: t('secureType'),
        key: 'secureType',
        className: 'text-white font-bold',
      },
      {
        header: t('monthValue'),
        key: 'monthValue',
        render: (client: ActiveClient) =>
          `R$ ${client.monthValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
        className: 'text-white font-bold',
      },
      {
        header: t('status'),
        key: 'status',
        render: (client) => {
          const isActive = client.status === 'Ativo';
          return (
            <Badge
              className={cn(
                'flex w-[100px] justify-center',
                isActive
                  ? 'bg-brand-cyan text-app-bg'
                  : 'bg-status-inprogress text-app-bg'
              )}
            >
              {client.status}
            </Badge>
          );
        },
      },
      {
        header: t('renewal'),
        key: 'renewalDate',
        className: 'text-white font-light',
      },
      {
        header: t('location'),
        key: 'location',
        className: 'text-white font-light',
      },
    ],
    [sortOrder, toggleSortOrder, t]
  );

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-[22px] border border-white/5 bg-white/5 px-5',
        className
      )}
    >
      <div className="flex items-center justify-between pt-5">
        <h2 className="text-[22px] font-bold tracking-tight text-white">
          {tDash('activeClients')}
        </h2>
      </div>

      <ActiveClientsFilters
        searchInput={searchInput}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFilterChange={onFilterChange}
        statusOptions={statusOptions}
        typeOptions={typeOptions}
        locationOptions={locationOptions}
      />

      <div className="overflow-hidden rounded-[22px] border border-white/5 bg-white/5">
        <Table
          columns={columns}
          data={paginatedClients}
          emptyMessage={t('empty')}
          className="rounded-none bg-transparent"
        />
      </div>

      <div className="pt-2 pb-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
