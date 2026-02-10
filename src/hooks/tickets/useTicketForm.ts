import { useState, useEffect } from 'react';
import { useCreateTicket, useUpdateTicket } from '@/hooks';
import type { Ticket, TicketPriority, TicketStatus } from '@/types';
import { ticketSchema, type TicketFormData } from '@/lib/validations/tickets';

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
      // eslint-disable-next-line
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

    const validation = ticketSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof TicketFormData, string>> = {};
      validation.error.errors.forEach((error) => {
        const field = error.path[0] as keyof TicketFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const submitData = {
      ...formData,
      status,
      ticketId:
        ticketToEdit?.ticketId ||
        `TK${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, '0')}`,
    };

    if (ticketToEdit) {
      updateTicket(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { id: ticketToEdit.id, data: submitData as any },
        {
          onSuccess: () => onClose(),
        }
      );
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createTicket(submitData as any, {
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
