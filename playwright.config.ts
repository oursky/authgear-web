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
    command:
      `PUBLIC_GTM_ID=GTM-TEST0000 ` +
      `PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA ` +
      `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA ` +
      `npm run build && ` +
      `PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA ` +
      `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA ` +
      `PORT=${PORT} npm start`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
