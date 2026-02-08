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
                return 'bg-green-100 text-green-800'
            case 'Pendente':
                return 'bg-yellow-100 text-yellow-800'
            case 'Inativo':
                return 'bg-gray-100 text-gray-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden', className)}>
            {/* Filter Section */}
            <div className="p-4 border-b bg-gray-50 space-y-3">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="🔍 Buscar por nome ou email..."
                        value={searchInput}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Filter Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Status Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => onFilterChange('status', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            {availableFilters.status.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    {/* Secure Type Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Tipo de Seguro</label>
                        <select
                            value={filters.secureType}
                            onChange={(e) => onFilterChange('secureType', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            {availableFilters.secureType.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Location Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Região</label>
                        <select
                            value={filters.location}
                            onChange={(e) => onFilterChange('location', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                        <tr className="bg-gray-50 border-bottom">
                            <th
                                className="p-3 border-b text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                onClick={toggleSortOrder}
                            >
                                <div className="flex items-center gap-2">
                                    Nome
                                    <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                </div>
                            </th>
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">Tipo de Seguro</th>
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">Valor Mensal</th>
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">Status</th>
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">Renovação</th>
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">Região</th>
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
                                <tr key={client.id} className="hover:bg-gray-50 border-b last:border-0">
                                    <td className="p-3 text-sm">
                                        <div className="font-semibold text-gray-900">{client.name}</div>
                                        <div className="text-gray-500 text-xs">{client.email}</div>
                                    </td>
                                    <td className="p-3 text-sm text-gray-900">{client.secureType}</td>
                                    <td className="p-3 text-sm text-gray-900">
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
                                    <td className="p-3 text-sm text-gray-600">{client.renewalDate}</td>
                                    <td className="p-3 text-sm text-gray-600">{client.location}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
