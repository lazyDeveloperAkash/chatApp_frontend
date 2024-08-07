import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
//   return NextResponse.redirect(new URL('/home', request.url))
const token = request.cookies.get("token")?.value;
console.log(token)

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/auth/:path*',
}