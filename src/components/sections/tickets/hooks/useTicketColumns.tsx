import { useMemo } from 'react';
import Image from 'next/image';
import type { Ticket } from '@/types';
import type { Column } from '@/components/ui';
import { Badge } from '@/components/ui';
import { getPriorityStyles, getStatusStyles } from '@/constants/tickets';
import { formatDate } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface UseTicketColumnsProps {
  onEdit: (ticket: Ticket) => void;
}

export function useTicketColumns({ onEdit }: UseTicketColumnsProps) {
  const t = useTranslations('Tickets.table');
  const tCommon = useTranslations('Common');

  const columns = useMemo<Column<Ticket>[]>(
    () => [
      {
        header: tCommon('id'),
        key: 'ticketId',
        className: 'font-bold text-white',
      },
      {
        header: t('priority'),
        key: 'priority',
        render: (ticket) => (
          <Badge className={getPriorityStyles(ticket.priority)}>
            {ticket.priority}
          </Badge>
        ),
      },
      {
        header: t('client'),
        key: 'client',
        render: (ticket) => (
          <div className="flex flex-col">
            <span className="font-bold text-white">{ticket.client}</span>
            <span className="text-filter-text/60 text-xs">{ticket.email}</span>
          </div>
        ),
      },
      {
        header: t('subject'),
        key: 'subject',
        className: 'font-bold text-white max-w-[200px] truncate',
      },
      {
        header: t('status'),
        key: 'status',
        render: (ticket) => (
          <Badge className={getStatusStyles(ticket.status)}>
            {ticket.status}
          </Badge>
        ),
      },
      {
        header: t('createdAt'),
        key: 'createdAt',
        render: (ticket) => (
          <span className="font-bold text-white">
            {formatDate(ticket.createdAt)}
          </span>
        ),
      },
      {
        header: t('responsible'),
        key: 'responsible',
        className: 'font-bold text-white',
      },
      {
        header: t('actions'),
        key: 'actions',
        headerClassName: 'text-start pr-6',
        render: (ticket) => (
          <div className="flex items-center justify-start gap-5">
            <button
              onClick={() => onEdit(ticket)}
              className="text-filter-text/60 flex cursor-pointer items-center gap-2 text-xs transition-colors hover:text-white"
            >
              <span>{tCommon('edit')}</span>
              <Image
                src="/tickets/edit.svg"
                alt={tCommon('edit')}
                width={16}
                height={16}
              />
            </button>
            <button className="text-filter-text/60 flex cursor-pointer items-center gap-2 text-xs transition-colors hover:text-white">
              <span>{tCommon('view')}</span>
              <Image
                src="/tickets/arrow.svg"
                alt={tCommon('view')}
                width={20}
                height={20}
              />
            </button>
          </div>
        ),
      },
    ],
    [onEdit, t, tCommon]
  );

  return columns;
}
