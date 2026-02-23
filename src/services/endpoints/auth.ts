import { api } from '@/lib/api';
import {
  setCookie,
  deleteCookie,
  getCookie,
  COOKIE_NAMES,
} from '@/lib/cookies';
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
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data);
    setCookie(COOKIE_NAMES.AUTH_TOKEN, response.data.access_token);
    return response.data;
  },

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await api.post<RefreshTokenResponse>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      data
    );

    if (response.data.access_token) {
      setCookie(COOKIE_NAMES.AUTH_TOKEN, response.data.access_token);
    }

    return response.data;
  },

  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    const response = await api.post<ForgotPasswordResponse>(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      data
    );
    return response.data;
  },

  async resetPassword(
    id: string,
    data: Omit<ResetPasswordRequest, 'id'>
  ): Promise<ResetPasswordResponse> {
    const response = await api.patch<ResetPasswordResponse>(
      AUTH_ENDPOINTS.RESET_PASSWORD(id),
      {
        id,
        ...data,
      }
    );

    if (response.data.access_token) {
      setCookie(COOKIE_NAMES.AUTH_TOKEN, response.data.access_token);
    }

    return response.data;
  },

  logout(): void {
    deleteCookie(COOKIE_NAMES.AUTH_TOKEN);
  },

  isAuthenticated(): boolean {
    return !!getCookie(COOKIE_NAMES.AUTH_TOKEN);
  },
};
