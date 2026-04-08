/**
 * Manual tracker update
 *
 * Usage:
 *   node scripts/update-tracker.js --day 13 --location "Johnstown, PA" --miles 235
 *
 * This will:
 * 1. Geocode the location to get lat/lng
 * 2. Add the checkpoint to checkpoints.json
 * 3. Rebuild the tracker HTML
 * 4. Git commit and push (auto-deploys via GitHub Pages)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const CHECKPOINTS_PATH = path.join(__dirname, '..', 'src', 'faith-walk-tracker', 'checkpoints.json');
const TRACKER_HTML_PATH = path.join(__dirname, '..', 'src', 'faith-walk-tracker', 'index.html');
const DOCS_HTML_PATH = path.join(__dirname, '..', 'docs', 'faith-walk-tracker.html');

// Parse args
const args = {};
process.argv.slice(2).forEach((arg, i, arr) => {
  if (arg.startsWith('--')) {
    const key = arg.replace('--', '');
    args[key] = arr[i + 1];
  }
});

if (!args.day || !args.location || !args.miles) {
  console.log('Usage: node scripts/update-tracker.js --day 13 --location "Johnstown, PA" --miles 235');
  process.exit(1);
}

// Geocode using OpenStreetMap Nominatim (free, no API key)
function geocode(location) {
  return new Promise((resolve, reject) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`;
    https.get(url, { headers: { 'User-Agent': 'HMBLFaithWalkTracker/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const results = JSON.parse(data);
        if (results.length > 0) {
          resolve({ lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) });
        } else {
          reject(new Error(`Could not geocode: ${location}`));
        }
      });
    }).on('error', reject);
  });
}

// Format today's date
function formatDate() {
  const d = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// Build tracker HTML from checkpoints data
function buildTrackerHTML(checkpoints) {
  const current = checkpoints[checkpoints.length - 1];
  const totalMiles = 3000;
  const remaining = totalMiles - current.miles;

  // Count unique states
  const states = new Set(checkpoints.map(cp => cp.location.split(', ')[1])).size;

  // Read template and inject data
  let html = fs.readFileSync(TRACKER_HTML_PATH, 'utf8');

  // Replace the CHECKPOINTS array in the HTML
  const checkpointsJson = JSON.stringify(checkpoints, null, 6);
  html = html.replace(
    /const CHECKPOINTS = \[[\s\S]*?\];/,
    `const CHECKPOINTS = ${checkpointsJson};`
  );

  // Update stats in header
  html = html.replace(
    /id="currentDay">\d+/,
    `id="currentDay">${current.day}`
  );
  html = html.replace(
    /id="totalMiles">\d+/,
    `id="totalMiles">${current.miles}`
  );
  html = html.replace(
    /id="remaining">[\d,]+/,
    `id="remaining">${remaining.toLocaleString()}`
  );
  html = html.replace(
    /id="states">\d+\/10/,
    `id="states">${states}/10`
  );

  return html;
}

async function main() {
  const day = parseInt(args.day);
  const location = args.location;
  const miles = parseInt(args.miles);
  const date = args.date || formatDate();

  console.log(`\nUpdating Faith Walk Tracker...`);
  console.log(`  Day: ${day}`);
  console.log(`  Location: ${location}`);
  console.log(`  Miles: ${miles}`);
  console.log(`  Date: ${date}`);

  // Geocode location
  console.log(`\nGeocoding "${location}"...`);
  const coords = await geocode(location);
  console.log(`  Coordinates: ${coords.lat}, ${coords.lng}`);

  // Load and update checkpoints
  const checkpoints = JSON.parse(fs.readFileSync(CHECKPOINTS_PATH, 'utf8'));

  // Check if day already exists
  const existingIndex = checkpoints.findIndex(cp => cp.day === day);
  const newCheckpoint = { day, location, lat: coords.lat, lng: coords.lng, miles, date };

  if (existingIndex !== -1) {
    checkpoints[existingIndex] = newCheckpoint;
    console.log(`  Updated existing Day ${day} checkpoint`);
  } else {
    checkpoints.push(newCheckpoint);
    checkpoints.sort((a, b) => a.day - b.day);
    console.log(`  Added new Day ${day} checkpoint`);
  }

  // Save checkpoints
  fs.writeFileSync(CHECKPOINTS_PATH, JSON.stringify(checkpoints, null, 2) + '\n');
  console.log(`  Saved checkpoints.json`);

  // Rebuild tracker HTML
  const updatedHtml = buildTrackerHTML(checkpoints);
  fs.writeFileSync(TRACKER_HTML_PATH, updatedHtml);
  fs.writeFileSync(DOCS_HTML_PATH, updatedHtml);
  console.log(`  Rebuilt tracker HTML`);

  // Git commit and push
  console.log(`\nPushing to GitHub...`);
  try {
    execSync('git add src/faith-walk-tracker/ docs/faith-walk-tracker.html', { stdio: 'pipe' });
    execSync(`git commit -m "Update Faith Walk: Day ${day} — ${location} (${miles} miles)"`, { stdio: 'pipe' });
    execSync('git push origin main', { stdio: 'pipe' });
    console.log(`  Pushed! Site will update in ~1 minute.`);
  } catch (err) {
    console.log(`  Git push failed — you may need to push manually.`);
    console.log(`  Run: git add . && git commit -m "Day ${day} update" && git push`);
  }

  console.log(`\n✓ Tracker updated! Day ${day}: ${location} — ${miles} miles`);
  console.log(`  Live at: https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
