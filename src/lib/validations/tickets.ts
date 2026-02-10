import { z } from 'zod';

export const ticketSchema = z.object({
  client: z
    .string()
    .min(3, 'Nome do cliente deve ter pelo menos 3 caracteres')
    .max(30, 'Nome muito longo'),
  email: z.string().email('E-mail inválido'),
  priority: z.enum(['Baixa', 'Média', 'Alta', 'Urgente'], {
    errorMap: () => ({ message: 'Selecione uma prioridade válida' }),
  }),
  responsible: z
    .string()
    .min(3, 'Responsável deve ter pelo menos 3 caracteres')
    .max(40, 'Nome muito longo'),
  subject: z
    .string()
    .min(5, 'O assunto deve ter pelo menos 5 caracteres')
    .max(200, 'Assunto excedeu 200'),
  status: z.enum(['Aberto', 'Em andamento', 'Fechado']).optional(),
});

export type TicketFormData = z.infer<typeof ticketSchema>;
