import { Before, After, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import Browser from '#framework/ui/browser/Browser.js';
import { settings, testData } from '#framework/utils/ConfigReader.js';
import config from '../../playwright.config.js'; 
import path from 'path';
import fs from 'fs';

const DOWNLOAD_DIR = path.resolve(settings.downloadDir);

// Set global timeout based on Playwright config or default to 60s
setDefaultTimeout(config.timeout || 60 * 1000);

// Helper to map browser name string to actual Playwright object
const browsers = { chromium, firefox, webkit };

Before(async function (scenario) {
  // 1. Setup Download Dir
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

  // 2. Determine Browser & Settings from Config
  const browserName = process.env.BROWSER || config.projects?.[0]?.name || 'chromium';
  // Use project-specific 'use' settings or fallback to global 'use'
  const projectConfig = config.projects?.find(p => p.name === browserName)?.use || config.use || {};
  
  const launchOptions = {
    headless: projectConfig.headless ?? false, // Default to false if undefined
    args: projectConfig.launchOptions?.args || [],
    ...projectConfig.launchOptions
  };

  const contextOptions = {
    acceptDownloads: true,
    downloadsPath: DOWNLOAD_DIR,
    viewport: projectConfig.viewport, 
    baseURL: settings.baseUrl,
    video: projectConfig.video,
    ...(scenario.pickle.tags.some(tag => tag.name === '@auth') 
        ? { httpCredentials: testData.basicAuthCredentials } 
        : {})
  };

  // 3. Launch the Browser
  const browserType = browsers[browserName] || chromium;
  this.browser = await browserType.launch(launchOptions);

  // 4. Create Context & Page
  this.context = await this.browser.newContext(contextOptions);
  
  if (config.use?.trace === 'on' || config.use?.trace === 'retain-on-failure') {
    await this.context.tracing.start({ screenshots: true, snapshots: true });
  }

  const page = await this.context.newPage();

  this.browserWrapper = new Browser(page); 

  if (settings.baseUrl) {
    await this.browserWrapper.openUrl(settings.baseUrl);
  } else {
    throw new Error('Base URL is not defined in settings. Please set it before running tests.');
  }
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.browserWrapper.page.screenshot({ 
      path: `reports/screenshots/${scenario.pickle.name.replace(/\s+/g, '_')}.png` 
    });
    this.attach(screenshot, 'image/png'); 

    if (config.use?.trace === 'retain-on-failure') {
      await this.context.tracing.stop({ 
        path: `reports/traces/${scenario.pickle.name.replace(/\s+/g, '_')}.zip` 
      });
    }
  }

  await this.context?.close();
  await this.browser?.close();
  
  if (fs.existsSync(DOWNLOAD_DIR)) {
    fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true });
  }
});
