import { NextResponse } from 'next/server'

export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    if (request.nextUrl.pathname == "/") {
        if (token) return NextResponse.redirect(new URL("/auth", request.url));
    }
    if(request.nextUrl.pathname == "/auth") {
        if (!token) return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: '/:path*',
}