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
    // pages, SSR endpoints, middleware) — just JIT-compiled instead of
    // built ahead of time.
    command: `PUBLIC_GTM_ID=GTM-TEST0000 astro dev --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
