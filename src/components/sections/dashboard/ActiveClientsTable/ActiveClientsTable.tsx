'use client'

import { useState, useMemo } from 'react'
import { useDebounce } from '@/hooks'
import { cn } from '@/lib/utils'
import type { ActiveClientsTableProps } from './ActiveClientsTable.types'

export function ActiveClientsTable({
    clients,
    filters,
    availableFilters,
    onFilterChange,
    className
}: ActiveClientsTableProps) {
    const [searchInput, setSearchInput] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const debouncedSearch = useDebounce(searchInput, 300)

    const filteredAndSortedClients = useMemo(() => {
        let result = [...clients]

        if (debouncedSearch) {
            const searchLower = debouncedSearch.toLowerCase()
            result = result.filter(client =>
                client.name.toLowerCase().includes(searchLower) ||
                client.email.toLowerCase().includes(searchLower)
            )
        }

        result.sort((a, b) => {
            const comparison = a.name.localeCompare(b.name)
            return sortOrder === 'asc' ? comparison : -comparison
        })

        return result
    }, [clients, debouncedSearch, sortOrder])

    const handleSearchChange = (value: string) => {
        setSearchInput(value)
    }

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ativo':
                return 'bg-success/10 text-success'
            case 'Pendente':
                return 'bg-warning/10 text-warning'
            case 'Inativo':
                return 'bg-danger/10 text-danger'
            default:
                return 'bg-text-secondary/10 text-text-secondary'
        }
    }

    return (
        <div className={cn('bg-card-bg rounded-lg shadow-sm border border-border-ui overflow-hidden', className)}>
            {/* Filter Section */}
            <div className="p-4 border-b border-border-ui bg-app-bg space-y-3">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder=" Buscar por nome ou email..."
                        value={searchInput}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full px-4 py-2 border border-border-ui bg-card-bg text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Filter Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Status Filter */}
                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => onFilterChange('status', e.target.value)}
                            className="w-full px-3 py-2 border border-border-ui bg-card-bg text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        >
                            {availableFilters.status.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    {/* Secure Type Filter */}
                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">Tipo de Seguro</label>
                        <select
                            value={filters.secureType}
                            onChange={(e) => onFilterChange('secureType', e.target.value)}
                            className="w-full px-3 py-2 border border-border-ui bg-card-bg text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        >
                            {availableFilters.secureType.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Location Filter */}
                    <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">Região</label>
                        <select
                            value={filters.location}
                            onChange={(e) => onFilterChange('location', e.target.value)}
                            className="w-full px-3 py-2 border border-border-ui bg-card-bg text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        >
                            {availableFilters.locations.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-app-bg border-bottom border-border-ui">
                            <th
                                className="p-3 border-b border-border-ui text-sm font-semibold text-text-primary cursor-pointer hover:bg-white/5"
                                onClick={toggleSortOrder}
                            >
                                <div className="flex items-center gap-2">
                                    Nome
                                    <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                </div>
                            </th>
                            <th className="p-3 border-b border-border-ui text-sm font-semibold text-text-primary">Tipo de Seguro</th>
                            <th className="p-3 border-b border-border-ui text-sm font-semibold text-text-primary">Valor Mensal</th>
                            <th className="p-3 border-b border-border-ui text-sm font-semibold text-text-primary">Status</th>
                            <th className="p-3 border-b border-border-ui text-sm font-semibold text-text-primary">Renovação</th>
                            <th className="p-3 border-b border-border-ui text-sm font-semibold text-text-primary">Região</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedClients.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-gray-500">
                                    Nenhum cliente encontrado
                                </td>
                            </tr>
                        ) : (
                            filteredAndSortedClients.map((client) => (
                                <tr key={client.id} className="hover:bg-white/5 border-b border-border-ui last:border-0">
                                    <td className="p-3 text-sm">
                                        <div className="font-semibold text-text-primary">{client.name}</div>
                                        <div className="text-text-secondary text-xs">{client.email}</div>
                                    </td>
                                    <td className="p-3 text-sm text-text-primary">{client.secureType}</td>
                                    <td className="p-3 text-sm text-text-primary">
                                        R$ {client.monthValue.toFixed(2)}
                                    </td>
                                    <td className="p-3 text-sm">
                                        <span className={cn(
                                            'px-2 py-1 rounded-full text-xs font-medium',
                                            getStatusColor(client.status)
                                        )}>
                                            {client.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm text-text-secondary">{client.renewalDate}</td>
                                    <td className="p-3 text-sm text-text-secondary">{client.location}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
