import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from './lib/session-manager'
 

const publicRoutes = ['/login', '/signup', '/']
 
export default async function proxy(req: NextRequest) {
  console.log('proxy middleware called')
  const path = req.nextUrl.pathname
  const isProtectedRoute = path.startsWith('/dashboard')
  const isPublicRoute = publicRoutes.includes(path)
 
  const cookie = (await cookies()).get('errand-session')?.value
  const session = await decrypt(cookie)

  console.log('session in middleware',cookie)

  if (isProtectedRoute && !session?.access_token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (['/',''].includes(path) && !session?.access_token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  if (
    isPublicRoute &&
    session?.access_token &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
}
