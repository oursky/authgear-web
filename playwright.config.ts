import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // The Netlify adapter has no `astro preview` support, so tests run
    // against `astro dev`. It exercises the same code paths (prerendered
    // pages, JIT-compiled instead of built ahead of time).
    //
    // IMPORTANT: run `npm run build` at least once before the suite. The
    // Netlify dev emulation loads _redirects and netlify.toml header rules
    // from the publish dir (dist/) — without it, redirect and cache-header
    // tests fail even though the config is correct. CI builds first for
    // this reason.
    command: `PUBLIC_GTM_ID=GTM-TEST0000 astro dev --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
