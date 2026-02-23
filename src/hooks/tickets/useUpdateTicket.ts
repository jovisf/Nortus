import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketsService } from '@/services';
import { useTicketStore } from '@/store/ticketStore';
import type { UpdateTicketRequest } from '@/types';
import { toast } from 'sonner';
import { getCookie } from '@/lib/cookies';

import ptBR from '../../../messages/pt-BR.json';
import enUS from '../../../messages/en-US.json';

type ToastTicketKeys = keyof typeof ptBR.Toasts.tickets;

function getToast(key: ToastTicketKeys): string {
  const locale =
    typeof window !== 'undefined'
      ? (getCookie('NEXT_LOCALE') ?? 'pt-BR')
      : 'pt-BR';
  const map =
    locale === 'en-US' ? enUS.Toasts.tickets : ptBR.Toasts.tickets;
  return map[key];
}

interface ApiError {
  response?: { data?: { message?: string } };
}

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
      toast.success(getToast('updateSuccess'), {
        description: getToast('updateDescription'),
      });
    },
    onError: (error: ApiError) => {
      toast.error(
        error?.response?.data?.message ?? getToast('updateError')
      );
    },
  });
}
