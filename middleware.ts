import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminToken, COOKIE_NAME } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyAdminToken(token);
    if (!payload) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If visiting /admin/login without force parameter, check if token exists
  if (pathname === '/admin/login' && searchParams.get('force') !== '1') {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      const payload = await verifyAdminToken(token);
      if (payload) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
