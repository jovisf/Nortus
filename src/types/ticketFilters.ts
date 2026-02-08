import type { TicketPriority, TicketStatus } from './tickets';

export interface TicketFilters {
    search: string;
    status: TicketStatus | 'all';
    priority: TicketPriority | 'all';
    responsible: string | 'all';
}

export interface TicketFilterOptions {
    statuses: TicketStatus[];
    priorities: TicketPriority[];
    responsibles: string[];
}
