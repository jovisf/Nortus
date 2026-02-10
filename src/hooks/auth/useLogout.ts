import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services';

export function useLogout() {
  const { clearUser } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      authService.logout();
    },
    onSuccess: () => {
      clearUser();
    },
  });
}
