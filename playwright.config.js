import { defineConfig } from '@playwright/test';

const browserName = process.env.BROWSER || 'chromium';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  workers: isCI ? 1 : undefined,

  forbidOnly: isCI,

  reporter: 'list',

  use: {
    trace: 'retain-on-failure',
    video: 'on-first-retry',
    screenshot: 'only-on-failure',

    headless: false,
    viewport: null,
  },

  projects: [
    {
      name: browserName,
      use: {
        browserName,
        headless: false,
        viewport: null,
        launchOptions: {
          args: browserName === 'chromium' ? ['--start-maximized'] : [],
        },
      },
    },
  ],
});