import type { Ticket, TicketFilters } from '@/types';

export function extractDistinctResponsibles(tickets: Ticket[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const ticket of tickets) {
    if (!seen.has(ticket.responsible)) {
      seen.add(ticket.responsible);
      result.push(ticket.responsible);
    }
  }

  return result.sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

export function filterTickets(
  tickets: Ticket[],
  filters: TicketFilters
): Ticket[] {
  return tickets.filter((ticket) => {
    const searchLower = filters.search.toLowerCase().trim();
    if (searchLower) {
      const matchesSearch =
        ticket.ticketId.toLowerCase().includes(searchLower) ||
        ticket.client.toLowerCase().includes(searchLower) ||
        ticket.subject.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    if (filters.status !== 'all' && ticket.status !== filters.status) {
      return false;
    }

    if (filters.priority !== 'all' && ticket.priority !== filters.priority) {
      return false;
    }

    if (
      filters.responsible !== 'all' &&
      ticket.responsible !== filters.responsible
    ) {
      return false;
    }

    return true;
  });
}

export function paginateTickets(
  tickets: Ticket[],
  page: number,
  pageSize: number
): {
  items: Ticket[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
} {
  const totalItems = tickets.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = tickets.slice(startIndex, endIndex);

  return {
    items,
    totalPages,
    totalItems,
    currentPage: page,
  };
}
