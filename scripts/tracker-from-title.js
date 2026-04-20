/**
 * Title-driven tracker update
 *
 * Pulls Zay's live Twitch stream title, parses out the day number,
 * destination city, and miles remaining, then updates the tracker
 * honestly:
 *
 * - In-progress days get annotated on the latest confirmed checkpoint
 *   (the map pin stays where he last actually was — never lies about
 *   his position).
 * - When the day rolls over (Twitch title shows day N+2 while latest
 *   confirmed is day N), yesterday's destination is auto-promoted to a
 *   real Day N+1 arrival with an estimated mileage marked `estimatedMiles:
 *   true`. Manual `update-tracker.js --day --location --miles` clears that
 *   flag.
 *
 * Usage:
 *   node scripts/tracker-from-title.js
 *
 * No required args. Idempotent — if nothing changed since last run, no
 * commit and no push.
 */

const { syncWithRemote } = require('./lib/git-sync');
const { fetchStreamTitle, parseStreamTitle } = require('./lib/twitch');
const { geocode, estimatedRoadMiles } = require('./lib/geo');
const { loadCheckpoints, rebuildAndPush, formatDate } = require('./lib/tracker');

// Convert "Apr 11, 2026" or ISO date to display string
function dateFromIso(iso) {
  if (!iso) return null;
  return formatDate(new Date(iso));
}

// Apply or update in-progress annotation on `latest`. Returns true if any
// field actually changed (so the caller knows whether to push).
async function annotateInProgress(latest, parsed) {
  const changed = {};
  let didChange = false;

  // Geocode destination if missing or destination changed
  const needGeocode =
    !latest.destinationLat ||
    !latest.destinationLng ||
    latest.destination !== parsed.nearLocation;

  if (needGeocode) {
    console.log(`  Geocoding "${parsed.nearLocation}"...`);
    const coords = await geocode(parsed.nearLocation);
    console.log(`    ${coords.lat}, ${coords.lng}`);
    if (latest.destinationLat !== coords.lat) didChange = true;
    if (latest.destinationLng !== coords.lng) didChange = true;
    latest.destinationLat = coords.lat;
    latest.destinationLng = coords.lng;
  }

  if (latest.destination !== parsed.nearLocation) {
    latest.destination = parsed.nearLocation;
    didChange = true;
  }
  if (latest.inProgressDay !== parsed.day) {
    latest.inProgressDay = parsed.day;
    didChange = true;
  }
  if (latest.milesRemaining !== parsed.milesFromNext) {
    latest.milesRemaining = parsed.milesFromNext;
    didChange = true;
  }

  // Compute estimated segment miles from latest's confirmed lat/lng to
  // the destination. Only re-compute when destination changed.
  if (needGeocode || latest.estimatedSegmentMiles == null) {
    const seg = Math.round(estimatedRoadMiles(
      latest.lat, latest.lng,
      latest.destinationLat, latest.destinationLng
    ));
    if (latest.estimatedSegmentMiles !== seg) {
      latest.estimatedSegmentMiles = seg;
      didChange = true;
    }
  }

  if (!latest.inProgressStartedAt) {
    latest.inProgressStartedAt = new Date().toISOString();
    didChange = true;
  }

  // Clear rest-day flag if it was set — he's walking now
  if (latest.restDay) {
    delete latest.restDay;
    didChange = true;
  }
  if (latest.restDayDate) {
    delete latest.restDayDate;
    didChange = true;
  }

  return didChange;
}

// Apply rest-day annotation to the latest checkpoint. Strips any
// walking-specific in-progress fields (destination, miles-remaining)
// since today is not a walking day.
function applyRestDay(latest, parsed) {
  let didChange = false;

  if (latest.inProgressDay !== parsed.day) {
    latest.inProgressDay = parsed.day;
    didChange = true;
  }
  if (latest.restDay !== true) {
    latest.restDay = true;
    didChange = true;
  }

  // Rest day = no walking destination. Clear any heading-to fields
  // that might be left over from a previous in-progress annotation.
  const walkingFields = ['destination', 'destinationLat', 'destinationLng', 'milesRemaining', 'estimatedSegmentMiles'];
  for (const f of walkingFields) {
    if (latest[f] != null) {
      delete latest[f];
      didChange = true;
    }
  }

  if (!latest.inProgressStartedAt) {
    latest.inProgressStartedAt = new Date().toISOString();
    didChange = true;
  }

  // Human-readable local date for display on the rest-day card. Set once
  // per rest day; stays stable across re-runs so multiple polls don't
  // cause tz-dependent flicker.
  if (!latest.restDayDate) {
    latest.restDayDate = formatDate();
    didChange = true;
  }

  return didChange;
}

async function main() {
  syncWithRemote();

  console.log('Fetching Twitch stream title...');
  const { title, isLive, viewers } = await fetchStreamTitle();
  console.log(`  ${isLive ? `🔴 LIVE (${viewers} viewers)` : '⚫ Offline'}`);
  console.log(`  Title: ${title || '(none)'}\n`);

  const parsed = parseStreamTitle(title);
  if (!parsed) {
    console.log('Could not parse Faith Walk data from title — nothing to do.');
    return;
  }

  const isWalkingUpdate = parsed.nearLocation && parsed.milesFromNext != null;
  const isRestUpdate = parsed.restDay === true;

  if (!parsed.day || (!isWalkingUpdate && !isRestUpdate)) {
    console.log(`Title incomplete: day=${parsed.day} restDay=${!!parsed.restDay} dest=${parsed.nearLocation} miles=${parsed.milesFromNext}`);
    console.log('Need day + (destination+miles OR rest-day marker) — skipping.');
    return;
  }

  if (isRestUpdate) {
    console.log(`Parsed: Day ${parsed.day}, REST DAY 💤\n`);
  } else {
    console.log(`Parsed: Day ${parsed.day}, → ${parsed.nearLocation}, ${parsed.milesFromNext} mi remaining\n`);
  }

  const checkpoints = loadCheckpoints();
  if (checkpoints.length === 0) {
    console.log('No checkpoints exist yet — log Day 1 first with update-tracker.js.');
    process.exit(1);
  }

  let latest = checkpoints[checkpoints.length - 1];

  // Case 1: title day matches latest arrival day exactly
  // (e.g. Zay logged Day 17 manually, and the title still says Day 17).
  // Nothing to update — he's already arrived.
  if (parsed.day === latest.day) {
    console.log(`Title day (${parsed.day}) matches latest arrival day. Nothing to update.`);
    return;
  }

  // Case 2: title day is BEHIND latest arrival day
  // (shouldn't happen — maybe stale title). Skip.
  if (parsed.day < latest.day) {
    console.log(`Title day (${parsed.day}) is behind latest arrival (${latest.day}). Skipping.`);
    return;
  }

  // Case 3: title day is exactly latest.day + 1 — annotate in-progress
  if (parsed.day === latest.day + 1) {
    if (isRestUpdate) {
      console.log(`Rest day: annotating Day ${latest.day} (${latest.location}) as Day ${parsed.day} — REST DAY 💤`);
      const changed = applyRestDay(latest, parsed);
      if (!changed) {
        console.log('  No semantic change — skipping push.');
        return;
      }
      rebuildAndPush(
        checkpoints,
        `Faith Walk: Day ${parsed.day} — rest day at ${latest.location}`
      );
      console.log(`\n✓ Rest day annotated.`);
      console.log(`  Live at: https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html`);
      return;
    }

    console.log(`In-progress: annotating Day ${latest.day} (${latest.location}) for Day ${parsed.day} → ${parsed.nearLocation}`);
    const changed = await annotateInProgress(latest, parsed);
    if (!changed) {
      console.log('  No semantic change — skipping push.');
      return;
    }
    console.log(`  Day ${parsed.day} → ${parsed.nearLocation} (~${latest.estimatedSegmentMiles} mi est, ${parsed.milesFromNext} mi to go)`);
    rebuildAndPush(
      checkpoints,
      `Faith Walk: Day ${parsed.day} in progress — ${parsed.milesFromNext} mi to ${parsed.nearLocation}`
    );
    console.log(`\n✓ In-progress updated.`);
    console.log(`  Live at: https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html`);
    return;
  }

  // Case 4: title day is latest.day + 2 or more — day rolled over while
  // latest was in-progress. Promote yesterday's destination to a real
  // arrival, then annotate the new latest with the current title.
  if (parsed.day >= latest.day + 2) {
    // Rest-day rollover: yesterday was a rest day, today he's walking.
    // Don't create a new arrival checkpoint — rest days don't represent
    // travel. But DO preserve the concluded rest day as a rest-only
    // entry so it stays visible in the card-row calendar, then clear
    // rest fields and annotate the in-progress walking state.
    if (latest.restDay && !latest.destination) {
      if (isRestUpdate) {
        // Still rest day but day number advanced (second rest day).
        console.log(`Rest-day continuation: Day ${parsed.day} still resting at ${latest.location}`);
        const changed = applyRestDay(latest, parsed);
        if (!changed) { console.log('  No semantic change — skipping push.'); return; }
        rebuildAndPush(checkpoints, `Faith Walk: Day ${parsed.day} — rest day at ${latest.location}`);
        console.log(`\n✓ Rest day annotated.`);
        return;
      }

      // Preserve concluded rest day as a rest-only entry (if not already
      // recorded), so the card row keeps a continuous date calendar.
      const restDate = latest.restDayDate || formatDate();
      const alreadyRecorded = checkpoints.some(cp => cp.restOnly && cp.date === restDate);
      if (!alreadyRecorded) {
        const restEntry = {
          restOnly: true,
          date: restDate,
          location: latest.location,
          lat: latest.lat,
          lng: latest.lng,
          miles: latest.miles,
        };
        // Preserve the Twitch-assigned day number (e.g. "Day 19") on
        // the archived rest entry so its card shows "Day 19 · REST"
        // and popups can show "Day 18-19" ranges.
        if (latest.inProgressDay) restEntry.day = latest.inProgressDay;
        if (latest.restDayClip) restEntry.clip = latest.restDayClip;
        checkpoints.push(restEntry);
        console.log(`  Archived rest day as rest-only entry: Day ${latest.inProgressDay || '?'}, ${restDate}`);
      }
      delete latest.restDayClip; // clip moved to the rest-only entry

      // Find the walking checkpoint again — the rest-only entry just
      // shifted it from "last" but the reference is still the same object.
      console.log(`Rest-day rollover: Day ${latest.inProgressDay || 'N/A'} (rest) → Day ${parsed.day} walking to ${parsed.nearLocation}`);
      const changed = await annotateInProgress(latest, parsed);
      if (!changed) { console.log('  No semantic change — skipping push.'); return; }
      console.log(`  Day ${parsed.day} → ${parsed.nearLocation} (~${latest.estimatedSegmentMiles} mi est, ${parsed.milesFromNext} mi to go)`);
      rebuildAndPush(
        checkpoints,
        `Faith Walk: Day ${parsed.day} in progress — ${parsed.milesFromNext} mi to ${parsed.nearLocation} (after rest)`
      );
      console.log(`\n✓ Rest-day rollover + Day ${parsed.day} annotated.`);
      console.log(`  Live at: https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html`);
      return;
    }

    // In-progress state may live on an earlier walking checkpoint if
    // rest-only archives have been pushed since (Day 18 walking w/
    // inProgressDay=20, then Day 19 rest-only archived → latest=rest,
    // but the Day 20 in-progress fields are still on Day 18).
    let ipSource = latest;
    if (latest.restOnly || !latest.destination || !latest.inProgressDay) {
      for (let i = checkpoints.length - 1; i >= 0; i--) {
        const cp = checkpoints[i];
        if (!cp.restOnly && cp.destination && cp.inProgressDay) {
          ipSource = cp;
          break;
        }
      }
    }

    if (!ipSource.destination || !ipSource.inProgressDay) {
      console.log(`Day rollover detected (latest=${latest.day}, title=${parsed.day}) but no in-progress data to promote.`);
      console.log(`Manual update needed: npm run tracker:update -- --day ${latest.day + 1} --location "City, ST" --miles XXX`);
      process.exit(1);
    }

    const promoted = {
      day: ipSource.inProgressDay,
      location: ipSource.destination,
      lat: ipSource.destinationLat,
      lng: ipSource.destinationLng,
      miles: ipSource.miles + Math.round(ipSource.estimatedSegmentMiles || 0),
      date: dateFromIso(ipSource.inProgressStartedAt) || formatDate(),
      estimatedMiles: true,
    };
    if (ipSource.inProgressClip) promoted.clip = ipSource.inProgressClip;

    // Strip in-progress fields from the source checkpoint
    delete ipSource.inProgressDay;
    delete ipSource.destination;
    delete ipSource.destinationLat;
    delete ipSource.destinationLng;
    delete ipSource.milesRemaining;
    delete ipSource.estimatedSegmentMiles;
    delete ipSource.inProgressStartedAt;
    delete ipSource.inProgressClip;

    checkpoints.push(promoted);
    console.log(`Promoted Day ${promoted.day} → ${promoted.location} (~${promoted.miles} mi est)`);

    // Re-target latest to the freshly promoted checkpoint and annotate
    // it with the current title's in-progress state.
    latest = promoted;
    await annotateInProgress(latest, parsed);

    rebuildAndPush(
      checkpoints,
      `Faith Walk: promoted Day ${promoted.day} to ${promoted.location} (~${promoted.miles} mi est), Day ${parsed.day} in progress`
    );
    console.log(`\n✓ Rollover applied + Day ${parsed.day} annotated.`);
    console.log(`  Live at: https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html`);
    return;
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
