'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/auth';
import { useRedirectIfAuthenticated } from '@/hooks/useProtectedRoute';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import { EmailInput } from '@/components/auth/EmailInput';
import { PasswordInput } from '@/components/auth/PasswordInput';

export default function LoginPage() {
    useRedirectIfAuthenticated('/chat');

    const router = useRouter();
    const loginMutation = useLogin();

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
    const [generalError, setGeneralError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof LoginFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        if (generalError) {
            setGeneralError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setGeneralError(null);

        const validation = loginSchema.safeParse(formData);

        if (!validation.success) {
            const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
            validation.error.errors.forEach((error) => {
                const field = error.path[0] as keyof LoginFormData;
                fieldErrors[field] = error.message;
            });
            setErrors(fieldErrors);
            return;
        }

        try {
            await loginMutation.mutateAsync(formData);
            router.push('/chat');
        } catch (error: any) {
            const errorMessage = error.response?.status === 401
                ? 'E-mail ou senha incorretos'
                : error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
            setGeneralError(errorMessage);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

                    {generalError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{generalError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        <EmailInput
                            name="email"
                            label="E-mail"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            disabled={loginMutation.isPending}
                            autoComplete="email"
                        />

                        <PasswordInput
                            name="password"
                            label="Senha"
                            placeholder="Digite sua senha"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            disabled={loginMutation.isPending}
                            autoComplete="current-password"
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
                            </label>

                            <a
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-700"
                            >
                                Esqueceu a senha?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Não tem uma conta?{' '}
                            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                Cadastre-se
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
