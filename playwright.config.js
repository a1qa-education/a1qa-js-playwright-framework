import { defineConfig } from '@playwright/test';

const browserName = process.env.BROWSER || 'chromium';

export default defineConfig({
  testDir: './examples/ui/tests',
  reporter: 'list',
  use: {
    trace: 'on-first-retry',
    headless: false,
    viewport: null,
  },
  projects: [
    {
      name: browserName,
      use: {
        browserName: browserName,
        headless: false,
        viewport: null,
        launchOptions: {
          args: browserName === 'chromium' ? ['--start-maximized'] : [],
        },
      },
    },
  ],
});
