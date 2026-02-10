'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/auth';
import { useRateLimit } from '@/hooks';
import { useRedirectIfAuthenticated } from '@/hooks/useProtectedRoute';
import { getLoginSchema, type LoginFormData } from '@/lib/validations/auth';
import { useTranslations } from 'next-intl';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  useRedirectIfAuthenticated('/dashboard');

  const tAuth = useTranslations('Auth.login');
  const tErr = useTranslations('Errors');
  const tValidations = useTranslations('Validations');

  const router = useRouter();
  const loginMutation = useLogin();
  const { isBlocked, timeLeft, incrementAttempts, resetRateLimit } =
    useRateLimit('login', 5, 60000);

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Trim spaces if the field is email
    const updatedValue = name === 'email' ? value.trim() : value;

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));

    if (errors[name as keyof LoginFormData]) {
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
      router.push('/dashboard');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      incrementAttempts();
      const errorMessage =
        error.response?.status === 401
          ? tErr('invalidCredentials')
          : error.response?.data?.message || tErr('serverError');
      setGeneralError(errorMessage);
    }
  };

  return (
    <>
      <h2 className="mb-3 text-3xl font-semibold">Login</h2>
      <p className="text-text-secondary mb-10 text-base">
        {tAuth('description')}
      </p>

      {generalError && (
        <div className="bg-danger/10 border-danger/20 mb-6 rounded-xl border p-4">
          <p className="text-danger text-sm">{generalError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* User/Email Input */}
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
          <p className="text-text-secondary px-1 text-[11px]">
            {tAuth('userHint')}
          </p>
          {errors.email && (
            <p className="text-danger mt-1 text-xs">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5 pt-2">
          <div className="group relative">
            <label className="text-text-secondary group-focus-within:text-primary absolute -top-3 left-4 bg-[var(--app-bg)] px-2 text-xs font-medium transition-colors">
              {tAuth('passwordLabel')}*
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border bg-transparent ${errors.password ? 'border-danger' : 'border-white/20'} group-focus-within:border-primary rounded-xl px-4 py-4 pr-12 text-white placeholder-white/20 transition-all outline-none`}
              placeholder={tAuth('passwordPlaceholder')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-text-secondary absolute top-1/2 right-4 -translate-y-1/2 transition-colors hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-danger mt-1 text-right text-xs">
              {errors.password}
            </p>
          )}
        </div>

        {/* Actions area */}
        <div className="flex items-center justify-between pt-2">
          <label className="group flex cursor-pointer items-center gap-3">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="peer checked:border-primary checked:bg-primary h-5 w-5 cursor-pointer appearance-none rounded border border-white/20 transition-all"
              />
              <svg
                className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <span className="text-text-secondary text-sm transition-colors group-hover:text-white">
              {tAuth('rememberMe')}
            </span>
          </label>

          <a
            href="/forgot-password"
            className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
          >
            {tAuth('forgotPassword')}
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-primary hover:bg-primary-hover shadow-primary/20 mt-4 w-full cursor-pointer rounded-xl py-4 font-semibold text-white shadow-lg transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loginMutation.isPending ? tAuth('signingIn') : tAuth('signIn')}
        </button>
      </form>
    </>
  );
}
