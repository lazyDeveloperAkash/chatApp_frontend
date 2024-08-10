import { NextResponse } from 'next/server'

export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    console.log(token)
    console.log(request.nextUrl.pathname)
    if (request.nextUrl.pathname == "/") {
        console.log("first")
        if (token) return NextResponse.redirect(new URL("/auth", request.url));
    }
    if(request.nextUrl.pathname == "/auth") {
        if (!token) return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: '/:path*',
}