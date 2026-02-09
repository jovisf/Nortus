import { Sidebar, Header } from '@/components/shared';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-main-bg">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 h-screen" style={{ marginLeft: 'var(--sidebar-width)' }}>
                <Header />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
