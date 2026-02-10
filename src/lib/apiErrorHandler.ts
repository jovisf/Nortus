import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { handleUnauthorizedError } from './authErrorHandler';
import type { ApiError, ApiErrorResponse, ErrorHandlerOptions } from '@/types/api';
import { ErrorCategory, HttpStatus } from '@/types/api';

export function getErrorCategory(statusCode?: number): ErrorCategory {
    if (!statusCode) return ErrorCategory.UNKNOWN;

    switch (statusCode) {
        case HttpStatus.UNAUTHORIZED:
            return ErrorCategory.AUTHENTICATION;
        case HttpStatus.FORBIDDEN:
            return ErrorCategory.AUTHORIZATION;
        case HttpStatus.BAD_REQUEST:
        case HttpStatus.UNPROCESSABLE_ENTITY:
            return ErrorCategory.VALIDATION;
        case HttpStatus.NOT_FOUND:
            return ErrorCategory.NOT_FOUND;
        case HttpStatus.TOO_MANY_REQUESTS:
            return ErrorCategory.RATE_LIMIT;
        case HttpStatus.INTERNAL_SERVER_ERROR:
        case HttpStatus.BAD_GATEWAY:
        case HttpStatus.SERVICE_UNAVAILABLE:
        case HttpStatus.GATEWAY_TIMEOUT:
            return ErrorCategory.SERVER_ERROR;
        default:
            return ErrorCategory.UNKNOWN;
    }
}

export function getErrorMessage(error: ApiError): string {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.code === 'ECONNABORTED') {
        return 'A requisição demorou muito tempo. Tente novamente.';
    }

    if (error.code === 'ERR_NETWORK') {
        return 'Erro de conexão. Verifique sua internet.';
    }

    const statusCode = error.response?.status;

    switch (statusCode) {
        case HttpStatus.BAD_REQUEST:
            return 'Requisição inválida. Verifique os dados enviados.';
        case HttpStatus.UNAUTHORIZED:
            return 'Sessão expirada. Faça login novamente.';
        case HttpStatus.FORBIDDEN:
            return 'Você não tem permissão para realizar esta ação.';
        case HttpStatus.NOT_FOUND:
            return 'Recurso não encontrado.';
        case HttpStatus.CONFLICT:
            return 'Este recurso já existe ou está em conflito.';
        case HttpStatus.UNPROCESSABLE_ENTITY:
            return 'Dados inválidos. Verifique os campos.';
        case HttpStatus.TOO_MANY_REQUESTS:
            return 'Muitas requisições. Aguarde um momento.';
        case HttpStatus.INTERNAL_SERVER_ERROR:
            return 'Erro no servidor. Tente novamente mais tarde.';
        case HttpStatus.BAD_GATEWAY:
        case HttpStatus.SERVICE_UNAVAILABLE:
            return 'Serviço temporariamente indisponível.';
        case HttpStatus.GATEWAY_TIMEOUT:
            return 'Tempo de resposta excedido. Tente novamente.';
        default:
            return 'Ocorreu um erro inesperado. Tente novamente.';
    }
}

export function getValidationErrors(error: ApiError): Record<string, string[]> | null {
    const details = error.response?.data?.details;

    if (!details || typeof details !== 'object') {
        return null;
    }

    if (Array.isArray(Object.values(details)[0])) {
        return details as Record<string, string[]>;
    }

    const normalized: Record<string, string[]> = {};
    for (const [field, message] of Object.entries(details)) {
        normalized[field] = [String(message)];
    }
    return normalized;
}

export function isNetworkError(error: ApiError): boolean {
    return !error.response && Boolean(error.request);
}

export function isTimeoutError(error: ApiError): boolean {
    return error.code === 'ECONNABORTED';
}

export function isServerError(error: ApiError): boolean {
    const status = error.response?.status;
    return status ? status >= 500 && status < 600 : false;
}

export function isClientError(error: ApiError): boolean {
    const status = error.response?.status;
    return status ? status >= 400 && status < 500 : false;
}

function logError(error: ApiError, context?: Record<string, any>): void {
    const errorInfo = {
        message: getErrorMessage(error),
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        category: getErrorCategory(error.response?.status),
        timestamp: new Date().toISOString(),
        ...context,
    };

    if (process.env.NODE_ENV === 'development') {
        console.error('[API Error]', errorInfo);
        console.error('Full error:', error);
    }
}

function showErrorNotification(message: string): void {
    toast.error(message);
}

export function handleApiError(
    error: unknown,
    options: ErrorHandlerOptions = {}
): ApiError {
    if (!error || typeof error !== 'object' || !('isAxiosError' in error)) {
        const unknownError = new Error('Unknown error') as any;
        unknownError.isAxiosError = false;
        return unknownError;
    }

    const apiError = error as ApiError;
    const {
        showToast = true,
        customMessage,
        logError: shouldLog = true,
        onAfterHandle,
    } = options;

    const statusCode = apiError.response?.status;
    const category = getErrorCategory(statusCode);

    if (shouldLog) {
        logError(apiError, { category });
    }

    switch (statusCode) {
        case HttpStatus.UNAUTHORIZED:
            const pathname = typeof window !== 'undefined' ? window.location.pathname : null;
            if (pathname) {
                handleUnauthorizedError(pathname);
            }
            break;

        case HttpStatus.FORBIDDEN:
            if (showToast) {
                showErrorNotification(
                    customMessage || 'Você não tem permissão para realizar esta ação.'
                );
            }
            break;

        case HttpStatus.NOT_FOUND:
            if (showToast) {
                showErrorNotification(customMessage || 'Recurso não encontrado.');
            }
            break;

        case HttpStatus.UNPROCESSABLE_ENTITY:
        case HttpStatus.BAD_REQUEST:
            const validationErrors = getValidationErrors(apiError);
            if (showToast && !validationErrors) {
                showErrorNotification(customMessage || getErrorMessage(apiError));
            }
            break;

        case HttpStatus.TOO_MANY_REQUESTS:
            if (showToast) {
                showErrorNotification(
                    customMessage || 'Muitas requisições. Aguarde um momento antes de tentar novamente.'
                );
            }
            break;

        default:
            if (showToast) {
                const message = customMessage || getErrorMessage(apiError);
                showErrorNotification(message);
            }
    }

    onAfterHandle?.();

    return apiError;
}

export function createErrorHandler(defaultOptions: ErrorHandlerOptions = {}) {
    return (error: unknown, options?: ErrorHandlerOptions) => {
        return handleApiError(error, { ...defaultOptions, ...options });
    };
}
