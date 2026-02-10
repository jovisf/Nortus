'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  TicketStats,
  TicketList,
  TicketModal,
} from '@/components/sections/tickets';
import { useHeader, useTicketList } from '@/hooks';
import { PageSkeleton } from '@/components/shared';
import { Plus } from 'lucide-react';
import type { Ticket } from '@/types';
import { useTranslations } from 'next-intl';

export default function TicketsPage() {
  const t = useTranslations('Tickets');
  const { isLoading } = useTicketList();
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

  const headerActions = useMemo(
    () => (
      <button
        onClick={handleCreate}
        className="bg-primary-blue shadow-primary-blue/20 flex cursor-pointer items-center gap-2 rounded-4xl px-6 py-2.5 font-semibold text-white shadow-lg transition-all hover:bg-blue-700"
      >
        <Plus size={20} />
        {t('newTicket')}
      </button>
    ),
    [handleCreate, t]
  );

  useHeader('Tickets', headerActions);

  if (isLoading) {
    return <PageSkeleton type="tickets" />;
  }

  return (
    <div className="page-container">
      <TicketStats />

      <TicketList onEdit={handleEdit} />

      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticketToEdit={ticketToEdit}
      />
    </div>
  );
}
