import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketsService } from '@/services';
import { useTicketStore } from '@/store/ticketStore';
import type { CreateTicketRequest } from '@/types';
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

export function useCreateTicket() {
  const queryClient = useQueryClient();
  const { addTicket } = useTicketStore();

  return useMutation({
    mutationFn: (data: CreateTicketRequest) => ticketsService.create(data),
    onSuccess: (newTicket) => {
      addTicket(newTicket);
      queryClient.invalidateQueries({ queryKey: ['tickets', 'all'] });
      toast.success(getToast('createSuccess'), {
        description: getToast('createDescription'),
      });
    },
    onError: (error: ApiError) => {
      toast.error(
        error?.response?.data?.message ?? getToast('createError')
      );
    },
  });
}

interface ApiError {
  response?: { data?: { message?: string } };
}
