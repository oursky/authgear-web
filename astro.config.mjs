import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.authgear.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [
    react(),
    sitemap({
      // Drop legacy/redirect-only paths and any /en/* internal routes.
      filter: (page) =>
        !page.includes('/en/') &&
        !/\/blog\/[a-z0-9-]+\/?$/.test(page) && // /blog/{slug} is a 301 redirect
        !/\/post\/category\//.test(page) && // legacy redirect
        !/\/features\/identity-security\/?$/.test(page) && // 301 → attack-protection
        !/\/features\/sms-passcode\/?$/.test(page) && // 301 → multi-factor-authentication
        !/\/why-authgear\/?$/.test(page) && // 301 → /about
        !/\/zh-Hant\/blog\/[a-z0-9-]+\/?$/.test(page) &&
        !/\/zh-Hant\/post\/category\//.test(page) &&
        !/\/zh-Hant\/features\/identity-security\/?$/.test(page) &&
        !/\/zh-Hant\/features\/sms-passcode\/?$/.test(page) &&
        !/\/zh-Hant\/why-authgear\/?$/.test(page),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: false,
    },
  },
});
