import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';

// Silently load environment variables without triggering console logs
if (fs.existsSync('.env')) {
  const envConfig = dotenv.parse(fs.readFileSync('.env'));
  for (const key in envConfig) {
    if (!process.env[key]) {
      process.env[key] = envConfig[key];
    }
  }
}

const isCI = !!process.env.CI;
const targetBrowser = process.env.BROWSER || 'chromium';

const allProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
  {
    name: 'local-headed',
    use: {
      browserName: 'chromium',
      headless: false,
      viewport: null,
      launchOptions: {
        args: ['--start-maximized'],
      },
    },
  },
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ...(isCI ? [['junit', { outputFile: 'results.xml' }]] : [])
  ],

  use: {
    headless: isCI ? true : (process.env.HEADLESS !== 'false'),
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',

    baseURL: 'https://the-internet.herokuapp.com',
    acceptDownloads: true,

    viewport: { width: 1920, height: 1080 },
  },

  projects: targetBrowser === 'all' ? allProjects : allProjects.filter(p => p.name === targetBrowser),
});
