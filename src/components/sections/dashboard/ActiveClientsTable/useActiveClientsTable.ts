'use client';

import { useState, useMemo, useCallback } from 'react';
import { useDebounce } from '@/hooks';
import type { ActiveClient, ActiveClientFilters } from '@/types';
import { useTranslations } from 'next-intl';

interface UseActiveClientsTableProps {
  clients: ActiveClient[];
  availableFilters: ActiveClientFilters;
}

export function useActiveClientsTable({
  clients,
  availableFilters,
}: UseActiveClientsTableProps) {
  const tCommon = useTranslations('Common');

  const [searchInput, setSearchInput] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const debouncedSearch = useDebounce(searchInput, 300);

  const filteredAndSortedClients = useMemo(() => {
    let result = [...clients];

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(
        (client) =>
          client.name.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [clients, debouncedSearch, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedClients.length / itemsPerPage);

  const paginatedClients = useMemo(() => {
    return filteredAndSortedClients.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
  }, [filteredAndSortedClients, page]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    setPage(1);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const createOptions = useCallback(
    (items: string[], allLabel: string) => [
      { label: allLabel, value: 'Todos' },
      ...items
        .filter((item) => item !== 'Todos')
        .map((item) => ({ label: item, value: item })),
    ],
    []
  );

  const statusOptions = useMemo(
    () => createOptions(availableFilters.status, tCommon('all')),
    [availableFilters.status, createOptions, tCommon]
  );

  const typeOptions = useMemo(
    () => createOptions(availableFilters.secureType, tCommon('all')),
    [availableFilters.secureType, createOptions, tCommon]
  );

  const locationOptions = useMemo(
    () => createOptions(availableFilters.locations, tCommon('all')),
    [availableFilters.locations, createOptions, tCommon]
  );

  return {
    searchInput,
    handleSearchChange,
    sortOrder,
    toggleSortOrder,
    page,
    setPage,
    totalPages,
    paginatedClients,
    totalItems: filteredAndSortedClients.length,
    itemsPerPage,
    statusOptions,
    typeOptions,
    locationOptions,
  };
}
