import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get correct paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ConfigReader {
    /**
     * Lazy load settings.
     */
    static getSettings() {
        // path.resolve ensures the path is built relative to the ConfigReader.js location
        const settingsPath = path.resolve(__dirname, '../config/settings.json');
        const rawData = fs.readFileSync(settingsPath, 'utf-8');
        return JSON.parse(rawData);
    }

    /**
     * Lazy load test data.
     */
    static getTestData() {
        const testDataPath = path.resolve(__dirname, '../config/testdata.json');
        const rawData = fs.readFileSync(testDataPath, 'utf-8');
        return JSON.parse(rawData);
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