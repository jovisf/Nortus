'use client';

import { useLogout } from '@/hooks/auth';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export function LogoutButton({ className = '', children }: LogoutButtonProps) {
    const logoutMutation = useLogout();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
        >
            {logoutMutation.isPending ? 'Saindo...' : children || 'Sair'}
        </button>
    );
}
