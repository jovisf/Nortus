'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketsService } from '@/services';
import { useTicketStore } from '@/store/ticketStore';
import type { UpdateTicketRequest } from '@/types';
import { toast } from 'sonner';

export function useUpdateTicket() {
  const queryClient = useQueryClient();
  const { updateTicketInList } = useTicketStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTicketRequest }) =>
      ticketsService.update(id, data),
    onSuccess: (updatedTicket) => {
      updateTicketInList(updatedTicket);
      queryClient.invalidateQueries({ queryKey: ['tickets', 'all'] });
      queryClient.invalidateQueries({
        queryKey: ['tickets', updatedTicket.id],
      });
      toast.success('Ticket atualizado com sucesso!', {
        description: 'As alterações foram salvas com sucesso.',
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar ticket');
    },
  });
}
