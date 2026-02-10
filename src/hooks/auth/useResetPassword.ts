import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services';
import type { ResetPasswordFormData } from '@/lib/validations/auth';
import type { User } from '@/types';

export function useResetPassword() {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Omit<ResetPasswordFormData, 'confirm_password'>;
    }) => authService.resetPassword(id, data),
    onSuccess: (response) => {
      if (response.access_token) {
        const userData: User = {
          id: '',
          name: '',
          email: '',
        };

        setUser(userData);
      }
    },
  });
}
