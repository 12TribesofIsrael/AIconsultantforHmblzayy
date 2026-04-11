/**
 * Manual tracker update
 *
 * Usage (new day — full checkpoint):
 *   node scripts/update-tracker.js --day 13 --location "Johnstown, PA" --miles 235
 *
 * Usage (in-progress — mark today's destination without logging arrival):
 *   node scripts/update-tracker.js --destination "Cranberry, PA" --miles-remaining 22
 *
 * New-day mode: geocodes, adds checkpoint, clears any stale in-progress fields,
 * and strips the estimatedMiles flag if it was set by an auto-promotion.
 * In-progress mode: mutates the latest checkpoint's destination/milesRemaining.
 * Both rebuild HTML, commit, and push.
 */

const { syncWithRemote } = require('./lib/git-sync');
const { geocode } = require('./lib/geo');
const { loadCheckpoints, rebuildAndPush, formatDate } = require('./lib/tracker');

// Parse args (supports --key value and --kebab-case -> camelCase)
const args = {};
process.argv.slice(2).forEach((arg, i, arr) => {
  if (arg.startsWith('--')) {
    const key = arg.replace('--', '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    args[key] = arr[i + 1];
  }
});

const isInProgress = !!args.destination;
const isNewDay = !!(args.day && args.location && args.miles);

if (!isInProgress && !isNewDay) {
  console.log('Usage:');
  console.log('  New day:     node scripts/update-tracker.js --day 13 --location "Johnstown, PA" --miles 235');
  console.log('  In-progress: node scripts/update-tracker.js --destination "Cranberry, PA" --miles-remaining 22');
  process.exit(1);
}

if (isInProgress && !args.milesRemaining) {
  console.log('In-progress mode requires --miles-remaining');
  process.exit(1);
}

async function main() {
  syncWithRemote();
  const checkpoints = loadCheckpoints();

  if (isInProgress) {
    const destination = args.destination;
    const milesRemaining = parseInt(args.milesRemaining);

    if (checkpoints.length === 0) {
      console.log('No checkpoints exist yet — log a day first.');
      process.exit(1);
    }

    const latest = checkpoints[checkpoints.length - 1];
    latest.destination = destination;
    latest.milesRemaining = milesRemaining;

    console.log(`\nMarking in-progress from Day ${latest.day} — ${latest.location}`);
    console.log(`  Heading to: ${destination}`);
    console.log(`  Miles remaining: ${milesRemaining}`);

    rebuildAndPush(
      checkpoints,
      `Faith Walk: heading to ${destination} (${milesRemaining} mi to go)`
    );

    console.log(`\n✓ In-progress updated! → ${destination} (${milesRemaining} mi to go)`);
    console.log(`  Live at: https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html`);
    return;
  }

  // New-day mode
  const day = parseInt(args.day);
  const location = args.location;
  const miles = parseInt(args.miles);
  const date = args.date || formatDate();

  console.log(`\nUpdating Faith Walk Tracker...`);
  console.log(`  Day: ${day}`);
  console.log(`  Location: ${location}`);
  console.log(`  Miles: ${miles}`);
  console.log(`  Date: ${date}`);

  console.log(`\nGeocoding "${location}"...`);
  const coords = await geocode(location);
  console.log(`  Coordinates: ${coords.lat}, ${coords.lng}`);

  // Clear any in-progress fields from all existing checkpoints — arrival
  // overrides heading-to. Also strip estimatedMiles since the user is
  // providing a confirmed number.
  checkpoints.forEach(cp => {
    delete cp.destination;
    delete cp.destinationLat;
    delete cp.destinationLng;
    delete cp.milesRemaining;
    delete cp.milesToday; // legacy field name
    delete cp.estimatedSegmentMiles;
    delete cp.inProgressDay;
    delete cp.inProgressStartedAt;
  });

  const existingIndex = checkpoints.findIndex(cp => cp.day === day);
  const newCheckpoint = { day, location, lat: coords.lat, lng: coords.lng, miles, date };

  if (existingIndex !== -1) {
    checkpoints[existingIndex] = newCheckpoint;
    console.log(`  Updated existing Day ${day} checkpoint (estimate cleared if present)`);
  } else {
    checkpoints.push(newCheckpoint);
    checkpoints.sort((a, b) => a.day - b.day);
    console.log(`  Added new Day ${day} checkpoint`);
  }

  rebuildAndPush(
    checkpoints,
    `Update Faith Walk: Day ${day} — ${location} (${miles} miles)`
  );

  console.log(`\n✓ Tracker updated! Day ${day}: ${location} — ${miles} miles`);
  console.log(`  Live at: https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
