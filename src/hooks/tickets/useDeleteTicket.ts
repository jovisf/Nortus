'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketsService } from '@/services';
import { useTicketStore } from '@/store/ticketStore';
import { toast } from 'sonner';

export function useDeleteTicket() {
  const queryClient = useQueryClient();
  const { removeTicketFromList } = useTicketStore();

  return useMutation({
    mutationFn: (id: string) => ticketsService.delete(id),
    onSuccess: (_, id) => {
      removeTicketFromList(id);
      queryClient.invalidateQueries({ queryKey: ['tickets', 'all'] });
      toast.success('Ticket excluído com sucesso!');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Erro ao excluir ticket');
    },
  });
}
