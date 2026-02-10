import { z } from 'zod';

type TranslateFn = (
  key: string,
  values?: Record<string, string | number | Date>
) => string;

export const getLoginSchema = (t: TranslateFn) =>
  z.object({
    email: z.string().min(1, t('email.required')).email(t('email.invalid')),
    password: z
      .string()
      .min(1, t('password.required'))
      .min(6, t('password.min', { min: 6 })),
  });

export const getForgotPasswordSchema = (t: TranslateFn) =>
  z.object({
    email: z.string().min(1, t('email.required')).email(t('email.invalid')),
  });

export const getResetPasswordSchema = (t: TranslateFn) =>
  z
    .object({
      code: z.string().min(1, t('required')),
      new_password: z
        .string()
        .min(1, t('password.required'))
        .min(6, t('password.min', { min: 6 })),
      confirm_password: z.string().min(1, t('required')),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: t('password.dontMatch'),
      path: ['confirm_password'],
    });

// For types, we can use a dummy schema or just keep using the same shape
export const baseLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type LoginFormData = z.infer<typeof baseLoginSchema>;

export const baseForgotPasswordSchema = z.object({
  email: z.string(),
});
export type ForgotPasswordFormData = z.infer<typeof baseForgotPasswordSchema>;

export const baseResetPasswordSchema = z.object({
  code: z.string(),
  new_password: z.string(),
  confirm_password: z.string(),
});
export type ResetPasswordFormData = z.infer<typeof baseResetPasswordSchema>;
