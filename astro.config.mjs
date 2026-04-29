import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.authgear.com',
  output: 'server',
  // The Netlify Image CDN only resolves on the Netlify runtime, so
  // disable it under `astro dev` (otherwise every <Image> 404s) and
  // keep it on for production builds where we get edge caching, AVIF
  // negotiation, and on-the-fly resizing.
  adapter: netlify({ imageCDN: process.env.NODE_ENV === 'production' }),
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
