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
        !/\/why-authgear\/?$/.test(page) && // 301 → /about
        !/\/zh-TW\/blog\/[a-z0-9-]+\/?$/.test(page) &&
        !/\/zh-TW\/post\/category\//.test(page) &&
        !/\/zh-TW\/features\/identity-security\/?$/.test(page) &&
        !/\/zh-TW\/why-authgear\/?$/.test(page),
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
