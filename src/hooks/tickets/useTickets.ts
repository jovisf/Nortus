import { useQuery } from '@tanstack/react-query';
import { ticketsService } from '@/services';
import { useTicketStore } from '@/store/ticketStore';
import { useEffect } from 'react';

export function useTickets() {
    const { setTickets, setLoading, setError } = useTicketStore();

    const query = useQuery({
        queryKey: ['tickets'],
        queryFn: ticketsService.list,
    });

    useEffect(() => {
        if (query.data) {
            setTickets(query.data.data);
        }
        setLoading(query.isLoading);
        if (query.error) {
            setError(query.error instanceof Error ? query.error.message : 'Erro ao carregar tickets');
        } else {
            setError(null);
        }
    }, [query.data, query.isLoading, query.error, setTickets, setLoading, setError]);

    return query;
}
