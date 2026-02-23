import { X } from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
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
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          >
            <m.div
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
                <h2 className="mb-2 text-[28px] font-bold text-white">
                  {tCommon('view')} Ticket
                </h2>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-white/60">#{ticket.ticketId}</span>
                  <Badge className={getStatusStyles(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-6">
                {/* Client Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/40">
                      {t('modal.clientLabel')}
                    </label>
                    <p className="truncate font-medium text-white">{ticket.client}</p>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/40">
                      {t('modal.emailLabel')}
                    </label>
                    <p className="truncate font-medium text-white">{ticket.email}</p>
                  </div>
                </div>

                {/* Priority & Responsible Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/40">
                      {t('modal.priorityLabel')}
                    </label>
                    <div className="mt-1">
                      <Badge className={getPriorityStyles(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-white/40">
                      {t('modal.responsibleLabel')}
                    </label>
                    <p className="truncate font-medium text-white">{ticket.responsible}</p>
                  </div>
                </div>

                {/* Subject */}
                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">
                    {t('modal.subjectLabel')}
                  </label>
                  <p className="text-sm leading-relaxed text-white/90">
                    {ticket.subject}
                  </p>
                </div>
              </div>
            </m.div>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
}
