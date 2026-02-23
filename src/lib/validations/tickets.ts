import { z } from 'zod';

type TranslateFn = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const getTicketSchema = (t: TranslateFn) =>
  z.object({
    client: z
      .string()
      .min(3, t('clientName.min'))
      .max(30, t('clientName.max')),
    email: z.string().email(t('email.invalid')),
    priority: z.enum(['Baixa', 'Média', 'Alta', 'Urgente'], {
      errorMap: () => ({ message: t('priority.invalid') }),
    }),
    responsible: z
      .string()
      .min(3, t('responsible.min'))
      .max(40, t('responsible.max')),
    subject: z
      .string()
      .min(5, t('subject.min'))
      .max(200, t('subject.max')),
    status: z.enum(['Aberto', 'Em andamento', 'Fechado']).optional(),
  });

// Schema base apenas para inferência de tipo — sem dependência de t
const baseTicketSchema = z.object({
  client: z.string(),
  email: z.string(),
  priority: z.enum(['Baixa', 'Média', 'Alta', 'Urgente']),
  responsible: z.string(),
  subject: z.string(),
  status: z.enum(['Aberto', 'Em andamento', 'Fechado']).optional(),
});

export type TicketFormData = z.infer<typeof baseTicketSchema>;
