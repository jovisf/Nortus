import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services';
import type { ForgotPasswordFormData } from '@/lib/validations/auth';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordFormData) =>
      authService.forgotPassword(data),
  });
}
