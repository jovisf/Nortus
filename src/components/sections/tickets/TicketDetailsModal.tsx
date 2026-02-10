'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Ticket } from '@/types';
import { getPriorityStyles, getStatusStyles } from '@/constants/tickets';
import { Badge } from '@/components/ui';

interface TicketDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: Ticket | null;
}

export function TicketDetailsModal({
    isOpen,
    onClose,
    ticket,
}: TicketDetailsModalProps) {
    const t = useTranslations('Tickets');
    const tCommon = useTranslations('Common');

    if (!ticket) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="bg-background relative w-full max-w-[620px] overflow-hidden rounded-[40px] border border-white/5 p-10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white text-white transition-all hover:bg-white/10"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-[28px] font-bold text-white mb-2">
                                {tCommon('view')} Ticket
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className="text-white/60 font-mono">#{ticket.ticketId}</span>
                                <Badge className={getStatusStyles(ticket.status)}>
                                    {ticket.status}
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Client Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                                    <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">
                                        {t('modal.clientLabel')}
                                    </label>
                                    <p className="text-white font-medium truncate">{ticket.client}</p>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                                    <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">
                                        {t('modal.emailLabel')}
                                    </label>
                                    <p className="text-white font-medium truncate">{ticket.email}</p>
                                </div>
                            </div>

                            {/* Priority & Responsible Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                                    <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">
                                        {t('modal.priorityLabel')}
                                    </label>
                                    <div className="mt-1">
                                        <Badge className={getPriorityStyles(ticket.priority)}>
                                            {ticket.priority}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                                    <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">
                                        {t('modal.responsibleLabel')}
                                    </label>
                                    <p className="text-white font-medium truncate">{ticket.responsible}</p>
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="rounded-2xl bg-white/5 p-5 border border-white/5">
                                <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider">
                                    {t('modal.subjectLabel')}
                                </label>
                                <p className="text-white/90 leading-relaxed text-sm">
                                    {ticket.subject}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
