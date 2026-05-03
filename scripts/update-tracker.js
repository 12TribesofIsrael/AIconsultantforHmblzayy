/**
 * Manual tracker update
 *
 * Usage (new day — full checkpoint):
 *   node scripts/update-tracker.js --day 13 --location "Johnstown, PA" --miles 235
 *   node scripts/update-tracker.js --day 13 --location "Johnstown, PA" --miles 235 --clip "https://..."
 *
 * Usage (multi-clip "Love Wall" — comma-separated clips + optional title):
 *   node scripts/update-tracker.js --day 30 --location "Springfield, OH" --miles 607 \
 *     --clips "https://...,https://...,https://..." \
 *     --clips-title "One Month In · The Love Wall"
 *
 * Usage (clip-only — attach a single Twitch clip to an existing day):
 *   node scripts/update-tracker.js --day 12 --clip "https://..."
 *
 * Usage (clips-only — attach multiple clips + title retroactively):
 *   node scripts/update-tracker.js --day 30 --clips "url1,url2,url3" --clips-title "..."
 *
 * Usage (in-progress — mark today's destination without logging arrival):
 *   node scripts/update-tracker.js --destination "Cranberry, PA" --miles-remaining 22
 *
 * New-day mode: geocodes, adds checkpoint, clears any stale in-progress fields,
 * and strips the estimatedMiles flag if it was set by an auto-promotion.
 * Clip-only mode: adds/updates a clip URL on an existing checkpoint. When --day N
 * matches an in-progress walking source (cp.inProgressDay === N), the clip(s) are
 * stashed in inProgressClip / inProgressClips / inProgressClipsTitle on that source
 * and auto-promote to clip / clips / clipsTitle on the new entry when Day N
 * archives. Until promotion, stashed clips do NOT render on the public archive
 * (matches the no-in-progress-cards rule).
 * In-progress mode: mutates the latest checkpoint's destination/milesRemaining.
 * All modes rebuild HTML, commit, and push.
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

// Parse --clips "url1,url2,url3" into an array of trimmed URLs
const clipsArray = args.clips
  ? args.clips.split(',').map(s => s.trim()).filter(Boolean)
  : null;

const isInProgress = !!args.destination;
const isClipOnly = !!(args.day && (args.clip || clipsArray) && !args.location && !args.miles);
const isNewDay = !!(args.day && args.location && args.miles);

if (!isInProgress && !isClipOnly && !isNewDay) {
  console.log('Usage:');
  console.log('  New day:     node scripts/update-tracker.js --day 13 --location "Johnstown, PA" --miles 235');
  console.log('  With clip:   node scripts/update-tracker.js --day 13 --location "Johnstown, PA" --miles 235 --clip "https://..."');
  console.log('  Multi-clip:  node scripts/update-tracker.js --day 30 --location "Springfield, OH" --miles 607 --clips "url1,url2,url3" --clips-title "One Month In · The Love Wall"');
  console.log('  Clip only:   node scripts/update-tracker.js --day 12 --clip "https://..."');
  console.log('  Clips only:  node scripts/update-tracker.js --day 30 --clips "url1,url2,url3" --clips-title "..."');
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

  if (isClipOnly) {
    const day = parseInt(args.day);
    const clip = args.clip;
    const idx = checkpoints.findIndex(cp => cp.day === day);

    if (idx !== -1) {
      let summary;
      if (clipsArray && clipsArray.length > 1) {
        checkpoints[idx].clips = clipsArray;
        // Keep `clip` as the first one for legacy renderers (faithwalklive
        // will be updated in a follow-up; meanwhile single-clip code paths
        // still see a working clip URL).
        checkpoints[idx].clip = clipsArray[0];
        if (args.clipsTitle) checkpoints[idx].clipsTitle = args.clipsTitle;
        summary = `${clipsArray.length} clips${args.clipsTitle ? ` (${args.clipsTitle})` : ''}`;
        console.log(`\nAttaching ${summary} to Day ${day} — ${checkpoints[idx].location}`);
        clipsArray.forEach((u, i) => console.log(`  Clip ${i + 1}: ${u}`));
      } else {
        checkpoints[idx].clip = clip || (clipsArray && clipsArray[0]);
        summary = `clip`;
        console.log(`\nAttaching clip to Day ${day} — ${checkpoints[idx].location}`);
        console.log(`  Clip: ${checkpoints[idx].clip}`);
      }

      rebuildAndPush(
        checkpoints,
        `Add ${summary} to Day ${day} — ${checkpoints[idx].location}`
      );

      console.log(`\n✓ ${clipsArray && clipsArray.length > 1 ? 'Clips' : 'Clip'} added to Day ${day}!`);
      console.log(`  Live at: https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html`);
      return;
    }

    // Not a real checkpoint — check if it's the current in-progress day
    // (e.g. rest-day clip attached to Day 19 while Day 18 is the arrival).
    const latest = checkpoints[checkpoints.length - 1];
    if (latest && latest.inProgressDay === day && latest.restDay) {
      latest.restDayClip = clip;
      console.log(`\nAttaching rest-day clip to Day ${day} (resting at ${latest.location})`);
      console.log(`  Clip: ${clip}`);

      rebuildAndPush(
        checkpoints,
        `Add rest-day clip to Day ${day} — ${latest.location}`
      );

      console.log(`\n✓ Rest-day clip added to Day ${day}!`);
      console.log(`  Live at: https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html`);
      return;
    }

    // Walking in-progress day — fields might live on the latest walking
    // checkpoint OR on an earlier one shadowed by trailing rest-only entries
    // (recovery cycle, etc.). Walk tail-first to find the in-progress source.
    let ipSource = null;
    for (let i = checkpoints.length - 1; i >= 0; i--) {
      const cp = checkpoints[i];
      if (cp.inProgressDay === day && !cp.restOnly && !cp.restDay && cp.destination) {
        ipSource = cp;
        break;
      }
    }

    if (ipSource) {
      let summary;
      if (clipsArray && clipsArray.length > 1) {
        ipSource.inProgressClips = clipsArray;
        if (args.clipsTitle) ipSource.inProgressClipsTitle = args.clipsTitle;
        summary = `${clipsArray.length} clips${args.clipsTitle ? ` (${args.clipsTitle})` : ''}`;
        console.log(`\nStashing ${summary} for in-progress Day ${day} (walking ${ipSource.location} → ${ipSource.destination})`);
        clipsArray.forEach((u, i) => console.log(`  Clip ${i + 1}: ${u}`));
      } else {
        const single = clip || (clipsArray && clipsArray[0]);
        ipSource.inProgressClip = single;
        summary = `clip`;
        console.log(`\nStashing in-progress clip for Day ${day} (walking ${ipSource.location} → ${ipSource.destination})`);
        console.log(`  Clip: ${single}`);
      }
      console.log(`  Will promote on rollover when Day ${day} archives.`);

      rebuildAndPush(
        checkpoints,
        `Stash ${summary} for in-progress Day ${day} (promotes on rollover to ${ipSource.destination})`
      );

      console.log(`\n✓ ${clipsArray && clipsArray.length > 1 ? 'Clips' : 'Clip'} stashed for Day ${day}!`);
      console.log(`  Public archive will surface them once Day ${day} archives.`);
      return;
    }

    console.log(`Day ${day} not found in checkpoints and not a current rest day or in-progress walking day. Log the day first.`);
    process.exit(1);
  }

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

  // Before stripping in-progress fields, capture any stashed clip data on the
  // matching source entry so it carries over to the new day.
  let stashedClipForDay = null;
  let stashedClipsForDay = null;
  let stashedClipsTitleForDay = null;
  checkpoints.forEach(cp => {
    if (cp.inProgressDay === day) {
      if (cp.inProgressClip) stashedClipForDay = cp.inProgressClip;
      if (cp.inProgressClips) stashedClipsForDay = cp.inProgressClips;
      if (cp.inProgressClipsTitle) stashedClipsTitleForDay = cp.inProgressClipsTitle;
    }
  });

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
    delete cp.inProgressClip;
    delete cp.inProgressClips;
    delete cp.inProgressClipsTitle;
  });

  const existingIndex = checkpoints.findIndex(cp => cp.day === day);
  const newCheckpoint = { day, location, lat: coords.lat, lng: coords.lng, miles, date };

  // Clip handling — explicit args win, then stashed multi, then stashed single.
  if (clipsArray && clipsArray.length > 1) {
    newCheckpoint.clips = clipsArray;
    newCheckpoint.clip = clipsArray[0]; // legacy single-clip fallback
    if (args.clipsTitle) newCheckpoint.clipsTitle = args.clipsTitle;
  } else if (args.clip) {
    newCheckpoint.clip = args.clip;
  } else if (clipsArray && clipsArray.length === 1) {
    newCheckpoint.clip = clipsArray[0];
  } else if (stashedClipsForDay && stashedClipsForDay.length > 1) {
    newCheckpoint.clips = stashedClipsForDay;
    newCheckpoint.clip = stashedClipsForDay[0];
    if (stashedClipsTitleForDay) newCheckpoint.clipsTitle = stashedClipsTitleForDay;
  } else if (stashedClipsForDay && stashedClipsForDay.length === 1) {
    newCheckpoint.clip = stashedClipsForDay[0];
  } else if (stashedClipForDay) {
    newCheckpoint.clip = stashedClipForDay;
  }

  if (existingIndex !== -1) {
    // Preserve existing clip(s) if not being overwritten
    const ex = checkpoints[existingIndex];
    if (!newCheckpoint.clip && ex.clip) newCheckpoint.clip = ex.clip;
    if (!newCheckpoint.clips && ex.clips) newCheckpoint.clips = ex.clips;
    if (!newCheckpoint.clipsTitle && ex.clipsTitle) newCheckpoint.clipsTitle = ex.clipsTitle;
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
