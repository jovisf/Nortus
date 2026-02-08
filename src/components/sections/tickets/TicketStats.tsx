'use client';

import { useAllTickets } from '@/hooks';

export function TicketStats() {
    const { data } = useAllTickets();
    const tickets = data?.data || [];

    const stats = {
        total: tickets.length,
        open: tickets.filter((t) => t.status === 'Aberto').length,
        completed: tickets.filter((t) => t.status === 'Fechado').length,
        inProgress: tickets.filter((t) => t.status === 'Em andamento').length,
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 border rounded shadow-sm bg-white">
                <p className="text-gray-500 text-sm">Total de Tickets</p>
                <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="p-4 border rounded shadow-sm bg-white">
                <p className="text-gray-500 text-sm">Em Aberto</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.open}</p>
            </div>
            <div className="p-4 border rounded shadow-sm bg-white">
                <p className="text-gray-500 text-sm">Concluídos</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="p-4 border rounded shadow-sm bg-white">
                <p className="text-gray-500 text-sm">Em andamento</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
        </div>
    );
}
