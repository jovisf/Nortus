'use client';

import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services';

/**
 * Hook to fetch map locations with react-query.
 */
export function useLocations() {
  return useQuery({
    queryKey: ['map-locations'],
    queryFn: () => dashboardService.getLocations(),
  });
}
