import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ConfigReader {
    static _settingsCache = null;
    static _testDataCache = null;

    /**
     * Lazy load and cache settings to prevent redundant file I/O operations.
     */
    static getSettings() {
        if (!this._settingsCache) {
            // path.resolve ensures the path is built relative to the ConfigReader.js location
            const settingsPath = path.resolve(__dirname, '../config/settings.json');
            const rawData = fs.readFileSync(settingsPath, 'utf-8');
            this._settingsCache = JSON.parse(rawData);
        }
        return this._settingsCache;
    }

    /**
     * Lazy load and cache test data to prevent redundant file I/O operations.
     */
    static getTestData() {
        if (!this._testDataCache) {
            const testDataPath = path.resolve(__dirname, '../config/testdata.json');
            const rawData = fs.readFileSync(testDataPath, 'utf-8');
            this._testDataCache = JSON.parse(rawData);
        }
        return this._testDataCache;
    }

    /**
     * Safely get the download directory with a fallback.
     */
    static getDownloadDir() {
        const settings = this.getSettings();
        
        // Guard against missing key in config
        if (!settings.downloadDir) {
            return path.resolve(process.cwd(), 'test-results/downloads');
        }
        
        return path.resolve(process.cwd(), settings.downloadDir);
    }
}

export default ConfigReader;
