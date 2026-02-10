'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Table, Badge, Pagination } from '@/components/ui'
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react'
import { useActiveClientsTable } from './useActiveClientsTable'
import { ActiveClientsFilters } from './ActiveClientsFilters'
import type { ActiveClientsTableProps } from './ActiveClientsTable.types'
import type { Column } from '@/components/ui'
import type { ActiveClient } from '@/types'
import { useTranslations } from 'next-intl'

export function ActiveClientsTable({
    clients,
    filters,
    availableFilters,
    onFilterChange,
    className
}: ActiveClientsTableProps) {
    const t = useTranslations('Dashboard.table')
    const tDash = useTranslations('Dashboard')

    const {
        searchInput,
        handleSearchChange,
        sortOrder,
        toggleSortOrder,
        page,
        setPage,
        totalPages,
        paginatedClients,
        totalItems,
        itemsPerPage,
        statusOptions,
        typeOptions,
        locationOptions
    } = useActiveClientsTable({ clients, availableFilters })

    const columns = useMemo<Column<ActiveClient>[]>(() => [
        {
            header: (
                <div
                    className="flex items-center gap-2 cursor-pointer transition-colors hover:text-white select-none"
                    onClick={toggleSortOrder}
                >
                    {t('name')}
                    {sortOrder === 'asc' ? <ArrowDownAZ size={16} /> : <ArrowUpAZ size={16} />}
                </div>
            ),
            key: 'name',
            render: (client: ActiveClient) => (
                <div className="flex flex-col">
                    <span className="text-white font-bold text-base">{client.name}</span>
                    <span className="text-filter-text/60 text-xs">{client.email}</span>
                </div>
            )
        },
        {
            header: t('secureType'),
            key: 'secureType',
            className: 'text-white font-bold',
        },
        {
            header: t('monthValue'),
            key: 'monthValue',
            render: (client: ActiveClient) => `R$ ${client.monthValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            className: 'text-white font-bold',
        },
        {
            header: t('status'),
            key: 'status',
            render: (client) => {
                const isActive = client.status === 'Ativo'
                return (
                    <Badge
                        className={cn(
                            'w-[100px] flex justify-center',
                            isActive
                                ? 'bg-brand-cyan text-app-bg'
                                : 'bg-status-inprogress text-app-bg'
                        )}
                    >
                        {client.status}
                    </Badge>
                )
            }
        },
        {
            header: t('renewal'),
            key: 'renewalDate',
            className: 'text-white font-light',
        },
        {
            header: t('location'),
            key: 'location',
            className: 'text-white font-light',
        }
    ], [sortOrder, toggleSortOrder, t])

    return (
        <div className={cn('bg-white/5 border border-white/5 rounded-[22px] overflow-hidden flex flex-col px-5', className)}>
            <div className="pt-5 flex items-center justify-between">
                <h2 className="text-white text-[22px] font-bold tracking-tight">{tDash('activeClients')}</h2>
            </div>

            <ActiveClientsFilters
                searchInput={searchInput}
                onSearchChange={handleSearchChange}
                filters={filters}
                onFilterChange={onFilterChange}
                statusOptions={statusOptions}
                typeOptions={typeOptions}
                locationOptions={locationOptions}
            />

            <div className="bg-white/5 border border-white/5 rounded-[22px] overflow-hidden">
                <Table
                    columns={columns}
                    data={paginatedClients}
                    emptyMessage={t('empty')}
                    className="bg-transparent rounded-none"
                />
            </div>

            <div className="pb-4 pt-2">
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}
