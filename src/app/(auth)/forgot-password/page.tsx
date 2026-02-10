'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForgotPassword } from '@/hooks/auth';
import { getForgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations/auth';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordPage() {
    const tAuth = useTranslations('Auth.forgotPassword');
    const tValidations = useTranslations('Validations');
    const tErr = useTranslations('Errors');
    const tCommon = useTranslations('Common');

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
        <>
            <h2 className="text-3xl font-semibold mb-3">{tAuth('title')}</h2>
            <p className="text-text-secondary text-base mb-10">
                {tAuth('description')}
            </p>

            {generalError && (
                <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-xl">
                    <p className="text-sm text-danger">{generalError}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-8">
                <div className="space-y-1.5">
                    <div className="relative group">
                        <label className="absolute -top-3 left-4 bg-[var(--app-bg)] px-2 text-xs font-medium text-text-secondary group-focus-within:text-primary transition-colors">
                            {tAuth('emailLabel')}*
                        </label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-transparent border ${errors.email ? 'border-danger' : 'border-white/20'} group-focus-within:border-primary rounded-xl px-4 py-4 text-white placeholder-white/20 outline-none transition-all`}
                            placeholder={tAuth('emailPlaceholder')}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-danger mt-1">{errors.email}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={forgotPasswordMutation.isPending}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
                >
                    {forgotPasswordMutation.isPending ? tCommon('loading') : tAuth('send')}
                </button>
            </form>

            <div className="mt-8 text-center">
                <a
                    href="/login"
                    className="text-sm text-primary hover:text-primary-hover font-medium transition-colors"
                >
                    {tAuth('backToLogin')}
                </a>
            </div>
        </>
    );
}
