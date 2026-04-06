/**
 * Download all video footage found by the Discord scraper
 *
 * Usage: node scripts/download-footage.js
 * Requires: Run discord-scraper.js first to generate server-data.json
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_PATH = path.join(__dirname, '..', 'research', 'discord', 'server-data.json');
const FOOTAGE_DIR = path.join(__dirname, '..', 'assets', 'footage');

if (!fs.existsSync(DATA_PATH)) {
  console.error('No server-data.json found. Run discord-scraper.js first.');
  process.exit(1);
}

fs.mkdirSync(FOOTAGE_DIR, { recursive: true });

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const videos = data.mediaFiles.filter(f => f.type === 'video');

if (videos.length === 0) {
  console.log('No video files found in the Discord data.');
  process.exit(0);
}

console.log(`Found ${videos.length} video(s) to download\n`);

function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(FOOTAGE_DIR, filename);

    if (fs.existsSync(filePath)) {
      console.log(`  Skipping ${filename} (already exists)`);
      return resolve(filePath);
    }

    console.log(`  Downloading ${filename}...`);
    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (redirected) => {
          redirected.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`  ✓ ${filename} saved`);
            resolve(filePath);
          });
        }).on('error', reject);
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`  ✓ ${filename} saved`);
        resolve(filePath);
      });
    }).on('error', reject);
  });
}

async function downloadAll() {
  for (const video of videos) {
    const safeName = `${video.channel}_${video.name}`.replace(/[^a-zA-Z0-9._-]/g, '_');
    try {
      await downloadFile(video.url, safeName);
    } catch (err) {
      console.error(`  ✗ Failed to download ${video.name}: ${err.message}`);
    }
  }
  console.log(`\nDone! Footage saved to: ${FOOTAGE_DIR}`);
}

downloadAll();
