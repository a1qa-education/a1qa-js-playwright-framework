import fs from 'fs';
import path from 'path';

/**
 * Load a JSON config file from the config folder
 * @param {string} filename - JSON file name (e.g., 'settings.json', 'testData.json')
 * @returns {object} Parsed JSON content
 */
function loadConfig(filename) {
  const filePath = path.resolve(`./framework/config/${filename}`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Failed to read or parse config file: ${filename}. ${err.message}`);
  }
}

/** @type {{ baseUrl: string, downloadDir: string }} */
export const settings = loadConfig('settings.json');

/** @type {{ loginSuccessMessage: string, loginCredentials: { user: string, password: string }, fileForUpload: string, downloadFileName: string }} */
export const testData = loadConfig('testdata.json');
