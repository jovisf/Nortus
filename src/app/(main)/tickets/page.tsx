'use client';

import { useState } from 'react';
import { TicketStats, TicketList, TicketModal } from '@/components/sections/tickets';
import type { Ticket } from '@/types';

export default function TicketsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ticketToEdit, setTicketToEdit] = useState<Ticket | null>(null);

    const handleEdit = (ticket: Ticket) => {
        setTicketToEdit(ticket);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setTicketToEdit(null);
        setIsModalOpen(true);
    };

    return (
        <main className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestão de Tickets</h1>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
                >
                    + Novo Ticket
                </button>
            </div>

            <TicketStats />

            <div className="mt-8">
                <TicketList onEdit={handleEdit} />
            </div>

            <TicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                ticketToEdit={ticketToEdit}
            />
        </main>
    );
}
