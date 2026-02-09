'use client';

import { useQuery } from '@tanstack/react-query';
import { ticketsService } from '@/services';
import { useTicketStore } from '@/store/ticketStore';
import { useEffect } from 'react';

export function useTicket(id: string) {
    const { setSelectedTicket } = useTicketStore();

    const query = useQuery({
        queryKey: ['tickets', id],
        queryFn: () => ticketsService.getById(id),
        enabled: !!id,
    });

    useEffect(() => {
        if (query.data) {
            setSelectedTicket(query.data);
        }
    }, [query.data, setSelectedTicket]);

    return query;
}
