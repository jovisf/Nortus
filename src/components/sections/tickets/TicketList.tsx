'use client';

import { useState, useMemo } from 'react';
import { useFilteredTickets, useDeleteTicket } from '@/hooks';
import type { Ticket, TicketFilters } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';

const ITEMS_PER_PAGE = 7;

interface TicketListProps {
    onEdit: (ticket: Ticket) => void;
}

export function TicketList({ onEdit }: TicketListProps) {
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [filters, setFilters] = useState<TicketFilters>({
        search: '',
        status: 'all',
        priority: 'all',
        responsible: 'all',
    });

    // Debounce search input to avoid excessive re-renders
    const debouncedSearch = useDebounce(searchInput, 300);

    // Update filters when debounced search changes
    const activeFilters = useMemo<TicketFilters>(() => ({
        ...filters,
        search: debouncedSearch,
    }), [filters, debouncedSearch]);

    const { tickets, totalPages, totalItems, filterOptions, isLoading } = useFilteredTickets(
        activeFilters,
        page,
        ITEMS_PER_PAGE
    );

    const { mutate: deleteTicket } = useDeleteTicket();

    // Reset to page 1 when filters change
    const handleFilterChange = (key: keyof TicketFilters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    if (isLoading) return <div className="p-8 text-center bg-white border rounded">Carregando tickets...</div>;

    return (
        <div className="bg-white border rounded shadow-sm overflow-hidden">
            {/* Filter Section */}
            <div className="p-4 border-b bg-gray-50 space-y-3">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="🔍 Buscar por ID, cliente ou assunto..."
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
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            <option value="all">Todos</option>
                            {filterOptions.statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Priority Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Prioridade</label>
                        <select
                            value={filters.priority}
                            onChange={(e) => handleFilterChange('priority', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            <option value="all">Todas</option>
                            {filterOptions.priorities.map((priority) => (
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Responsible Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Responsável</label>
                        <select
                            value={filters.responsible}
                            onChange={(e) => handleFilterChange('responsible', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            <option value="all">Todos</option>
                            {filterOptions.responsibles.map((responsible) => (
                                <option key={responsible} value={responsible}>
                                    {responsible}
                                </option>
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
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">ID</th>
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">Prioridade</th>
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">Cliente / Assunto</th>
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">Status</th>
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">Responsável</th>
                            <th className="p-3 border-b text-sm font-semibold text-gray-700">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-6 text-center text-gray-500">
                                    Nenhum ticket encontrado.
                                </td>
                            </tr>
                        ) : (
                            tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-gray-50 border-b last:border-0">
                                    <td className="p-3 text-sm font-medium">{ticket.ticketId}</td>
                                    <td className="p-3 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm">
                                        <div className="font-semibold text-gray-900">{ticket.client}</div>
                                        <div className="text-gray-500 text-xs">{ticket.email}</div>
                                        <div className="text-gray-600 mt-1 line-clamp-1">{ticket.subject}</div>
                                    </td>
                                    <td className="p-3 text-sm">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-600">{ticket.responsible}</td>
                                    <td className="p-3 text-sm">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onEdit(ticket)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Deseja realmente excluir este ticket?')) {
                                                        deleteTicket(ticket.id);
                                                    }
                                                }}
                                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Excluir"
                                            >
                                                🗑️
                                            </button>
                                            <button
                                                onClick={() => console.log('Visualizar ticket:', ticket.id)}
                                                className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Ver"
                                            >
                                                👁️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="p-4 border-t flex items-center justify-between bg-white">
                    <p className="text-sm text-gray-600">
                        Mostrando <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> a{' '}
                        <span className="font-medium">
                            {Math.min(page * ITEMS_PER_PAGE, totalItems)}
                        </span>{' '}
                        de <span className="font-medium">{totalItems}</span> resultados
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Anterior
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${page === p
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function getPriorityColor(priority: string) {
    switch (priority) {
        case 'Urgente':
            return 'bg-red-100 text-red-700';
        case 'Alta':
            return 'bg-orange-100 text-orange-700';
        case 'Média':
            return 'bg-blue-100 text-blue-700';
        case 'Baixa':
            return 'bg-green-100 text-green-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
}

function getStatusColor(status: string) {
    switch (status) {
        case 'Aberto':
            return 'bg-yellow-100 text-yellow-700';
        case 'Em andamento':
            return 'bg-blue-100 text-blue-700';
        case 'Fechado':
            return 'bg-green-100 text-green-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
}
