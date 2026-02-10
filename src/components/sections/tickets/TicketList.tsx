'use client';

import { useTicketList } from '@/hooks';
import type { Ticket } from '@/types';
import { Table, Pagination } from '@/components/ui';
import { useTicketColumns } from './hooks/useTicketColumns';
import { TicketFiltersSection } from './components/TicketFiltersSection';
import { useTranslations } from 'next-intl';

interface TicketListProps {
  onEdit: (ticket: Ticket) => void;
}

export function TicketList({ onEdit }: TicketListProps) {
  const t = useTranslations('Tickets');
  const {
    page,
    setPage,
    searchInput,
    filters,
    tickets,
    totalPages,
    totalItems,
    filterOptions,
    isLoading,
    handleFilterChange,
    handleSearchChange,
    itemsPerPage,
  } = useTicketList();

  const columns = useTicketColumns({ onEdit });

  return (
    <div className="flex flex-col overflow-hidden rounded-[22px] border border-white/5 bg-white/5">
      <div className="px-8 pt-5">
        <h2 className="text-[22px] font-bold tracking-tight text-white">
          {t('listTitle')}
        </h2>
      </div>

      <TicketFiltersSection
        searchInput={searchInput}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />

      <div className="flex-1 px-8">
        <Table
          columns={columns}
          data={tickets}
          isLoading={isLoading}
          emptyMessage={t('table.empty')}
        />
      </div>

      <div className="px-8 pt-2 pb-2">
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
