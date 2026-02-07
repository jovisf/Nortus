export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex">
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
