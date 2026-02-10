import { useMemo } from 'react';
import Image from 'next/image';
import type { Ticket } from '@/types';
import type { Column } from '@/components/ui';
import { getPriorityStyles, getStatusStyles } from '@/constants/tickets';

interface UseTicketColumnsProps {
    onEdit: (ticket: Ticket) => void;
}

export function useTicketColumns({ onEdit }: UseTicketColumnsProps) {
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('pt-BR');
        } catch (e) {
            return dateString;
        }
    };

    const columns = useMemo<Column<Ticket>[]>(() => [
        {
            header: 'ID',
            key: 'ticketId',
            className: 'font-bold text-white',
        },
        {
            header: 'Prioridade',
            key: 'priority',
            render: (ticket) => (
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getPriorityStyles(ticket.priority)}`}>
                    {ticket.priority}
                </span>
            ),
        },
        {
            header: 'Cliente',
            key: 'client',
            render: (ticket) => (
                <div className="flex flex-col">
                    <span className="text-white font-bold">{ticket.client}</span>
                    <span className="text-filter-text/60 text-xs">{ticket.email}</span>
                </div>
            )
        },
        {
            header: 'Assunto',
            key: 'subject',
            className: 'font-bold text-white max-w-[200px] truncate',
        },
        {
            header: 'Status',
            key: 'status',
            render: (ticket) => (
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusStyles(ticket.status)}`}>
                    {ticket.status}
                </span>
            )
        },
        {
            header: 'Criado em',
            key: 'createdAt',
            render: (ticket) => <span className="text-white font-bold">{formatDate(ticket.createdAt)}</span>,
        },
        {
            header: 'Responsável',
            key: 'responsible',
            className: 'font-bold text-white',
        },
        {
            header: 'Ações',
            key: 'actions',
            headerClassName: 'text-start pr-6',
            render: (ticket) => (
                <div className="flex items-center justify-start gap-5">
                    <button
                        onClick={() => onEdit(ticket)}
                        className="flex items-center gap-2 text-filter-text/60 hover:text-white transition-colors text-xs cursor-pointer"
                    >
                        <span>Editar</span>
                        <Image src="/tickets/edit.svg" alt="Editar" width={16} height={16} />
                    </button>
                    <button
                        className="flex items-center gap-2 text-filter-text/60 hover:text-white transition-colors text-xs cursor-pointer"
                    >
                        <span>Ver</span>
                        <Image src="/tickets/arrow.svg" alt="Ver" width={20} height={20} />
                    </button>
                </div>
            )
        }
    ], [onEdit]);

    return columns;
}
