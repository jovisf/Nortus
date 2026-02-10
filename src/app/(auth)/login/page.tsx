'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/auth';
import { useRateLimit } from '@/hooks';
import { useRedirectIfAuthenticated } from '@/hooks/useProtectedRoute';
import { getLoginSchema, type LoginFormData } from '@/lib/validations/auth';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Headset, Eye, EyeOff } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

export default function LoginPage() {
    useRedirectIfAuthenticated('/chat');

    const tAuth = useTranslations('Auth.login');
    const tErr = useTranslations('Errors');
    const tCommon = useTranslations('Common');
    const tValidations = useTranslations('Validations');

    const router = useRouter();
    const loginMutation = useLogin();
    const { isBlocked, timeLeft, incrementAttempts, resetRateLimit } = useRateLimit('login', 5, 60000);

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
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

        if (isBlocked) {
            setGeneralError(tErr('blocked', { seconds: timeLeft }));
            return;
        }

        const validation = getLoginSchema(tValidations).safeParse(formData);

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
            resetRateLimit();
            router.push('/chat');
        } catch (error: any) {
            incrementAttempts();
            const errorMessage = error.response?.status === 401
                ? tErr('unauthorized')
                : error.response?.data?.message || tErr('serverError');
            setGeneralError(errorMessage);
        }
    };

    return (
        <>
            <h2 className="text-3xl font-semibold mb-3">Login</h2>
            <p className="text-text-secondary text-base mb-10">
                {tAuth('description')}
            </p>

            {generalError && (
                <div className="mb-6 p-4 bg-danger/10 border border-danger/20 rounded-xl">
                    <p className="text-sm text-danger">{generalError}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* User/Email Input */}
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
                    <p className="text-[11px] text-text-secondary px-1">
                        {tAuth('userHint')}
                    </p>
                    {errors.email && (
                        <p className="text-xs text-danger mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Password Input */}
                <div className="space-y-1.5 pt-2">
                    <div className="relative group">
                        <label className="absolute -top-3 left-4 bg-[var(--app-bg)] px-2 text-xs font-medium text-text-secondary group-focus-within:text-primary transition-colors">
                            {tAuth('passwordLabel')}*
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full bg-transparent border ${errors.password ? 'border-danger' : 'border-white/20'} group-focus-within:border-primary rounded-xl px-4 py-4 pr-12 text-white placeholder-white/20 outline-none transition-all`}
                            placeholder={tAuth('passwordPlaceholder')}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-danger mt-1 text-right">{errors.password}</p>
                    )}
                </div>

                {/* Actions area */}
                <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="checkbox"
                                className="peer appearance-none w-5 h-5 rounded border border-white/20 checked:border-primary checked:bg-primary transition-all cursor-pointer"
                            />
                            <svg
                                className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
                            {tAuth('rememberMe')}
                        </span>
                    </label>

                    <a
                        href="/forgot-password"
                        className="text-sm text-primary hover:text-primary-hover font-medium transition-colors"
                    >
                        {tAuth('forgotPassword')}
                    </a>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer"
                >
                    {loginMutation.isPending ? tAuth('signingIn') : tAuth('signIn')}
                </button>
            </form>
        </>
    );
}
