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
    const statusOptions = [
        { label: 'Todos os status', value: 'all' },
        ...filterOptions.statuses.map(s => ({ label: s, value: s }))
    ];

    const priorityOptions = [
        { label: 'Todas as prioridades', value: 'all' },
        ...filterOptions.priorities.map(p => ({ label: p, value: p }))
    ];

    const responsibleOptions = [
        { label: 'Todos os responsáveis', value: 'all' },
        ...filterOptions.responsibles.map(r => ({ label: r, value: r }))
    ];

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
