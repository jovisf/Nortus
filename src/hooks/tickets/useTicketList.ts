import { useState, useMemo } from 'react';
import { useFilteredTickets, useDebounce } from '@/hooks';
import type { TicketFilters } from '@/types';

const ITEMS_PER_PAGE = 5;

export function useTicketList() {
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [filters, setFilters] = useState<TicketFilters>({
        search: '',
        status: 'all',
        priority: 'all',
        responsible: 'all',
    });

    const debouncedSearch = useDebounce(searchInput, 300);

    const activeFilters = useMemo<TicketFilters>(() => ({
        ...filters,
        search: debouncedSearch,
    }), [filters, debouncedSearch]);

    const { tickets, totalPages, totalItems, filterOptions, isLoading } = useFilteredTickets(
        activeFilters,
        page,
        ITEMS_PER_PAGE
    );

    const handleFilterChange = (key: keyof TicketFilters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return {
        page,
        setPage,
        searchInput,
        filters,
        tickets,
        totalPages,
        totalItems,
        filterOptions,
        isLoading,
        handleFilterChange,
        handleSearchChange,
        itemsPerPage: ITEMS_PER_PAGE,
    };
}
