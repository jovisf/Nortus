import { api } from '@/lib/api';
import { TICKET_ENDPOINTS } from '@/constants/endpoints';
import type {
    Ticket,
    CreateTicketRequest,
    UpdateTicketRequest,
    ListTicketsResponse,
} from '@/types';

export const ticketsService = {
    async list(): Promise<ListTicketsResponse> {
        const response = await api.get<ListTicketsResponse>(TICKET_ENDPOINTS.LIST);
        return response.data;
    },

    async getById(id: string): Promise<Ticket> {
        const response = await api.get<Ticket>(TICKET_ENDPOINTS.BY_ID(id));
        return response.data;
    },

    async create(data: CreateTicketRequest): Promise<Ticket> {
        const response = await api.post<Ticket>(TICKET_ENDPOINTS.CREATE, data);
        return response.data;
    },

    async update(id: string, data: UpdateTicketRequest): Promise<Ticket> {
        const response = await api.patch<Ticket>(TICKET_ENDPOINTS.UPDATE(id), data);
        return response.data;
    },

    async delete(id: string): Promise<void> {
        await api.delete(TICKET_ENDPOINTS.DELETE(id));
    },
};
