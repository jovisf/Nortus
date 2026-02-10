import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { handleUnauthorizedError } from './authErrorHandler';
import type { ApiError, ApiErrorResponse, ErrorHandlerOptions } from '@/types/api';
import { ErrorCategory, HttpStatus } from '@/types/api';
import { getCookie } from './cookies';

import ptBR from '../../messages/pt-BR.json';
import enUS from '../../messages/en-US.json';

const translations: Record<string, any> = {
    'pt-BR': ptBR.Errors,
    'en-US': enUS.Errors
};

function getT() {
    const locale = typeof window !== 'undefined' ? getCookie('NEXT_LOCALE') || 'pt-BR' : 'pt-BR';
    return (key: string) => translations[locale]?.[key] || translations['pt-BR'][key] || key;
}

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
    const t = getT();

    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.code === 'ECONNABORTED') {
        return t('timeout');
    }

    if (error.code === 'ERR_NETWORK') {
        return t('network');
    }

    const statusCode = error.response?.status;

    switch (statusCode) {
        case HttpStatus.BAD_REQUEST:
            return t('badRequest');
        case HttpStatus.UNAUTHORIZED:
            return t('unauthorized');
        case HttpStatus.FORBIDDEN:
            return t('forbidden');
        case HttpStatus.NOT_FOUND:
            return t('notFound');
        case HttpStatus.CONFLICT:
            return t('conflict');
        case HttpStatus.UNPROCESSABLE_ENTITY:
            return t('unprocessable');
        case HttpStatus.TOO_MANY_REQUESTS:
            return t('tooManyRequests');
        case HttpStatus.INTERNAL_SERVER_ERROR:
            return t('serverError');
        case HttpStatus.BAD_GATEWAY:
        case HttpStatus.SERVICE_UNAVAILABLE:
            return t('serviceUnavailable');
        case HttpStatus.GATEWAY_TIMEOUT:
            return t('gatewayTimeout');
        default:
            return t('unexpected');
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
    const t = getT();

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
                    customMessage || t('forbidden')
                );
            }
            break;

        case HttpStatus.NOT_FOUND:
            if (showToast) {
                showErrorNotification(customMessage || t('notFound'));
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
                    customMessage || t('tooManyRequests')
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
