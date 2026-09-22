import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * While the full site is unfinished, keep unfinished routes off production.
 * Unlock everything with NEXT_PUBLIC_SITE_LIVE=true.
 */
export function middleware(request: NextRequest) {
  const live = process.env.NEXT_PUBLIC_SITE_LIVE === 'true';
  if (live) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === '/' || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Allow static assets (images, logo, videos, favicon, etc.)
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
