import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat | Nortus',
  description:
    'Interaja com o assistente de IA da Nortus para obter suporte e informações em tempo real.',
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
