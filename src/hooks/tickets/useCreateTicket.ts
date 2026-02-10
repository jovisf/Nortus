'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketsService } from '@/services';
import { useTicketStore } from '@/store/ticketStore';
import type { CreateTicketRequest } from '@/types';
import { toast } from 'sonner';

export function useCreateTicket() {
  const queryClient = useQueryClient();
  const { addTicket } = useTicketStore();

  return useMutation({
    mutationFn: (data: CreateTicketRequest) => ticketsService.create(data),
    onSuccess: (newTicket) => {
      addTicket(newTicket);
      queryClient.invalidateQueries({ queryKey: ['tickets', 'all'] });
      toast.success('Ticket criado com sucesso!', {
        description: 'O ticket foi criado e já está na sua lista.',
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao criar ticket');
    },
  });
}
