import { useMemo } from 'react';
import type { TicketFilters, TicketFilterOptions, TicketPriority, TicketStatus } from '@/types';
import { useAllTickets } from './useAllTickets';
import { filterTickets, paginateTickets, extractDistinctResponsibles } from '@/lib/ticketUtils';

const TICKET_STATUSES: TicketStatus[] = ['Aberto', 'Em andamento', 'Fechado'];
const TICKET_PRIORITIES: TicketPriority[] = ['Baixa', 'Média', 'Urgente'];

/**
 * Hook that combines filtering and pagination with memoization
 * Optimized for client-side filtering of large datasets
 * 
 * @param filters - Current filter state
 * @param page - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 */
export function useFilteredTickets(
    filters: TicketFilters,
    page: number,
    pageSize: number = 7
) {
    const { data, isLoading, error } = useAllTickets();

    // Extract all tickets from response
    const allTickets = useMemo(() => data?.data || [], [data]);

    // Memoize filter options extraction
    const filterOptions = useMemo<TicketFilterOptions>(() => {
        return {
            statuses: TICKET_STATUSES,
            priorities: TICKET_PRIORITIES,
            responsibles: extractDistinctResponsibles(allTickets),
        };
    }, [allTickets]);

    // Memoize filtered results
    const filteredTickets = useMemo(() => {
        return filterTickets(allTickets, filters);
    }, [allTickets, filters]);

    // Memoize paginated results
    const paginatedResult = useMemo(() => {
        return paginateTickets(filteredTickets, page, pageSize);
    }, [filteredTickets, page, pageSize]);

    return {
        tickets: paginatedResult.items,
        totalPages: paginatedResult.totalPages,
        totalItems: paginatedResult.totalItems,
        currentPage: paginatedResult.currentPage,
        filterOptions,
        isLoading,
        error,
    };
}
