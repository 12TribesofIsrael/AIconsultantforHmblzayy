/**
 * Auto-sync Faith Walk Tracker from Twitch stream data
 *
 * Watches hmblzayy's Twitch stream title for location/day/miles info
 * and runs tracker-from-title.js when there's anything new to update.
 *
 * Usage:
 *   node scripts/twitch-tracker-sync.js          # Check once
 *   node scripts/twitch-tracker-sync.js --watch   # Check every 30 minutes
 */

const { execSync } = require('child_process');
const path = require('path');
const { fetchStreamTitle, parseStreamTitle, TWITCH_CHANNEL } = require('./lib/twitch');

const CHECK_INTERVAL = 30 * 60 * 1000; // 30 minutes

async function checkAndUpdate() {
  const now = new Date().toLocaleTimeString();
  console.log(`[${now}] Checking Twitch stream for ${TWITCH_CHANNEL}...`);

  try {
    const { title, isLive, viewers, lastStreamDate } = await fetchStreamTitle();
    console.log(`  Status: ${isLive ? `🔴 LIVE (${viewers} viewers)` : '⚫ Offline'}`);
    if (!isLive && lastStreamDate) {
      console.log(`  Last stream: ${new Date(lastStreamDate).toLocaleString()}`);
    }
    console.log(`  Title: ${title || '(no title found)'}`);

    const parsed = parseStreamTitle(title);
    if (!parsed) {
      console.log(`  Could not parse Faith Walk data from title.`);
      return;
    }

    console.log(`  Parsed: Day ${parsed.day}, ${parsed.milesFromNext != null ? parsed.milesFromNext + ' mi to ' + parsed.nearLocation : 'destination unknown'}`);

    if (parsed.day && parsed.nearLocation && parsed.milesFromNext != null) {
      console.log(`\n  Running tracker-from-title to apply update...`);
      const scriptPath = path.join(__dirname, 'tracker-from-title.js');
      execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
    } else {
      console.log(`  Title incomplete — need day, destination, and miles-from. Skipping.`);
    }
  } catch (err) {
    console.error(`  Error: ${err.message}`);
  }
}

const watchMode = process.argv.includes('--watch');

if (watchMode) {
  console.log(`Faith Walk Tracker — Twitch Auto-Sync`);
  console.log(`Watching ${TWITCH_CHANNEL} every 30 minutes...\n`);
  checkAndUpdate();
  setInterval(checkAndUpdate, CHECK_INTERVAL);
} else {
  checkAndUpdate();
}
