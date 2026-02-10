import type {
  BaseComponentProps,
  ActiveClient,
  DashboardFilters,
  ApiLocation,
} from '@/types';

export interface ClientsMapProps extends BaseComponentProps {
  clients?: ActiveClient[];
  filters?: DashboardFilters;
  onFilterChange?: (filterType: keyof DashboardFilters, value: string) => void;
  availableFilters?: {
    locations: string[];
    secureTypes: string[];
  };
}

export type { ApiLocation };
