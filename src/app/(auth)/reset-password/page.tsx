'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useResetPassword } from '@/hooks/auth';
import { useRateLimit } from '@/hooks';
import {
  getResetPasswordSchema,
  type ResetPasswordFormData,
} from '@/lib/validations/auth';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from 'lucide-react';

function ResetPasswordForm() {
  const tAuth = useTranslations('Auth.resetPassword');
  const tAuthLogin = useTranslations('Auth.login');
  const tValidations = useTranslations('Validations');
  const tErr = useTranslations('Errors');
  const tCommon = useTranslations('Common');

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const resetPasswordMutation = useResetPassword();
  const { isBlocked, timeLeft, incrementAttempts, resetRateLimit } =
    useRateLimit('reset-password', 3, 120000);

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    code: '',
    new_password: '',
    confirm_password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ResetPasswordFormData, string>>
  >({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  if (!id) {
    return (
      <div className="bg-danger/10 border-danger/20 rounded-xl border p-6 text-center">
        <p className="text-danger mb-4">{tErr('unexpected')}</p>
        <a
          href="/login"
          className="text-primary hover:text-primary-hover font-medium underline"
        >
          {tAuthLogin('signIn')}
        </a>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ResetPasswordFormData]) {
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

    const validation = getResetPasswordSchema(tValidations).safeParse(formData);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof ResetPasswordFormData, string>> =
        {};
      validation.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ResetPasswordFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirm_password, ...payload } = formData;

      await resetPasswordMutation.mutateAsync({
        id,
        data: payload,
      });

      resetRateLimit();
      router.push('/chat');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      incrementAttempts();
      const errorMessage = error.response?.data?.message || tErr('serverError');
      setGeneralError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {generalError && (
        <div className="bg-danger/10 border-danger/20 rounded-xl border p-4">
          <p className="text-danger text-sm">{generalError}</p>
        </div>
      )}

      {/* Verification Code */}
      <div className="space-y-1.5 pt-2">
        <div className="group relative">
          <label className="text-text-secondary group-focus-within:text-primary absolute -top-3 left-4 bg-[var(--app-bg)] px-2 text-xs font-medium transition-colors">
            {tAuth('codeLabel')}*
          </label>
          <input
            name="code"
            type="text"
            value={formData.code}
            onChange={handleChange}
            className={`w-full border bg-transparent ${errors.code ? 'border-danger' : 'border-white/20'} group-focus-within:border-primary rounded-xl px-4 py-4 text-white placeholder-white/20 transition-all outline-none`}
            placeholder={tAuth('codePlaceholder')}
            disabled={resetPasswordMutation.isPending}
          />
        </div>
        {errors.code && (
          <p className="text-danger mt-1 text-xs">{errors.code}</p>
        )}
      </div>

      {/* New Password */}
      <div className="space-y-1.5 pt-2">
        <div className="group relative">
          <label className="text-text-secondary group-focus-within:text-primary absolute -top-3 left-4 bg-[var(--app-bg)] px-2 text-xs font-medium transition-colors">
            {tAuth('newPassword')}*
          </label>
          <input
            name="new_password"
            type={showPassword ? 'text' : 'password'}
            value={formData.new_password}
            onChange={handleChange}
            className={`w-full border bg-transparent ${errors.new_password ? 'border-danger' : 'border-white/20'} group-focus-within:border-primary rounded-xl px-4 py-4 pr-12 text-white transition-all outline-none`}
            placeholder={tAuth('newPassword')}
            disabled={resetPasswordMutation.isPending}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-text-secondary absolute top-1/2 right-4 -translate-y-1/2 transition-colors hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.new_password && (
          <p className="text-danger mt-1 text-xs">{errors.new_password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5 pt-2">
        <div className="group relative">
          <label className="text-text-secondary group-focus-within:text-primary absolute -top-3 left-4 bg-[var(--app-bg)] px-2 text-xs font-medium transition-colors">
            {tAuth('confirmPassword')}*
          </label>
          <input
            name="confirm_password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirm_password}
            onChange={handleChange}
            className={`w-full border bg-transparent ${errors.confirm_password ? 'border-danger' : 'border-white/20'} group-focus-within:border-primary rounded-xl px-4 py-4 pr-12 text-white transition-all outline-none`}
            placeholder={tAuth('confirmPassword')}
            disabled={resetPasswordMutation.isPending}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-text-secondary absolute top-1/2 right-4 -translate-y-1/2 transition-colors hover:text-white"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirm_password && (
          <p className="text-danger mt-1 text-xs">{errors.confirm_password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={resetPasswordMutation.isPending}
        className="bg-primary hover:bg-primary-hover shadow-primary/20 mt-4 w-full cursor-pointer rounded-xl py-4 font-semibold text-white shadow-lg transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {resetPasswordMutation.isPending ? tCommon('loading') : tAuth('submit')}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  const tAuth = useTranslations('Auth.resetPassword');
  const tAuthLogin = useTranslations('Auth.login');

  return (
    <>
      <h2 className="mb-3 text-3xl font-semibold">{tAuth('title')}</h2>
      <p className="text-text-secondary mb-10 text-base">
        {tAuth('description')}
      </p>

      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>

      <div className="mt-8 text-center">
        <a
          href="/login"
          className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
        >
          {tAuthLogin('backToLogin')}
        </a>
      </div>
    </>
  );
}
