import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const { pathname } = url;

  // /zh-Hant-TW/* → /zh-hant/* (308). Mixed-case legacy from Webflow.
  if (pathname === '/zh-Hant-TW' || pathname.startsWith('/zh-Hant-TW/')) {
    const target = pathname.replace(/^\/zh-Hant-TW/, '/zh-hant');
    return context.redirect(target + url.search, 308);
  }

  // /zh-Hant/* → /zh-hant/* (308). The site briefly used /zh-Hant/ as the
  // Traditional Chinese path segment after the Webflow cutover; URLs are
  // lowercase now to match standard URL casing conventions.
  if (pathname === '/zh-Hant' || pathname.startsWith('/zh-Hant/')) {
    const target = pathname.replace(/^\/zh-Hant/, '/zh-hant');
    return context.redirect(target + url.search, 308);
  }

  // Legacy /zh-TW/* → /zh-hant/* (308). The site used /zh-TW as the
  // Traditional Chinese path segment until we broadened the locale to
  // zh-Hant to cover readers outside Taiwan (Hong Kong, etc.).
  if (pathname === '/zh-TW' || pathname.startsWith('/zh-TW/')) {
    const target = pathname.replace(/^\/zh-TW/, '/zh-hant');
    return context.redirect(target + url.search, 308);
  }

  // /zh or /zh/* → /zh-hant/* (308), but do NOT match /zh-hant/*
  if (pathname === '/zh' || (pathname.startsWith('/zh/') && !pathname.startsWith('/zh-hant/'))) {
    const target = pathname.replace(/^\/zh(?=\/|$)/, '/zh-hant');
    return context.redirect(target + url.search, 308);
  }

  return next();
});
