import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services'
import { getCookie, COOKIE_NAMES } from '@/lib/cookies'

export function useRefreshToken() {
    return useMutation({
        mutationFn: async () => {
            const token = getCookie(COOKIE_NAMES.AUTH_TOKEN)
            if (!token) throw new Error('No token available')

            const response = await authService.refreshToken({ access_token: token })
            return response
        },
    })
}

