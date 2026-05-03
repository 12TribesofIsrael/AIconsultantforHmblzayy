/**
 * Daily X (Twitter) post — AI Bible Gospels canonical voice for the Faith Walk.
 *
 * Reads the latest confirmed checkpoint from src/faith-walk-tracker/checkpoints.json,
 * pulls today's verse from docs/walk-verses.json (verified against the
 * 1611 KJV PDF on every run), renders a tweet, and either prints (dry-run)
 * or posts via the X v2 API.
 *
 * Idempotency: every successful post is logged in
 * src/faith-walk-tracker/x-post-log.json keyed by `day-{N}`. Re-running for
 * the same day is a no-op.
 *
 * Usage:
 *   node scripts/x-daily-post.js                  # post live (requires .env)
 *   node scripts/x-daily-post.js --dry-run        # render only, no API call
 *   node scripts/x-daily-post.js --dry-run --day 36   # render specific day
 *   node scripts/x-daily-post.js --no-premium     # use thread-reply for the link
 *
 * Defaults: Premium mode ON (link included in main tweet). The plan budgets
 * X Premium at $14/mo because non-Premium accounts get 30-50% reach penalty
 * on links — without Premium, the whole tracker-clicks thesis collapses.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { postTweet, postThread } = require('./lib/x-client');

const ROOT = path.join(__dirname, '..');
const CHECKPOINTS_PATH = path.join(ROOT, 'src', 'faith-walk-tracker', 'checkpoints.json');
const POST_LOG_PATH = path.join(ROOT, 'src', 'faith-walk-tracker', 'x-post-log.json');
const VERSES_PATH = path.join(ROOT, 'docs', 'walk-verses.json');
const KJV_PDF_PATH = path.join(ROOT, 'docs', '1611KjvW_apocrypha.pdf');

// Identity strings — must match docs/aeo-youtube-description-spec.md verbatim.
const HANDLE = '@AIBIBLEGOSPELS';
const TRACKER_DOMAIN = 'faithwalklive.com';

// CLI flags
const DRY_RUN = process.argv.includes('--dry-run');
const NO_PREMIUM = process.argv.includes('--no-premium');
const ALLOW_PAUSED = process.argv.includes('--allow-paused');
const dayFlag = process.argv.indexOf('--day');
const FORCE_DAY = dayFlag !== -1 ? parseInt(process.argv[dayFlag + 1]) : null;

// Walk back from end of checkpoints array to find the latest confirmed
// (non-in-progress) entry with a `day` field. Rest-only days are tweetable
// — they're part of the story.
function findLatestTweetableCheckpoint(checkpoints, forceDay = null) {
  if (forceDay) {
    const match = checkpoints.find(c => c.day === forceDay);
    if (!match) throw new Error(`No checkpoint found for day ${forceDay}`);
    return match;
  }
  for (let i = checkpoints.length - 1; i >= 0; i--) {
    const c = checkpoints[i];
    // Skip annotation-only entries that have inProgressDay set without a
    // confirmed day of their own, or skip any entry whose day is still in
    // progress (we only tweet confirmed arrivals to honor the public-copy-
    // safety rule: never narrate Zay's real-time location).
    if (c.inProgressDay) continue;
    if (typeof c.day === 'number') return c;
  }
  throw new Error('No tweetable checkpoint found in checkpoints.json');
}

// Load post log (idempotency).
function loadPostLog() {
  if (!fs.existsSync(POST_LOG_PATH)) return {};
  return JSON.parse(fs.readFileSync(POST_LOG_PATH, 'utf8'));
}

function savePostLog(log) {
  fs.writeFileSync(POST_LOG_PATH, JSON.stringify(log, null, 2) + '\n');
}

// Look up verse for the day, then verify the cached text appears in the
// PDF on every run. If verification fails, refuse to post — the rule is
// the PDF is the source of truth, not the JSON.
function getVerifiedVerse(day) {
  const verses = JSON.parse(fs.readFileSync(VERSES_PATH, 'utf8'));
  const entry = verses[String(day)];
  if (!entry) {
    throw new Error(`No verse mapped for day ${day} in docs/walk-verses.json — add a {ref, text} entry sourced from the KJV PDF.`);
  }
  if (!entry.ref || !entry.text) {
    throw new Error(`Day ${day} verse entry malformed — needs {ref, text}.`);
  }

  // 32MB buffer — the 1611 KJV+Apocrypha extracts to ~5MB but stays well
  // under this. Default 1MB throws ENOBUFS.
  const pdfText = execSync(`pdftotext "${KJV_PDF_PATH}" -`, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  const norm = s => s.replace(/\s+/g, ' ').replace(/[‘’“”]/g, '"').trim();
  const haystack = norm(pdfText);
  // Check the first 60 chars verbatim — enough to confirm the verse is
  // really in the PDF without being thrown by line-wrap quirks.
  const needle = norm(entry.text).slice(0, 60);
  if (!haystack.includes(needle)) {
    throw new Error(`Day ${day} verse "${entry.ref}" failed PDF verification. Re-extract from docs/1611KjvW_apocrypha.pdf and update docs/walk-verses.json.`);
  }
  return entry;
}

// Build the daily tweet. Tries to fit the full verse text first; if it
// overflows 280 chars, falls back to a verse-reference-only mode that
// drives readers to the tracker for the full quote.
function buildTweet({ checkpoint, verse, premium, day }) {
  const utm = `utm_source=x&utm_medium=tweet&utm_campaign=faithwalk-day-${day}`;
  const trackerUrl = `https://${TRACKER_DOMAIN}/?${utm}`;

  const restDay = !!checkpoint.restOnly;
  const headline = restDay
    ? `Day ${day} — Rest day in ${checkpoint.location}. ${checkpoint.miles} miles in.`
    : `Day ${day} of the Faith Walk — ${checkpoint.miles} miles in. ${checkpoint.location}.`;

  // Try full verse first.
  const fullVerse = `"${verse.text}" — ${verse.ref}`;
  const linkLine = premium ? trackerUrl : `Live tracker → ${TRACKER_DOMAIN}`;
  const handleLine = HANDLE;

  const fullCandidate = [headline, '', fullVerse, '', linkLine, handleLine].join('\n');
  if (fullCandidate.length <= 280) {
    return { mainText: fullCandidate, replyText: null };
  }

  // Fall back to reference-only mode. Verse text lives at the tracker.
  const refOnly = `Verse for the day → ${verse.ref}`;
  const compactCandidate = [headline, '', refOnly, '', linkLine, handleLine].join('\n');
  if (compactCandidate.length <= 280) {
    return { mainText: compactCandidate, replyText: null };
  }

  // Last-resort: drop the verse line from the main tweet entirely.
  const minimal = [headline, '', linkLine, handleLine].join('\n');
  if (minimal.length > 280) {
    throw new Error(`Even the minimal tweet exceeds 280 chars (${minimal.length}). Shorten the headline.`);
  }
  return { mainText: minimal, replyText: refOnly };
}

// Build a thread-reply tweet for free-tier (non-Premium) accounts: main
// tweet has no link (avoids 30-50% reach suppression), reply carries the
// link with utm_medium=tweet-reply for attribution.
function buildFreeTierThread({ checkpoint, verse, day }) {
  const main = buildTweet({ checkpoint, verse, premium: false, day });
  const utm = `utm_source=x&utm_medium=tweet-reply&utm_campaign=faithwalk-day-${day}`;
  const replyText = `Live tracker → https://${TRACKER_DOMAIN}/?${utm}`;
  if (replyText.length > 280) {
    throw new Error(`Reply text exceeds 280 chars (${replyText.length}).`);
  }
  return [{ text: main.mainText }, { text: replyText }];
}

async function main() {
  console.log(`X daily poster — ${DRY_RUN ? 'DRY-RUN' : 'LIVE'} mode${NO_PREMIUM ? ', free-tier thread' : ', Premium single-tweet'}`);

  const checkpoints = JSON.parse(fs.readFileSync(CHECKPOINTS_PATH, 'utf8'));
  const checkpoint = findLatestTweetableCheckpoint(checkpoints, FORCE_DAY);
  const day = checkpoint.day;
  console.log(`  Latest tweetable: Day ${day} — ${checkpoint.location} — ${checkpoint.miles} mi (${checkpoint.restOnly ? 'rest' : 'walking'})`);

  if (checkpoint.paused && !ALLOW_PAUSED) {
    console.log(`  Day ${day} carries paused: true. Refusing to auto-post.`);
    console.log(`  A generic walk-day tweet during a public news cycle would land tone-deaf.`);
    console.log(`  To craft a tasteful manual paused-day post, re-run with --allow-paused.`);
    return;
  }

  const log = loadPostLog();
  const logKey = `day-${day}`;
  if (log[logKey] && !DRY_RUN) {
    console.log(`  Already posted for day ${day} (id=${log[logKey].id}, posted at ${log[logKey].postedAt}). Skipping.`);
    return;
  }

  const verse = getVerifiedVerse(day);
  console.log(`  Verse: ${verse.ref} (verified against PDF)`);

  if (NO_PREMIUM) {
    const tweets = buildFreeTierThread({ checkpoint, verse, day });
    console.log(`  Thread mode — ${tweets.length} tweets`);
    const result = await postThread(tweets, { dryRun: DRY_RUN });
    if (!DRY_RUN) {
      log[logKey] = { id: result[0].id, replyId: result[1]?.id, postedAt: new Date().toISOString(), mode: 'thread' };
      savePostLog(log);
      console.log(`  Posted thread. Main: ${result[0].id}`);
    }
  } else {
    const { mainText, replyText } = buildTweet({ checkpoint, verse, premium: true, day });
    if (replyText) {
      // Verse fell to a reply even on Premium because the headline+link was tight.
      const tweets = [{ text: mainText }, { text: replyText }];
      const result = await postThread(tweets, { dryRun: DRY_RUN });
      if (!DRY_RUN) {
        log[logKey] = { id: result[0].id, replyId: result[1]?.id, postedAt: new Date().toISOString(), mode: 'premium-thread' };
        savePostLog(log);
        console.log(`  Posted thread. Main: ${result[0].id}`);
      }
    } else {
      const result = await postTweet({ text: mainText, dryRun: DRY_RUN });
      if (!DRY_RUN) {
        log[logKey] = { id: result.id, postedAt: new Date().toISOString(), mode: 'premium-single' };
        savePostLog(log);
        console.log(`  Posted. Tweet: ${result.id}`);
      }
    }
  }
}

main().catch(err => {
  console.error(`X daily poster failed: ${err.message}`);
  process.exit(1);
});
