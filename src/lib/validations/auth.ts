import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'E-mail é obrigatório')
        .email('E-mail inválido'),
    password: z
        .string()
        .min(1, 'Senha é obrigatória')
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, 'E-mail é obrigatório')
        .email('E-mail inválido'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
    code: z
        .string()
        .min(1, 'Código é obrigatório'),
    new_password: z
        .string()
        .min(1, 'Nova senha é obrigatória')
        .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirm_password: z
        .string()
        .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.new_password === data.confirm_password, {
    message: 'As senhas não coincidem',
    path: ['confirm_password'],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
