import { NextRequest, NextResponse } from 'next/server';
import { LEGACY_ZH_PATH_LOCALE } from './lib/i18n';

function pathnameHasZhTwPrefix(pathname: string): boolean {
  return pathname === '/zh-TW' || pathname.startsWith('/zh-TW/');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Canonical Chinese URLs: /zh-Hant-TW/... → /zh-TW/...
  const legacyPrefix = `/${LEGACY_ZH_PATH_LOCALE}`;
  if (pathname === legacyPrefix || pathname.startsWith(`${legacyPrefix}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = `/zh-TW${pathname.slice(legacyPrefix.length)}`;
    return NextResponse.redirect(url, 308);
  }

  // Legacy short segment /zh/... → /zh-TW/... (does not match /zh-TW/..., see lookahead)
  if (pathname === '/zh' || pathname.startsWith('/zh/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/zh(?=\/|$)/, '/zh-TW');
    return NextResponse.redirect(url, 308);
  }

  // Skip static files, Next.js internals, and API routes.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/css') ||
    pathname.startsWith('/js') ||
    pathname.startsWith('/documents') ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Default locale (en) is not shown in the URL — strip legacy /en/... links.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === '/en' ? '/' : pathname.slice('/en'.length);
    return NextResponse.redirect(url, 308);
  }

  if (pathnameHasZhTwPrefix(pathname)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', 'zh-TW');
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // No locale prefix = English in the URL. Rewrite to /en/... internally (do not use
  // Accept-Language to redirect, so users can open `/` or `/pricing` without being
  // forced back to `/zh-TW/...` when the browser prefers Chinese).
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', 'en');
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    // Match all paths except those that should be skipped above.
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
