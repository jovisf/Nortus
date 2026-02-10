'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForgotPassword } from '@/hooks/auth';
import { useRateLimit } from '@/hooks';
import {
  getForgotPasswordSchema,
  type ForgotPasswordFormData,
} from '@/lib/validations/auth';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordPage() {
  const tAuth = useTranslations('Auth.forgotPassword');
  const tValidations = useTranslations('Validations');
  const tErr = useTranslations('Errors');
  const tCommon = useTranslations('Common');

  const router = useRouter();
  const forgotPasswordMutation = useForgotPassword();
  const { isBlocked, timeLeft, incrementAttempts, resetRateLimit } =
    useRateLimit('forgot-password', 3, 120000); // Only 3 attempts for forgot password, 2 min cooldown

  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ForgotPasswordFormData, string>>
  >({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ForgotPasswordFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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

    const validation =
      getForgotPasswordSchema(tValidations).safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof ForgotPasswordFormData, string>> =
        {};
      validation.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ForgotPasswordFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const response = await forgotPasswordMutation.mutateAsync(formData);
      resetRateLimit();
      router.push(`/reset-password?id=${response.id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      incrementAttempts();
      const errorMessage = error.response?.data?.message || tErr('serverError');
      setGeneralError(errorMessage);
    }
  };

  return (
    <>
      <h2 className="mb-3 text-3xl font-semibold">{tAuth('title')}</h2>
      <p className="text-text-secondary mb-10 text-base">
        {tAuth('description')}
      </p>

      {generalError && (
        <div className="bg-danger/10 border-danger/20 mb-6 rounded-xl border p-4">
          <p className="text-danger text-sm">{generalError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <div className="space-y-1.5">
          <div className="group relative">
            <label className="text-text-secondary group-focus-within:text-primary absolute -top-3 left-4 bg-[var(--app-bg)] px-2 text-xs font-medium transition-colors">
              {tAuth('emailLabel')}*
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border bg-transparent ${errors.email ? 'border-danger' : 'border-white/20'} group-focus-within:border-primary rounded-xl px-4 py-4 text-white placeholder-white/20 transition-all outline-none`}
              placeholder={tAuth('emailPlaceholder')}
            />
          </div>
          {errors.email && (
            <p className="text-danger mt-1 text-xs">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={forgotPasswordMutation.isPending}
          className="bg-primary hover:bg-primary-hover shadow-primary/20 mt-4 w-full cursor-pointer rounded-xl py-4 font-semibold text-white shadow-lg transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {forgotPasswordMutation.isPending
            ? tCommon('loading')
            : tAuth('send')}
        </button>
      </form>

      <div className="mt-8 text-center">
        <a
          href="/login"
          className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
        >
          {tAuth('backToLogin')}
        </a>
      </div>
    </>
  );
}
