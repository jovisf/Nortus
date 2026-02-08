export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: (id: string) => `/auth/forgot-password/${id}`,
} as const;

export const TICKET_ENDPOINTS = {
    LIST: '/tickets',
    CREATE: '/tickets',
    BY_ID: (id: string) => `/tickets/${id}`,
    UPDATE: (id: string) => `/tickets/${id}`,
    DELETE: (id: string) => `/tickets/${id}`,
} as const;
