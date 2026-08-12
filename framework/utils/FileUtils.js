import fs from 'fs/promises';

export default class FileUtils {
  /**
   * Checks if a file exists at the specified path.
   * Do not use this function alone for assertions!
   * Wrap it in expect.poll for stable checks (eliminates flaky tests).
   *
   * @example
   * await expect.poll(async () => await FileUtils.isFileExists(filePath)).toBeTruthy();
   *
   * @param {string} filePath - Absolute path to the file.
   * @returns {Promise<boolean>}
   */
  static async isFileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Safely creates a directory if it does not exist.
   * @param {string} dirPath - Path to the directory.
   * @returns {Promise<void>}
   */
  static async ensureDirectoryExists(dirPath) {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
    }
  }
}
