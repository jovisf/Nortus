import type { TicketPriority, TicketStatus } from '@/types';

export const PRIORITY_OPTIONS = [
  { label: 'Baixa', value: 'Baixa' as TicketPriority },
  { label: 'Média', value: 'Média' as TicketPriority },
  { label: 'Alta', value: 'Alta' as TicketPriority },
  { label: 'Urgente', value: 'Urgente' as TicketPriority },
];

export const STATUS_OPTIONS = [
  { label: 'Aberto', value: 'Aberto' as TicketStatus },
  { label: 'Em andamento', value: 'Em andamento' as TicketStatus },
  { label: 'Fechado', value: 'Fechado' as TicketStatus },
];

export const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case 'Urgente':
      return 'bg-priority-urgent text-white';
    case 'Média':
      return 'bg-priority-medium text-black';
    case 'Baixa':
      return 'bg-priority-low text-black';
    default:
      return 'bg-white/10 text-white';
  }
};

export const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Em andamento':
      return 'bg-status-inprogress text-black';
    case 'Aberto':
      return 'bg-status-open text-black';
    case 'Fechado':
      return 'bg-success text-black';
    default:
      return 'bg-white/10 text-white';
  }
};
