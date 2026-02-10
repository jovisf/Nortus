'use client';

import { useMemo } from 'react';
import { useAllTickets } from '@/hooks';
import { StatCard } from './StatCard';

export function TicketStats() {
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
                title: 'Tickets Abertos',
                value: counts.open,
                icon: '/tickets/opened.svg',
            },
            {
                title: 'Em andamento',
                value: counts.inProgress,
                icon: '/tickets/progress.svg',
            },
            {
                title: 'Resolvidos hoje',
                value: counts.closed,
                icon: '/tickets/closed.svg',
            },
            {
                title: 'Total de Tickets',
                value: counts.total,
                icon: '/tickets/total.svg',
            },
        ];
    }, [tickets]);

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
