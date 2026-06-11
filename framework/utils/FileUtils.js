import fs from 'fs';
import path from 'path';

/**
 * Utilities for file system operations.
 */
class FileUtils {
    /**
     * Checks if a file exists at the specified path.
     * Do not use this function alone for assertions!
     * Wrap it in expect.poll for stable checks (eliminates flaky tests).
     * 
     * @example
     * await expect.poll(() => FileUtils.isFileExists(filePath)).toBeTruthy();
     * 
     * @param {string} filePath - Absolute path to the file.
     * @returns {boolean}
     */
    static isFileExists(filePath) {
        try {
            return fs.existsSync(filePath);
        } catch (error) {
            console.error(`Error checking file existence: ${error.message}`);
            return false;
        }
    }

    /**
     * Safely creates a directory if it does not exist.
     * @param {string} dirPath - Path to the directory.
     */
    static ensureDirectoryExists(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }
}

export default FileUtils;