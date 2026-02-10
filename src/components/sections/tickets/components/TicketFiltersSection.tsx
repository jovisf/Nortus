import { useMemo } from 'react';
import { SearchInput, CustomSelect, SearchableSelect } from '@/components/ui';
import type { TicketFilters } from '@/types';
import { useTranslations } from 'next-intl';

interface TicketFiltersSectionProps {
    searchInput: string;
    onSearchChange: (value: string) => void;
    filters: TicketFilters;
    onFilterChange: (key: keyof TicketFilters, value: string) => void;
    filterOptions: {
        statuses: string[];
        priorities: string[];
        responsibles: string[];
    };
}

export function TicketFiltersSection({
    searchInput,
    onSearchChange,
    filters,
    onFilterChange,
    filterOptions
}: TicketFiltersSectionProps) {
    const t = useTranslations('Tickets.filters');

    const { statusOptions, priorityOptions, responsibleOptions } = useMemo(() => {
        const createOptions = (list: string[], allLabel: string) => [
            { label: allLabel, value: 'all' },
            ...list.map(item => ({ label: item, value: item }))
        ];

        return {
            statusOptions: createOptions(filterOptions.statuses, t('allStatus')),
            priorityOptions: createOptions(filterOptions.priorities, t('allPriorities')),
            responsibleOptions: createOptions(filterOptions.responsibles, t('allResponsibles'))
        };
    }, [filterOptions, t]);

    return (
        <div className="px-8 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <SearchInput
                    placeholder={t('search')}
                    value={searchInput}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="flex-1"
                />

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <CustomSelect
                        options={statusOptions}
                        value={filters.status}
                        onChange={(val) => onFilterChange('status', val)}
                        className="min-w-[160px]"
                    />
                    <CustomSelect
                        options={priorityOptions}
                        value={filters.priority}
                        onChange={(val) => onFilterChange('priority', val)}
                        className="min-w-[180px]"
                    />
                    <SearchableSelect
                        options={responsibleOptions}
                        value={filters.responsible}
                        onChange={(val) => onFilterChange('responsible', val)}
                        className="min-w-[190px]"
                    />
                </div>
            </div>
        </div>
    );
}
