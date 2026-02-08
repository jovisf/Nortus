import axios from 'axios'
import { getCookie, COOKIE_NAMES } from '@/lib/cookies'
import { handleApiError } from './apiErrorHandler'

const API_BASE_URL = 'https://nortus-challenge.api.stage.loomi.com.br'

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        const token = getCookie(COOKIE_NAMES.AUTH_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        handleApiError(error)
        return Promise.reject(error)
    }
)

export default api

