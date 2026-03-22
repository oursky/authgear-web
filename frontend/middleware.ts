import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, resolveLocale, type Locale } from './lib/i18n';

function pathnameHasLocale(pathname: string): Locale | null {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  const currentLocale = pathnameHasLocale(pathname);

  if (currentLocale) {
    // Already has a valid locale prefix — forward with x-locale header so
    // layout.tsx can read it for the <html lang> attribute.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', currentLocale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // No locale prefix — detect from Accept-Language and redirect.
  const detected = resolveLocale(request.headers.get('accept-language'));
  const locale = detected ?? DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url, { status: 307 });
}

export const config = {
  matcher: [
    // Match all paths except those that should be skipped above.
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
