import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const { pathname } = url;

  // /zh-Hant-TW/* → /zh-Hant/* (308)
  if (pathname === '/zh-Hant-TW' || pathname.startsWith('/zh-Hant-TW/')) {
    const target = pathname.replace(/^\/zh-Hant-TW/, '/zh-Hant');
    return context.redirect(target + url.search, 308);
  }

  // Legacy /zh-TW/* → /zh-Hant/* (308). The site used /zh-TW as the
  // Traditional Chinese path segment until we broadened the locale to
  // zh-Hant to cover readers outside Taiwan (Hong Kong, etc.).
  if (pathname === '/zh-TW' || pathname.startsWith('/zh-TW/')) {
    const target = pathname.replace(/^\/zh-TW/, '/zh-Hant');
    return context.redirect(target + url.search, 308);
  }

  // /zh or /zh/* → /zh-Hant/* (308), but do NOT match /zh-Hant/*
  if (pathname === '/zh' || (pathname.startsWith('/zh/') && !pathname.startsWith('/zh-Hant/'))) {
    const target = pathname.replace(/^\/zh(?=\/|$)/, '/zh-Hant');
    return context.redirect(target + url.search, 308);
  }

  return next();
});
