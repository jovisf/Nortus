'use client';

import { ActionButtons } from './components/ActionButtons';
import { useTicketForm, useRateLimit } from '@/hooks';
import type { Ticket } from '@/types';
import { X } from 'lucide-react';
import { TextInput, TextAreaInput, SelectInput } from '@/components/ui';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

interface TicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticketToEdit?: Ticket | null;
}

export function TicketModal({ isOpen, onClose, ticketToEdit }: TicketModalProps) {
    const t = useTranslations('Tickets');
    const tCommon = useTranslations('Common');
    const tErr = useTranslations('Errors');

    const { isBlocked, timeLeft, incrementAttempts } = useRateLimit('tickets', 10, 60000);

    const priorityOptions = useMemo(() => [
        { label: t('priorities.low'), value: 'Baixa' },
        { label: t('priorities.medium'), value: 'Média' },
        { label: t('priorities.high'), value: 'Alta' },
        { label: t('priorities.urgent'), value: 'Urgente' },
    ], [t]);

    const {
        formData,
        errors,
        isPending,
        handleChange,
        handleSubmit: baseHandleSubmit
    } = useTicketForm({ ticketToEdit, isOpen, onClose });

    const handleSubmit = (e: React.FormEvent) => {
        if (isBlocked) {
            e.preventDefault();
            return;
        }
        incrementAttempts();
        baseHandleSubmit(e);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999] backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-background border border-white/5 rounded-[40px] shadow-2xl w-full max-w-[620px] overflow-hidden relative p-10"
                onClick={(e) => e.stopPropagation()}
            >
                {isBlocked && (
                    <div className="absolute top-0 left-0 right-0 p-4 bg-danger/10 border-b border-danger/20 z-10 text-center">
                        <p className="text-xs text-danger font-medium">
                            {tErr('blocked', { seconds: timeLeft })}
                        </p>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 w-11 h-11 flex items-center justify-center rounded-full border border-white text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                    <X size={20} />
                </button>

                <div className="mb-10">
                    <h2 className="text-[28px] font-bold text-white mb-4">
                        {ticketToEdit ? t('editTicket') : t('newTicket')}
                    </h2>
                    <p className="text-white/60 text-sm font-light">
                        {ticketToEdit
                            ? t('modal.editDescription')
                            : t('modal.createDescription')
                        }
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-2">
                    <TextInput
                        name="client"
                        label={t('modal.clientLabel')}
                        value={formData.client}
                        onChange={handleChange}
                        error={errors.client}
                        placeholder={t('modal.clientPlaceholder')}
                        maxLength={100}
                    />

                    <TextInput
                        name="email"
                        label={t('modal.emailLabel')}
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder={t('modal.emailPlaceholder')}
                    />

                    <SelectInput
                        name="priority"
                        label={t('modal.priorityLabel')}
                        value={formData.priority}
                        onChange={handleChange}
                        error={errors.priority}
                        options={priorityOptions}
                    />

                    <TextInput
                        name="responsible"
                        label={t('modal.responsibleLabel')}
                        value={formData.responsible}
                        onChange={handleChange}
                        error={errors.responsible}
                        placeholder={t('modal.responsiblePlaceholder')}
                        maxLength={50}
                    />

                    <TextAreaInput
                        name="subject"
                        label={t('modal.subjectLabel')}
                        value={formData.subject}
                        onChange={handleChange}
                        error={errors.subject}
                        placeholder={t('modal.subjectPlaceholder')}
                        maxLength={200}
                    />

                    <ActionButtons
                        onCancel={onClose}
                        isPending={isPending}
                        submitLabel={ticketToEdit ? tCommon('save') : tCommon('create')}
                    />
                </form>
            </div>
        </div>
    );
}
