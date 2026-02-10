import { SearchInput, CustomSelect, SearchableSelect } from '@/components/ui'
import type { DashboardFilters } from '@/types'
import { useTranslations } from 'next-intl'

interface Option {
    label: string
    value: string
}

interface ActiveClientsFiltersProps {
    searchInput: string
    onSearchChange: (value: string) => void
    filters: DashboardFilters
    onFilterChange: (filterType: keyof DashboardFilters, value: string) => void
    statusOptions: Option[]
    typeOptions: Option[]
    locationOptions: Option[]
}

export function ActiveClientsFilters({
    searchInput,
    onSearchChange,
    filters,
    onFilterChange,
    statusOptions,
    typeOptions,
    locationOptions
}: ActiveClientsFiltersProps) {
    const t = useTranslations('Dashboard.table')

    return (
        <div className="py-4 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
                <SearchInput
                    placeholder={t('searchPlaceholder')}
                    value={searchInput}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="flex-1"
                />

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <CustomSelect
                        options={statusOptions}
                        value={filters.status}
                        onChange={(val: string) => onFilterChange('status', val)}
                        className="min-w-[160px]"
                    />
                    <SearchableSelect
                        options={typeOptions}
                        value={filters.secureType}
                        onChange={(val: string) => onFilterChange('secureType', val)}
                        className="min-w-[160px]"
                    />
                    <SearchableSelect
                        options={locationOptions}
                        value={filters.location}
                        onChange={(val: string) => onFilterChange('location', val)}
                        className="min-w-[160px]"
                    />
                </div>
            </div>
        </div>
    )
}
