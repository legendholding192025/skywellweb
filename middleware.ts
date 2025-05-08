import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow access to login and register pages
  if (pathname === '/admin/login' || pathname === '/admin/register') {
    // If user is already logged in, redirect to dashboard
    const token = request.cookies.get('admin_token')?.value;
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (error) {
        // Invalid token, continue to login page
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    // Save the original URL to redirect back after login
    const searchParams = new URLSearchParams({
      callbackUrl: pathname,
    });
    return NextResponse.redirect(new URL(`/admin/login?${searchParams}`, request.url));
  }

  try {
    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    // Token is invalid, redirect to login
    const searchParams = new URLSearchParams({
      callbackUrl: pathname,
    });
    return NextResponse.redirect(new URL(`/admin/login?${searchParams}`, request.url));
  }
}

export const config = {
  matcher: '/admin/:path*',
} 