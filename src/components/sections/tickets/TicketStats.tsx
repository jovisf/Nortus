'use client';

import { useAllTickets } from '@/hooks';
import { StatCard } from './StatCard';

export function TicketStats() {
    const { data } = useAllTickets();
    const tickets = data?.data || [];

    const stats = [
        {
            title: 'Tickets Abertos',
            value: tickets.filter((t) => t.status === 'Aberto').length,
            icon: '/tickets/opened.svg',
        },
        {
            title: 'Em andamento',
            value: tickets.filter((t) => t.status === 'Em andamento').length,
            icon: '/tickets/progress.svg',
        },
        {
            title: 'Resolvidos hoje',
            value: tickets.filter((t) => t.status === 'Fechado').length,
            icon: '/tickets/closed.svg',
        },
        {
            title: 'Total de Tickets',
            value: tickets.length,
            icon: '/tickets/total.svg',
        },
    ];

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
