'use client';

import { useQuery } from '@tanstack/react-query';
import { ticketsService } from '@/services';

/**
 * Hook to fetch ALL tickets with aggressive caching.
 * Cache is only invalidated on mutations.
 */
export function useAllTickets() {
    return useQuery({
        queryKey: ['tickets', 'all'],
        queryFn: () => ticketsService.list(),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
}
