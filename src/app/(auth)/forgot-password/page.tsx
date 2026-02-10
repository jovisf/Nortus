'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForgotPassword } from '@/hooks/auth';
import { getForgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations/auth';
import { EmailInput } from '@/components/auth/EmailInput';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordPage() {
    const tAuth = useTranslations('Auth.forgotPassword');
    const tValidations = useTranslations('Validations');
    const tErr = useTranslations('Errors');

    const router = useRouter();
    const forgotPasswordMutation = useForgotPassword();

    const [formData, setFormData] = useState<ForgotPasswordFormData>({
        email: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ForgotPasswordFormData, string>>>({});
    const [generalError, setGeneralError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof ForgotPasswordFormData]) {
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

        const validation = getForgotPasswordSchema(tValidations).safeParse(formData);

        if (!validation.success) {
            const fieldErrors: Partial<Record<keyof ForgotPasswordFormData, string>> = {};
            validation.error.errors.forEach((error) => {
                const field = error.path[0] as keyof ForgotPasswordFormData;
                fieldErrors[field] = error.message;
            });
            setErrors(fieldErrors);
            return;
        }

        try {
            const response = await forgotPasswordMutation.mutateAsync(formData);
            router.push(`/reset-password?id=${response.id}`);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || tErr('serverError');
            setGeneralError(errorMessage);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold text-center mb-6">{tAuth('title')}</h1>

                    <p className="text-gray-600 text-center mb-8">
                        {tAuth('description')}
                    </p>

                    {generalError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{generalError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <EmailInput
                            name="email"
                            label={tAuth('emailLabel')}
                            placeholder={tAuth('emailPlaceholder')}
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            disabled={forgotPasswordMutation.isPending}
                            autoComplete="email"
                        />

                        <button
                            type="submit"
                            disabled={forgotPasswordMutation.isPending}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {forgotPasswordMutation.isPending ? tErr('loading') : tAuth('send')}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a
                            href="/login"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            {tAuth('backToLogin')}
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
