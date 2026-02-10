import { create } from 'zustand';
import type { Ticket } from '@/types';

interface TicketState {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  isLoading: boolean;
  error: string | null;
}

interface TicketActions {
  setTickets: (tickets: Ticket[]) => void;
  setSelectedTicket: (ticket: Ticket | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicketInList: (ticket: Ticket) => void;
  removeTicketFromList: (id: string) => void;
  reset: () => void;
}

type TicketStore = TicketState & TicketActions;

const initialState: TicketState = {
  tickets: [],
  selectedTicket: null,
  isLoading: false,
  error: null,
};

export const useTicketStore = create<TicketStore>((set) => ({
  ...initialState,

  setTickets: (tickets) => set({ tickets }),
  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  addTicket: (ticket) =>
    set((state) => ({ tickets: [ticket, ...state.tickets] })),
  updateTicketInList: (ticket) =>
    set((state) => ({
      tickets: state.tickets.map((t) => (t.id === ticket.id ? ticket : t)),
      selectedTicket:
        state.selectedTicket?.id === ticket.id ? ticket : state.selectedTicket,
    })),
  removeTicketFromList: (id) =>
    set((state) => ({
      tickets: state.tickets.filter((t) => t.id !== id),
      selectedTicket:
        state.selectedTicket?.id === id ? null : state.selectedTicket,
    })),
  reset: () => set(initialState),
}));
