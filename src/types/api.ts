/**
 * API Types
 * Type definitions for API errors and responses
 */

import { AxiosError } from 'axios';

/**
 * Standard API error response structure
 */
export interface ApiErrorResponse {
    message: string;
    statusCode: number;
    error?: string;
    details?: Record<string, any>;
    timestamp?: string;
}

/**
 * Typed Axios error
 */
export type ApiError = AxiosError<ApiErrorResponse>;

/**
 * Error handler callback type
 */
export type ErrorHandler = (error: ApiError) => void | Promise<void>;

/**
 * Error handler options
 */
export interface ErrorHandlerOptions {
    /**
     * Show toast notification
     */
    showToast?: boolean;

    /**
     * Custom error message
     */
    customMessage?: string;

    /**
     * Log error to console/service
     */
    logError?: boolean;

    /**
     * Callback to execute after handling
     */
    onAfterHandle?: () => void;
}

/**
 * HTTP Status codes
 */
export enum HttpStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}

/**
 * Error categories for better handling
 */
export enum ErrorCategory {
    AUTHENTICATION = 'authentication',
    AUTHORIZATION = 'authorization',
    VALIDATION = 'validation',
    NOT_FOUND = 'not_found',
    RATE_LIMIT = 'rate_limit',
    SERVER_ERROR = 'server_error',
    NETWORK_ERROR = 'network_error',
    TIMEOUT = 'timeout',
    UNKNOWN = 'unknown',
}
