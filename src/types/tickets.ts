export type TicketPriority = 'Urgente' | 'Alta' | 'Média' | 'Baixa';
export type TicketStatus = 'Aberto' | 'Em andamento' | 'Fechado';

export interface Ticket {
  id: string; // UUID
  ticketId: string; // Display ID
  priority: TicketPriority;
  client: string;
  email: string;
  subject: string;
  status: TicketStatus;
  responsible: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketRequest {
  ticketId: string;
  priority: TicketPriority;
  client: string;
  email: string;
  subject: string;
  status: TicketStatus;
  responsible: string;
}

export type UpdateTicketRequest = Partial<CreateTicketRequest>;

export interface ListTicketsResponse {
  data: Ticket[];
  total: number;
  listed: number;
}
