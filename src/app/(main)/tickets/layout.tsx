import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tickets | Nortus',
  description:
    'Gerencie e acompanhe todos os tickets de suporte ao cliente no sistema Nortus.',
};

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
