import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const { pathname } = url;

  // /zh-Hant-TW/* → /zh-TW/* (308)
  if (pathname === '/zh-Hant-TW' || pathname.startsWith('/zh-Hant-TW/')) {
    const target = pathname.replace(/^\/zh-Hant-TW/, '/zh-TW');
    return context.redirect(target + url.search, 308);
  }

  // /zh or /zh/* → /zh-TW/* (308), but do NOT match /zh-TW/*
  if (pathname === '/zh' || (pathname.startsWith('/zh/') && !pathname.startsWith('/zh-TW/'))) {
    const target = pathname.replace(/^\/zh(?=\/|$)/, '/zh-TW');
    return context.redirect(target + url.search, 308);
  }

  return next();
});
