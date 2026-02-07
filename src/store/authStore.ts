import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import type { User } from '@/types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
    getToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user) => set({ user, isAuthenticated: !!user }),

            setToken: (token) => {
                if (token) {
                    Cookies.set('auth_token', token, {
                        expires: 7, // 7 dias
                        sameSite: 'strict',
                        secure: process.env.NODE_ENV === 'production'
                    });
                } else {
                    Cookies.remove('auth_token');
                }
            },

            login: (user, token) => {
                set({ user, isAuthenticated: true });
                get().setToken(token);
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
                get().setToken(null);
            },

            getToken: () => {
                return Cookies.get('auth_token') || null;
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        })
);
