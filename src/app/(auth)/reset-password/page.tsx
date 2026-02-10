'use client';

import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPassword } from '@/hooks/auth';
import { getResetPasswordSchema, type ResetPasswordFormData } from '@/lib/validations/auth';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { useTranslations } from 'next-intl';

function ResetPasswordForm() {
    const tAuth = useTranslations('Auth.resetPassword');
    const tValidations = useTranslations('Validations');
    const tErr = useTranslations('Errors');
    const tCommon = useTranslations('Common');

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const resetPasswordMutation = useResetPassword();

    const [formData, setFormData] = useState<ResetPasswordFormData>({
        code: '',
        new_password: '',
        confirm_password: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof ResetPasswordFormData, string>>>({});
    const [generalError, setGeneralError] = useState<string | null>(null);

    if (!id) {
        return (
            <div className="text-center">
                <p className="text-red-600 mb-4">{tErr('unexpected')}</p>
                <a href="/forgot-password" className="text-blue-600 hover:underline">
                    {tAuth('title')}
                </a>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof ResetPasswordFormData]) {
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

        const validation = getResetPasswordSchema(tValidations).safeParse(formData);

        if (!validation.success) {
            const fieldErrors: Partial<Record<keyof ResetPasswordFormData, string>> = {};
            validation.error.errors.forEach((error) => {
                const field = error.path[0] as keyof ResetPasswordFormData;
                fieldErrors[field] = error.message;
            });
            setErrors(fieldErrors);
            return;
        }

        try {
            const { confirm_password, ...payload } = formData;

            await resetPasswordMutation.mutateAsync({
                id,
                data: payload,
            });

            router.push('/chat');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || tErr('serverError');
            setGeneralError(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {generalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{generalError}</p>
                </div>
            )}

            <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                    {tCommon('id')}
                </label>
                <input
                    id="code"
                    name="code"
                    type="text"
                    value={formData.code}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${errors.code ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder={tCommon('search')}
                    disabled={resetPasswordMutation.isPending}
                />
                {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
            </div>

            <PasswordInput
                name="new_password"
                label={tAuth('newPassword')}
                placeholder={tAuth('newPassword')}
                value={formData.new_password}
                onChange={handleChange}
                error={errors.new_password}
                disabled={resetPasswordMutation.isPending}
            />

            <PasswordInput
                name="confirm_password"
                label={tAuth('confirmPassword')}
                placeholder={tAuth('confirmPassword')}
                value={formData.confirm_password}
                onChange={handleChange}
                error={errors.confirm_password}
                disabled={resetPasswordMutation.isPending}
            />

            <button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
            >
                {resetPasswordMutation.isPending ? tCommon('loading') : tAuth('submit')}
            </button>
        </form>
    );
}

export default function ResetPasswordPage() {
    const tAuth = useTranslations('Auth.resetPassword');
    const tAuthLogin = useTranslations('Auth.login');
    const tCommon = useTranslations('Common');

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-2xl font-bold text-center mb-6">{tAuth('title')}</h1>
                    <p className="text-gray-600 text-center mb-8">
                        {tAuth('title')}
                    </p>

                    <Suspense fallback={<div className="text-center">{tCommon('loading')}</div>}>
                        <ResetPasswordForm />
                    </Suspense>

                    <div className="mt-8 text-center">
                        <a
                            href="/login"
                            className="text-sm text-gray-600 hover:text-blue-600 font-medium"
                        >
                            {tAuthLogin('backToLogin')}
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
