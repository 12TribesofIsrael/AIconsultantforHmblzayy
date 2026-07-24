/**
 * Reconcile tracker mileage against Zay's real Strava distances.
 *
 * WHY THIS EXISTS
 * The tracker estimates each leg as straight-line distance * 1.3 (see
 * lib/geo.js estimatedRoadMiles). Measured against Strava for Jul 1-23 2026
 * that ran 8.5% high (733 est vs 675.6 real over 22 days), and in the worst
 * cases it was structurally wrong — Days 110/111 were recorded at the same
 * town with ZERO miles while he actually walked 21.64 + 32.18, then 86 miles
 * were dumped into Day 112 to compensate.
 *
 * Strava has no API for reading ANOTHER athlete's activities (the friends
 * feed was removed in API v3), and Zay's profile is login-walled, so this
 * cannot be automated. Instead: paste his activity feed into a text file and
 * run this. Thirty seconds, no scraper to break.
 *
 * Usage:
 *   node scripts/reconcile-strava.js --feed strava.txt              # dry run
 *   node scripts/reconcile-strava.js --feed strava.txt --apply      # write
 *
 * Dry-run is the default, per the x-daily-post.js convention — this rewrites
 * public mileage on faithwalklive.com, so it never writes by accident.
 *
 * The feed file is whatever you get by selecting Zay's Strava activity list
 * and copying it. Recognised shapes:
 *   "July 21, 2026 at 5:55 AM"  /  "Yesterday at 7:52 AM"  /  "Today at 1:09 AM"
 * followed somewhere below by a "36.60 mi" line. Monthly totals above the
 * first activity are ignored (no date in scope yet), as are Pace ("/mi") and
 * elevation ("ft") lines.
 *
 * Mileage is recomputed CUMULATIVELY forward from the last confirmed
 * checkpoint that predates the feed, so a corrected day carries through to
 * every day after it. Days inside the range with no Strava figure keep their
 * existing leg length rather than being zeroed.
 */

const fs = require('fs');
const { loadCheckpoints, rebuildAndPush, formatDate } = require('./lib/tracker');

const args = {};
process.argv.slice(2).forEach((a, i, arr) => {
  if (a.startsWith('--')) args[a.replace(/^--/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = arr[i + 1];
});
const APPLY = process.argv.includes('--apply');

if (!args.feed) {
  console.log('Usage: node scripts/reconcile-strava.js --feed <file.txt> [--apply]');
  console.log('  Paste Zay\'s Strava activity feed into <file.txt> first.');
  process.exit(1);
}

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
  'august', 'september', 'october', 'november', 'december'];

// Turn a Strava date line into the tracker's "Jul 21, 2026" format.
function parseDateLine(line) {
  const l = line.trim();
  if (/^today\b/i.test(l)) return formatDate(new Date());
  if (/^yesterday\b/i.test(l)) {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return formatDate(d);
  }
  const m = l.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})\b/);
  if (!m) return null;
  const mi = MONTHS.indexOf(m[1].toLowerCase());
  if (mi === -1) return null;
  return formatDate(new Date(Number(m[3]), mi, Number(m[2])));
}

function parseFeed(text) {
  const lines = text.split(/\r?\n/);
  const out = new Map();
  let date = null, taken = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const d = parseDateLine(line);
    if (d) { date = d; taken = false; continue; }
    // "36.60 mi" — but not "14:29 /mi" (pace) and not "685 ft" (elevation)
    const dm = line.match(/^([\d,]+(?:\.\d+)?)\s*mi$/i);
    if (dm && date && !taken) {
      out.set(date, parseFloat(dm[1].replace(/,/g, '')));
      taken = true;
    }
  }
  return out;
}

const feed = parseFeed(fs.readFileSync(args.feed, 'utf8'));
if (!feed.size) {
  console.log('No activities parsed from the feed. Check the file contents.');
  process.exit(1);
}
console.log(`Parsed ${feed.size} Strava activities.\n`);

const cps = loadCheckpoints();
const walking = cps.filter(c => !c.restOnly && c.miles != null).sort((a, b) => a.day - b.day);

const firstIdx = walking.findIndex(c => feed.has(c.date));
if (firstIdx <= 0) {
  console.log(firstIdx === -1
    ? 'No checkpoint dates match the feed — nothing to reconcile.'
    : 'Feed covers the very first checkpoint; need an earlier anchor to rebuild from.');
  process.exit(1);
}

const anchor = walking[firstIdx - 1];
console.log(`Anchor: Day ${anchor.day} — ${anchor.location} — ${anchor.miles} mi (${anchor.date})\n`);

let cum = anchor.miles;
const rows = [];
for (let i = firstIdx; i < walking.length; i++) {
  const cp = walking[i];
  const real = feed.get(cp.date);
  const oldLeg = cp.miles - walking[i - 1].miles;
  const leg = real != null ? real : oldLeg; // no Strava figure -> keep old leg
  cum += leg;
  rows.push({ cp, from: cp.miles, to: Math.round(cum), leg, measured: real != null });
}

console.log('Day  Date          Location                   Old ->  New   Leg      Source');
rows.forEach(r => console.log(
  String(r.cp.day).padEnd(5) + r.cp.date.padEnd(14) + String(r.cp.location).slice(0, 25).padEnd(27) +
  String(r.from).padStart(4) + ' -> ' + String(r.to).padStart(4) +
  String(r.leg.toFixed(2)).padStart(8) + '   ' + (r.measured ? 'strava' : 'kept-estimate')
));

const changed = rows.filter(r => r.from !== r.to);
const last = rows[rows.length - 1];
console.log(`\n${changed.length} of ${rows.length} days change.`);
console.log(`Total: ${walking[walking.length - 1].miles} -> ${last.to} mi  (${(last.to / 3000 * 100).toFixed(1)}% of 3000, ${3000 - last.to} mi to go)`);

if (!APPLY) {
  console.log('\n[DRY RUN] Nothing written. Re-run with --apply to commit and push.');
  process.exit(0);
}

rows.forEach(r => { r.cp.miles = r.to; });
rebuildAndPush(cps, `Faith Walk: reconcile mileage against Strava (${feed.size} activities, ${changed.length} days corrected)`);
console.log('\n✓ Reconciled and pushed.');
