import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import { authService } from '@/services'
import type { LoginFormData } from '@/lib/validations/auth'
import type { User } from '@/types'

export function useLogin() {
    const { setUser } = useAuthStore()

    return useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await authService.login(data)
            return { response, email: data.email }
        },
        onSuccess: ({ response, email }) => {
            const userData: User = {
                id: '',
                name: '',
                email,
            }

            setUser(userData)
        },
    })
}

