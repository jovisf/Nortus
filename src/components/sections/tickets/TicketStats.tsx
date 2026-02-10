'use client';

import { useMemo } from 'react';
import { useAllTickets } from '@/hooks';
import { StatCard } from './StatCard';
import { useTranslations } from 'next-intl';

export function TicketStats() {
  const t = useTranslations('Tickets.stats');

  const { data } = useAllTickets();
  const stats = useMemo(() => {
    const tickets = data?.data || [];
    const counts = tickets.reduce(
      (acc, ticket) => {
        acc.total++;
        if (ticket.status === 'Aberto') acc.open++;
        if (ticket.status === 'Em andamento') acc.inProgress++;
        if (ticket.status === 'Fechado') acc.closed++;
        return acc;
      },
      { open: 0, inProgress: 0, closed: 0, total: 0 }
    );

    return [
      {
        title: t('open'),
        value: counts.open,
        icon: '/tickets/opened.svg',
      },
      {
        title: t('inProgress'),
        value: counts.inProgress,
        icon: '/tickets/progress.svg',
      },
      {
        title: t('resolvedToday'),
        value: counts.closed,
        icon: '/tickets/closed.svg',
      },
      {
        title: t('total'),
        value: counts.total,
        icon: '/tickets/total.svg',
      },
    ];
  }, [data, t]);

  return (
    <div className="scrollbar-hide mb-4 flex w-full flex-row items-stretch gap-5 overflow-x-auto pb-4 md:pb-0">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
