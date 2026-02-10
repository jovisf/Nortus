'use client';

import { useMemo } from 'react';
import type {
  TicketFilters,
  TicketFilterOptions,
  TicketPriority,
  TicketStatus,
} from '@/types';
import { useAllTickets } from './useAllTickets';
import {
  filterTickets,
  paginateTickets,
  extractDistinctResponsibles,
} from '@/lib/ticketUtils';

const TICKET_STATUSES: TicketStatus[] = ['Aberto', 'Em andamento', 'Fechado'];
const TICKET_PRIORITIES: TicketPriority[] = ['Baixa', 'Média', 'Urgente'];

export function useFilteredTickets(
  filters: TicketFilters,
  page: number,
  pageSize: number = 7
) {
  const { data, isLoading, error } = useAllTickets();

  const allTickets = useMemo(() => data?.data || [], [data]);

  const filterOptions = useMemo<TicketFilterOptions>(() => {
    return {
      statuses: TICKET_STATUSES,
      priorities: TICKET_PRIORITIES,
      responsibles: extractDistinctResponsibles(allTickets),
    };
  }, [allTickets]);

  const filteredTickets = useMemo(() => {
    return filterTickets(allTickets, filters);
  }, [allTickets, filters]);

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
