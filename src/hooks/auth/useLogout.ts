import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();
  const { clearUser } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      authService.logout();
    },
    onSuccess: () => {
      clearUser();
      router.replace('/login');
    },
  });
}
