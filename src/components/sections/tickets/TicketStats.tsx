'use client';

import { useMemo } from 'react';
import { useAllTickets } from '@/hooks';
import { StatCard } from './StatCard';
import { useTranslations } from 'next-intl';

export function TicketStats() {
    const t = useTranslations('Tickets.stats');
    const { data } = useAllTickets();
    const tickets = data?.data || [];

    const stats = useMemo(() => {
        const counts = tickets.reduce((acc, ticket) => {
            acc.total++;
            if (ticket.status === 'Aberto') acc.open++;
            if (ticket.status === 'Em andamento') acc.inProgress++;
            if (ticket.status === 'Fechado') acc.closed++;
            return acc;
        }, { open: 0, inProgress: 0, closed: 0, total: 0 });

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
    }, [tickets, t]);

    return (
        <div className="flex flex-row items-stretch gap-5 mb-4 w-full overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
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
