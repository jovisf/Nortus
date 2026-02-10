'use client';

import { ActionButtons } from './components/ActionButtons';
import { useTicketForm } from '@/hooks';
import type { Ticket } from '@/types';
import { X } from 'lucide-react';
import { TextInput, TextAreaInput, SelectInput } from '@/components/ui';
import { PRIORITY_OPTIONS } from '@/constants/tickets';

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketToEdit?: Ticket | null;
}

export function TicketModal({ isOpen, onClose, ticketToEdit }: TicketModalProps) {
    const {
        formData,
        errors,
        isPending,
        handleChange,
        handleSubmit
    } = useTicketForm({ ticketToEdit, isOpen, onClose });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999] backdrop-blur-sm">
            <div className="bg-[#0B1125] border border-white/5 rounded-[40px] shadow-2xl w-full max-w-[620px] overflow-hidden relative p-10">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 w-11 h-11 flex items-center justify-center rounded-full border border-white text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                    <X size={20} color="white" />
                </button>

                <div className="mb-10">
                    <h2 className="text-[28px] font-bold text-white mb-4">
                        {ticketToEdit ? 'Editar Ticket' : 'Novo Ticket'}
                    </h2>
                    <p className="text-white/60 text-sm font-light">
                        {ticketToEdit
                            ? 'Atualize os dados abaixo para modificar o ticket na plataforma.'
                            : 'Preencha os dados abaixo para registrar um novo ticket na plataforma.'
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-2">
                    <TextInput
                        name="client"
                        label="Nome do cliente"
                        value={formData.client}
                        onChange={handleChange}
                        error={errors.client}
                        placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
                        maxLength={100}
                    />

                    <TextInput
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="E-mail de contato para atualizações e resposta"
                    />

                    <SelectInput
                        name="priority"
                        label="Prioridade"
                        value={formData.priority}
                        onChange={handleChange}
                        error={errors.priority}
                        options={PRIORITY_OPTIONS}
                    />

                    <TextInput
                        name="responsible"
                        label="Responsável"
                        value={formData.responsible}
                        onChange={handleChange}
                        error={errors.responsible}
                        placeholder="Quem será o responsável"
                        maxLength={50}
                    />

                    <TextAreaInput
                        name="subject"
                        label="Assunto"
                        value={formData.subject}
                        onChange={handleChange}
                        error={errors.subject}
                        placeholder="Resumo breve do problema ou solicitação"
                        maxLength={200}
                    />

                    <ActionButtons
                        onCancel={onClose}
                        isPending={isPending}
                        submitLabel={ticketToEdit ? 'Salvar' : 'Criar'}
                    />
                </form>
            </div>
        </div>
    );
}
