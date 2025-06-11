// fileManager.js

const fs = require('fs');
const path = require('path');

/**
 * Reads a UTF-8 text file and returns a Promise for its contents.
 * @param {string} filename
 * @returns {Promise<string>}
 */
function readFile(filename) {
  const filePath = path.join(__dirname, filename);
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

/**
 * Writes the given text (UTF-8) into the named file, overwriting it.
 * Returns a Promise that resolves when done.
 * @param {string} filename
 * @param {string} content
 * @returns {Promise<void>}
 */
function writeFile(filename, content) {
  const filePath = path.join(__dirname, filename);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, 'utf8', err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = { readFile, writeFile };
