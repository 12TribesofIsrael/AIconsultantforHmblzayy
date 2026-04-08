/**
 * Auto-sync Faith Walk Tracker from Twitch stream data
 *
 * Watches hmblzayy's Twitch stream title for location/day/miles info
 * and auto-updates the tracker when new data is found.
 *
 * Usage:
 *   node scripts/twitch-tracker-sync.js          # Check once
 *   node scripts/twitch-tracker-sync.js --watch   # Check every 30 minutes
 *
 * Stream title format it parses:
 *   "DAY 12 | WALKING 3000 MILES CALI 🌴 | 18 MILES FROM ALTOONA | FAITH WALK🙏🏾 | HMBL UNIVERSITY"
 */

const https = require('https');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID || '';
const TWITCH_CHANNEL = 'hmblzayy';
const CHECK_INTERVAL = 30 * 60 * 1000; // 30 minutes
const CHECKPOINTS_PATH = path.join(__dirname, '..', 'src', 'faith-walk-tracker', 'checkpoints.json');

// Fetch stream info from Twitch (no auth needed for this endpoint)
function fetchStreamTitle() {
  return new Promise((resolve, reject) => {
    // Use the Twitch GQL endpoint (no auth required)
    const postData = JSON.stringify([{
      operationName: 'StreamMetadata',
      variables: { channelLogin: TWITCH_CHANNEL },
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash: 'a647c2a13599e5991e175155f798ca7f1ecddde73f7f341f39009c14571c11c1'
        }
      }
    }]);

    const options = {
      hostname: 'gql.twitch.tv',
      path: '/gql',
      method: 'POST',
      headers: {
        'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const stream = parsed[0]?.data?.user?.stream;
          if (stream) {
            resolve({ title: stream.title, isLive: true });
          } else {
            // Try to get last known title from channel
            const lastTitle = parsed[0]?.data?.user?.lastBroadcast?.title;
            resolve({ title: lastTitle || '', isLive: false });
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Parse stream title for Faith Walk data
function parseStreamTitle(title) {
  if (!title) return null;

  const data = {};

  // Extract day number: "DAY 12" or "Day 12"
  const dayMatch = title.match(/DAY\s+(\d+)/i);
  if (dayMatch) data.day = parseInt(dayMatch[1]);

  // Extract miles: "214 MILES COMPLETED" or look for mile count
  const milesMatch = title.match(/(\d+)\s*MILES?\s*(COMPLETED|DONE|WALKED)/i);
  if (milesMatch) data.miles = parseInt(milesMatch[1]);

  // Extract location: "LOCATION: TYRONE, PA" or "X MILES FROM ALTOONA"
  const locationMatch = title.match(/LOCATION[:\s-]+([A-Z\s]+,\s*[A-Z]{2})/i);
  if (locationMatch) {
    data.location = locationMatch[1].trim();
  } else {
    // Try "FROM CITYNAME" pattern
    const fromMatch = title.match(/FROM\s+([A-Z][a-zA-Z\s]+)/i);
    if (fromMatch) {
      data.nearLocation = fromMatch[1].trim();
    }
  }

  // Only return if we got at least a day number
  return data.day ? data : null;
}

// Check and update
async function checkAndUpdate() {
  const now = new Date().toLocaleTimeString();
  console.log(`[${now}] Checking Twitch stream for hmblzayy...`);

  try {
    const { title, isLive } = await fetchStreamTitle();
    console.log(`  Status: ${isLive ? '🔴 LIVE' : '⚫ Offline'}`);
    console.log(`  Title: ${title || '(none)'}`);

    const parsed = parseStreamTitle(title);
    if (!parsed) {
      console.log(`  Could not parse Faith Walk data from title.`);
      return;
    }

    console.log(`  Parsed: Day ${parsed.day}, ${parsed.miles ? parsed.miles + ' miles' : 'miles unknown'}, ${parsed.location || parsed.nearLocation || 'location unknown'}`);

    // Check if this is a new checkpoint
    const checkpoints = JSON.parse(fs.readFileSync(CHECKPOINTS_PATH, 'utf8'));
    const lastDay = checkpoints[checkpoints.length - 1].day;

    if (parsed.day > lastDay && parsed.location && parsed.miles) {
      console.log(`\n  NEW CHECKPOINT DETECTED! Day ${parsed.day} (was Day ${lastDay})`);
      console.log(`  Running update script...`);

      execSync(
        `node scripts/update-tracker.js --day ${parsed.day} --location "${parsed.location}" --miles ${parsed.miles}`,
        { stdio: 'inherit' }
      );
    } else if (parsed.day > lastDay) {
      console.log(`\n  Day ${parsed.day} detected but missing location or miles.`);
      console.log(`  Update manually: node scripts/update-tracker.js --day ${parsed.day} --location "City, ST" --miles XXX`);
    } else {
      console.log(`  Already up to date (Day ${lastDay}).`);
    }
  } catch (err) {
    console.error(`  Error: ${err.message}`);
  }
}

// Main
const watchMode = process.argv.includes('--watch');

if (watchMode) {
  console.log(`Faith Walk Tracker — Twitch Auto-Sync`);
  console.log(`Watching hmblzayy every 30 minutes...\n`);
  checkAndUpdate();
  setInterval(checkAndUpdate, CHECK_INTERVAL);
} else {
  checkAndUpdate();
}
