'use client';

import { useTicketList } from '@/hooks';
import type { Ticket } from '@/types';
import { Table, Pagination } from '@/components/ui';
import { useTicketColumns } from './hooks/useTicketColumns';
import { TicketFiltersSection } from './components/TicketFiltersSection';

interface TicketListProps {
    onEdit: (ticket: Ticket) => void;
}

export function TicketList({ onEdit }: TicketListProps) {
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
        <div className="bg-white/5 border border-white/5 rounded-[22px] overflow-hidden flex flex-col">
            <div className="px-8 pt-5 ">
                <h2 className="text-white text-[22px] font-bold tracking-tight">Lista de Tickets</h2>
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
                    emptyMessage="Nenhum ticket encontrado."
                />
            </div>

            <div className="px-8 pb-2 pt-2">
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
