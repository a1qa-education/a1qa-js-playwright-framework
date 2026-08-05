import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import Browser from '#framework/ui/browser/Browser.js';
import EnvProvider from '#framework/utils/EnvProvider.js';
import path from 'path';
import fs from 'fs';

const BASE_URL = process.env.BASE_URL || 'https://the-internet.herokuapp.com';
const DOWNLOAD_DIR = path.resolve('downloads');

setDefaultTimeout(60 * 1000);

const browsers = { chromium, firefox, webkit };

Before(async function (scenario) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

  const browserName = process.env.BROWSER || 'chromium';

  const launchOptions = {
    headless: process.env.HEADLESS !== 'false' ? false : true,
    ...(browserName === 'chromium'
      ? { args: ['--start-maximized'] }
      : {}),
  };

  const contextOptions = {
    acceptDownloads: true,
    downloadsPath: DOWNLOAD_DIR,
    viewport: null,
    baseURL: BASE_URL,
    ...(scenario.pickle.tags.some(tag => tag.name === '@auth')
      ? {
        httpCredentials: {
          username: EnvProvider.basicAuthUser,
          password: EnvProvider.basicAuthPassword,
        },
      }
      : {}),
  };

  const browserType = browsers[browserName] || chromium;
  this.playwrightBrowser = await browserType.launch(launchOptions);

  this.context = await this.playwrightBrowser.newContext(contextOptions);
  await this.context.tracing.start({ screenshots: true, snapshots: true });

  const page = await this.context.newPage();
  this.browserWrapper = new Browser(page, DOWNLOAD_DIR);

  await this.browserWrapper.openUrl(BASE_URL);
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshotDir = path.resolve('reports/screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });

    const screenshot = await this.browserWrapper.page.screenshot({
      path: path.join(screenshotDir, `${scenario.pickle.name.replace(/\s+/g, '_')}.png`),
    });
    this.attach(screenshot, 'image/png');

    const traceDir = path.resolve('reports/traces');
    fs.mkdirSync(traceDir, { recursive: true });

    await this.context.tracing.stop({
      path: path.join(traceDir, `${scenario.pickle.name.replace(/\s+/g, '_')}.zip`),
    });
  }

  await this.context?.close();
  await this.playwrightBrowser?.close();

  if (fs.existsSync(DOWNLOAD_DIR)) {
    fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true });
  }
});
