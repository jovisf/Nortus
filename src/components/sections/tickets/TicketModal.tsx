'use client';

import { useState, useEffect } from 'react';
import { useCreateTicket, useUpdateTicket } from '@/hooks';
import type { Ticket, TicketPriority, TicketStatus } from '@/types';

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketToEdit?: Ticket | null;
}

export function TicketModal({ isOpen, onClose, ticketToEdit }: TicketModalProps) {
    const { mutate: createTicket, isPending: isCreating } = useCreateTicket();
    const { mutate: updateTicket, isPending: isUpdating } = useUpdateTicket();

    const [formData, setFormData] = useState({
        ticketId: '',
        client: '',
        email: '',
        subject: '',
        responsible: '',
        priority: 'Média' as TicketPriority,
        status: 'Aberto' as TicketStatus,
    });

    useEffect(() => {
        if (ticketToEdit) {
            setFormData({
                ticketId: ticketToEdit.ticketId,
                client: ticketToEdit.client,
                email: ticketToEdit.email,
                subject: ticketToEdit.subject,
                responsible: ticketToEdit.responsible,
                priority: ticketToEdit.priority,
                status: ticketToEdit.status,
            });
        } else {
            setFormData({
                ticketId: `TK${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                client: '',
                email: '',
                subject: '',
                responsible: '',
                priority: 'Média',
                status: 'Aberto',
            });
        }
    }, [ticketToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (ticketToEdit) {
            updateTicket({ id: ticketToEdit.id, data: formData }, {
                onSuccess: () => onClose()
            });
        } else {
            createTicket(formData, {
                onSuccess: () => onClose()
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold">
                        {ticketToEdit ? 'Editar Ticket' : 'Novo Ticket'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700"></button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Responsável</label>
                        <input
                            type="text"
                            value={formData.responsible}
                            onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                            className="mt-1 block w-full border rounded p-2 text-sm"
                            placeholder="Nome do responsável"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome do cliente</label>
                            <input
                                type="text"
                                value={formData.client}
                                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                className="mt-1 block w-full border rounded p-2 text-sm"
                                placeholder="Nome do cliente"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full border rounded p-2 text-sm"
                                placeholder="email@exemplo.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Assunto</label>
                        <input
                            type="text"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="mt-1 block w-full border rounded p-2 text-sm"
                            placeholder="Assunto do ticket"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Prioridade</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TicketPriority })}
                                className="mt-1 block w-full border rounded p-2 text-sm"
                            >
                                <option value="Baixa">Baixa</option>
                                <option value="Média">Média</option>
                                <option value="Alta">Alta</option>
                                <option value="Urgente">Urgente</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as TicketStatus })}
                                className="mt-1 block w-full border rounded p-2 text-sm"
                            >
                                <option value="Aberto">Aberto</option>
                                <option value="Em andamento">Em andamento</option>
                                <option value="Fechado">Fechado</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3 justify-end border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded border"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating || isUpdating}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm disabled:opacity-50"
                        >
                            {(isCreating || isUpdating) ? 'Salvando...' : 'Salvar Ticket'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
