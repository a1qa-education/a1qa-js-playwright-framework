import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: process.env.BROWSER || 'chromium',
      use: {
        browserName: process.env.BROWSER || 'chromium',
        headless: false,
      },
    },
  ],
});
