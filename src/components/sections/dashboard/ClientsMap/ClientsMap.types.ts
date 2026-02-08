import type { BaseComponentProps } from '@/types'
import type { ActiveClient, DashboardFilters } from '@/types'

export interface ClientsMapProps extends BaseComponentProps {
    clients: ActiveClient[]
    filters: DashboardFilters
    onFilterChange: (filterType: keyof DashboardFilters, value: string) => void
    availableFilters: {
        locations: string[]
        secureTypes: string[]
    }
}
