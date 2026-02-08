import type { BaseComponentProps } from '@/types'
import type { ActiveClient, DashboardFilters, ActiveClientFilters } from '@/types'

export interface ActiveClientsTableProps extends BaseComponentProps {
    clients: ActiveClient[]
    filters: DashboardFilters
    availableFilters: ActiveClientFilters
    onFilterChange: (filterType: keyof DashboardFilters, value: string) => void
}
