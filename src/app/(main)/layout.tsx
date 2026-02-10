import { Sidebar, Header } from '@/components/shared';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-app-bg flex min-h-screen">
      <Header />
      <Sidebar />
      <div
        className="flex h-screen min-w-0 flex-1 flex-col"
        style={{
          marginLeft: 'var(--sidebar-width)',
          paddingTop: 'var(--header-height)',
        }}
      >
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
