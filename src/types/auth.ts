export interface User {
    id?: string;
    name?: string;
    email: string;
}

export type EmailRequest = {
    email: string;
};

export type TokenData = {
    access_token: string;
};

export type IdData = {
    id: string;
};

export interface LoginRequest extends EmailRequest {
    password: string;
}

export type RefreshTokenRequest = TokenData;

export type ForgotPasswordRequest = EmailRequest;

export interface ResetPasswordRequest extends IdData {
    code: string;
    new_password: string;
}

export type LoginResponse = TokenData;

export type RefreshTokenResponse = TokenData;

export type ForgotPasswordResponse = IdData;

export interface ResetPasswordResponse extends TokenData {
    state: 'PENDING' | 'COMPLETED';
}

export interface AuthOperationResult {
    success: boolean;
    error?: string;
}

export interface AuthOperationResultWithData<T> extends AuthOperationResult {
    data?: T;
}
