import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simulador | Nortus',
  description:
    'Simule planos de seguro e calcule coberturas personalizadas para seus clientes no Nortus.',
};

export default function SimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
