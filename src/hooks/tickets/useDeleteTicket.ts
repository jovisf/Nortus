import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketsService } from '@/services';
import { useTicketStore } from '@/store/ticketStore';
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

export function useDeleteTicket() {
  const queryClient = useQueryClient();
  const { removeTicketFromList } = useTicketStore();

  return useMutation({
    mutationFn: (id: string) => ticketsService.delete(id),
    onSuccess: (_, id) => {
      removeTicketFromList(id);
      queryClient.invalidateQueries({ queryKey: ['tickets', 'all'] });
      toast.success(getToast('deleteSuccess'), {
        description: getToast('deleteDescription'),
      });
    },
    onError: (error: ApiError) => {
      toast.error(
        error?.response?.data?.message ?? getToast('deleteError')
      );
    },
  });
}
