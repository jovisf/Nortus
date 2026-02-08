import { useQuery } from '@tanstack/react-query';
import { ticketsService } from '@/services';

/**
 * Hook to fetch ALL tickets with aggressive caching
 * Uses staleTime: Infinity to prevent unnecessary refetches
 * Cache is only invalidated on mutations (create/update/delete)
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
