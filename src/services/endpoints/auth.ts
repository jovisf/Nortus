import { api } from '@/lib/api';
import { AUTH_ENDPOINTS } from '@/constants/endpoints';
import type {
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
} from '@/types';

export const authService = {
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data);
        return response.data;
    },

    refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
        const response = await api.post<RefreshTokenResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, data);
        return response.data;
    },

    forgotPassword: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
        const response = await api.post<ForgotPasswordResponse>(AUTH_ENDPOINTS.FORGOT_PASSWORD, data);
        return response.data;
    },

    resetPassword: async (id: string, data: Omit<ResetPasswordRequest, 'id'>): Promise<ResetPasswordResponse> => {
        const response = await api.patch<ResetPasswordResponse>(AUTH_ENDPOINTS.RESET_PASSWORD(id), {
            id,
            ...data,
        });
        return response.data;
    },
};
