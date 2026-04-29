import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.authgear.com',
  output: 'server',
  adapter: netlify(),
  integrations: [
    react(),
    sitemap({
      // Drop /en/* internal routes (canonical English paths are unprefixed).
      // All legacy redirects now live in public/_redirects, so they aren't
      // prerendered and will never appear in the sitemap to begin with.
      filter: (page) => !page.includes('/en/'),
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
