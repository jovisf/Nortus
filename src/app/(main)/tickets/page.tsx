'use client';

import { useState, useMemo, useCallback } from 'react';
import { TicketStats, TicketList, TicketModal } from '@/components/sections/tickets';
import { useHeader } from '@/hooks';
import { Plus } from 'lucide-react';
import type { Ticket } from '@/types';

export default function TicketsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ticketToEdit, setTicketToEdit] = useState<Ticket | null>(null);

    const handleEdit = useCallback((ticket: Ticket) => {
        setTicketToEdit(ticket);
        setIsModalOpen(true);
    }, []);

    const handleCreate = useCallback(() => {
        setTicketToEdit(null);
        setIsModalOpen(true);
    }, []);

    const headerActions = useMemo(() => (
        <button
            onClick={handleCreate}
            className="bg-primary-blue hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary-blue/20 transition-all flex items-center gap-2"
        >
            <Plus size={20} />
            Novo Ticket
        </button>
    ), [handleCreate]);

    useHeader('Gestão de Tickets', headerActions);

    return (
        <div className="p-10 max-w-[1600px]">
            <TicketStats />

            <div className="mt-8">
                <TicketList onEdit={handleEdit} />
            </div>

            <TicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                ticketToEdit={ticketToEdit}
            />
        </div>
    );
}
