import { useMemo } from 'react';
import { SearchInput, CustomSelect } from '@/components/ui';
import type { TicketFilters } from '@/types';

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
    const { statusOptions, priorityOptions, responsibleOptions } = useMemo(() => {
        const createOptions = (list: string[], allLabel: string) => [
            { label: allLabel, value: 'all' },
            ...list.map(item => ({ label: item, value: item }))
        ];

        return {
            statusOptions: createOptions(filterOptions.statuses, 'Todos os status'),
            priorityOptions: createOptions(filterOptions.priorities, 'Todas as prioridades'),
            responsibleOptions: createOptions(filterOptions.responsibles, 'Todos os responsáveis')
        };
    }, [filterOptions]);

    return (
        <div className="px-8 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <SearchInput
                    placeholder="Buscar por ID, cliente ou assunto..."
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
                    <CustomSelect
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
