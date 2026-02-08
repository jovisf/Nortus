import { deleteCookie, COOKIE_NAMES } from './cookies';
import { isAuthFlowRoute, REDIRECT_PATHS } from '@/constants/routes';

export interface AuthErrorHandlerOptions {
    onBeforeRedirect?: () => void;
    redirectPath?: string;
}

export function handleUnauthorizedError(
    pathname: string,
    options: AuthErrorHandlerOptions = {}
): void {
    const { onBeforeRedirect, redirectPath = REDIRECT_PATHS.UNAUTHORIZED } = options;

    if (isAuthFlowRoute(pathname)) {
        return;
    }

    deleteCookie(COOKIE_NAMES.AUTH_TOKEN);

    onBeforeRedirect?.();

    if (typeof window !== 'undefined') {
        window.location.href = redirectPath;
    }
}

export function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

export function getCurrentPathname(): string | null {
    return isBrowser() ? window.location.pathname : null;
}
