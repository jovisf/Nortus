import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login']
const authRoutes = ['/login']
const protectedRoutes = ['/dashboard', '/tickets', '/chat', '/simulador']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('auth-token')?.value

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    )

    const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route)
    )

    if (isProtectedRoute && !token) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    if (isPublicRoute && token && authRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)'],
}

