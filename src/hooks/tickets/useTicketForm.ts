import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCreateTicket, useUpdateTicket } from '@/hooks';
import type { Ticket, TicketPriority, TicketStatus, CreateTicketRequest } from '@/types';
import { getTicketSchema, type TicketFormData } from '@/lib/validations/tickets';

interface UseTicketFormProps {
  ticketToEdit?: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

export function useTicketForm({
  ticketToEdit,
  isOpen,
  onClose,
}: UseTicketFormProps) {
  const t = useTranslations('Validations');
  const { mutate: createTicket, isPending: isCreating } = useCreateTicket();
  const { mutate: updateTicket, isPending: isUpdating } = useUpdateTicket();

  const [formData, setFormData] = useState<TicketFormData>({
    client: '',
    email: '',
    subject: '',
    responsible: '',
    priority: 'Média' as TicketPriority,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TicketFormData, string>>
  >({});
  const [status, setStatus] = useState<TicketStatus>('Aberto');

  useEffect(() => {
    if (ticketToEdit) {
      setFormData({
        client: ticketToEdit.client,
        email: ticketToEdit.email,
        subject: ticketToEdit.subject,
        responsible: ticketToEdit.responsible,
        priority: ticketToEdit.priority,
      });
      setStatus(ticketToEdit.status);
    } else {
      setFormData({
        client: '',
        email: '',
        subject: '',
        responsible: '',
        priority: 'Média',
      });
      setStatus('Aberto');
    }
    setErrors({});
  }, [ticketToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof TicketFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = getTicketSchema(t).safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof TicketFormData, string>> = {};
      validation.error.errors.forEach((error) => {
        const field = error.path[0] as keyof TicketFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const submitData: CreateTicketRequest = {
      ...validation.data,
      status,
      ticketId:
        ticketToEdit?.ticketId ??
        `TK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    };

    if (ticketToEdit) {
      updateTicket(
        { id: ticketToEdit.id, data: submitData },
        { onSuccess: () => onClose() }
      );
    } else {
      createTicket(submitData, {
        onSuccess: () => onClose(),
      });
    }
  };

  const isDirty = (() => {
    if (!ticketToEdit) {
      return true;
    }

    return (
      formData.client !== ticketToEdit.client ||
      formData.email !== ticketToEdit.email ||
      formData.subject !== ticketToEdit.subject ||
      formData.responsible !== ticketToEdit.responsible ||
      formData.priority !== ticketToEdit.priority ||
      status !== ticketToEdit.status
    );
  })();

  return {
    formData,
    errors,
    status,
    isPending: isCreating || isUpdating,
    isDirty,
    handleChange,
    handleSubmit,
  };
}
