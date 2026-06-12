import { defineConfig } from '@playwright/test';

const browserName = process.env.BROWSER || 'chromium';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',

  workers: isCI ? 1 : undefined,

  forbidOnly: isCI,

  reporter: 'list',

  use: {
    // Run in headless mode if in CI or if the environment variable is explicitly set.
    // When running locally (without variables), headless will be false for easier debugging.
    headless: process.env.CI ? true : (process.env.HEADLESS === 'true'),
    
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: browserName,
      use: {
        browserName,
        viewport: null,
        launchOptions: {
          args: browserName === 'chromium' ? ['--start-maximized'] : [],
        },
      },
    },
  ],
});
