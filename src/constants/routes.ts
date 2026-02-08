 
export const PUBLIC_ROUTES = [
    '/login',
    '/forgot-password',
    '/reset-password',
] as const;

export const AUTH_FLOW_ROUTES = [
    '/login',
    '/forgot-password',
    '/reset-password',
] as const;

export const REDIRECT_PATHS = {
    LOGIN: '/login',
    HOME: '/',
    UNAUTHORIZED: '/login',
} as const;

export function isRouteMatch(pathname: string, routes: readonly string[]): boolean {
    return routes.some(route => {
        if (pathname === route) return true;
        if (pathname.startsWith(`${route}/`)) return true;
        return false;
    });
}

export function isAuthFlowRoute(pathname: string): boolean {
    return isRouteMatch(pathname, AUTH_FLOW_ROUTES);
}

export function isPublicRoute(pathname: string): boolean {
    return isRouteMatch(pathname, PUBLIC_ROUTES);
}
