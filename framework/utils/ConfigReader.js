import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get correct paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ConfigReader {
  static _settingsCache = null;
  static _testDataCache = null;

  /**
     * Lazy load and cache settings to prevent redundant file I/O operations.
     */
  static getSettings() {
    if (!ConfigReader._settingsCache) {
      // path.resolve ensures the path is built relative to the ConfigReader.js location
      const settingsPath = path.resolve(__dirname, '../config/settings.json');
      const rawData = fs.readFileSync(settingsPath, 'utf-8');
      ConfigReader._settingsCache = JSON.parse(rawData);
    }
    return ConfigReader._settingsCache;
  }

  /**
     * Lazy load and cache test data to prevent redundant file I/O operations.
     */
  static getTestData() {
    if (!ConfigReader._testDataCache) {
      const testDataPath = path.resolve(__dirname, '../config/testdata.json');
      const rawData = fs.readFileSync(testDataPath, 'utf-8');
      ConfigReader._testDataCache = JSON.parse(rawData);
    }
    return ConfigReader._testDataCache;
  }

  /**
     * Safely get the download directory with a fallback.
     */
  static getDownloadDir() {
    // Use explicit class reference here as well
    const settings = ConfigReader.getSettings();
        
    // Guard against missing key in config
    if (!settings.downloadDir) {
      return path.resolve(process.cwd(), 'test-results/downloads');
    }
        
    return path.resolve(process.cwd(), settings.downloadDir);
  }
}

export default ConfigReader;
