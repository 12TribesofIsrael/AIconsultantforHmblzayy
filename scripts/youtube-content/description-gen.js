#!/usr/bin/env node
// description-gen.js — generate YouTube description for a milestone episode or Short
//
// Usage:
//   node scripts/youtube-content/description-gen.js --day 34 --type anchor
//   node scripts/youtube-content/description-gen.js --day 52 --type milestone
//   node scripts/youtube-content/description-gen.js --day 39 --type short
//
// Reads GOFUNDME_URL from .env (or process.env).

require('dotenv').config();
const checkpoints = require('../../src/faith-walk-tracker/checkpoints.json');

const GOFUNDME_URL = process.env.GOFUNDME_URL || '[GOFUNDME_URL — add to .env]';
const FAITHWALK_URL = 'https://faithwalklive.com';

const args = process.argv.slice(2);
const dayArg  = args[args.indexOf('--day')  + 1];
const typeArg = args[args.indexOf('--type') + 1] || 'milestone';

if (!dayArg) {
  console.error('Usage: node description-gen.js --day N --type anchor|milestone|short');
  process.exit(1);
}

const day = parseInt(dayArg, 10);
const cp = checkpoints.find(c => c.day === day);
if (!cp) {
  console.error(`Day ${day} not found in checkpoints.json`);
  process.exit(1);
}

const location = cp.location || '';
const miles    = cp.miles   || '';
const date     = cp.date    || '';
const credit   = 'Content used with permission from @hmblzayy / HMBL Clothing.';
const tags     = '#FaithWalk #MinisterZay #HMBL #Faith #3000Miles #FaithWalkLive';
const shortTags = '#Shorts #FaithWalk #MinisterZay #HMBL #Faith';

// ─── Templates ─────────────────────────────────────────────────────────────

function anchorDescription() {
  return `\
On April 28, 2026 — Day 34 of his 3,000-mile walk from Philadelphia to California — Minister Zay was struck by a vehicle on the route. He was hospitalized. His walk paused.

5 days later, he was back on his feet.

🙏 Follow the walk LIVE → ${FAITHWALK_URL}
💛 Support the walk → ${GOFUNDME_URL}
📍 Live map → ${FAITHWALK_URL}/map
📰 Full incident update → ${FAITHWALK_URL}/updates/april-28-incident

Minister Zay (@ministerzay on IG / @hmblzayy on Twitch) is walking 3,000 miles from Philadelphia, PA to California — streaming every day.
${credit}

${tags}`;
}

function milestoneDescription() {
  const intro = miles
    ? `Day ${day} of Minister Zay's 3,000-mile Faith Walk. ${location} — ${miles} miles walked.`
    : `Day ${day} of Minister Zay's 3,000-mile Faith Walk. ${location}.`;

  return `\
${intro}

Minister Zay (@hmblzayy on Twitch / @ministerzay on IG) is walking from Philadelphia, PA to California, streaming every day. This is Day ${day}${date ? ` — ${date}` : ''}.

🙏 Follow the walk LIVE → ${FAITHWALK_URL}
💛 Support the walk → ${GOFUNDME_URL}
📍 Live map → ${FAITHWALK_URL}/map
📰 Updates → ${FAITHWALK_URL}/updates/april-28-incident

${credit}

${tags}`;
}

function shortDescription() {
  return `\
Day ${day} of Minister Zay's 3,000-mile walk 🙏${miles ? ` — ${miles} miles in.` : ''}

📍 Live map + full story → ${FAITHWALK_URL}
💛 Support the walk → ${GOFUNDME_URL}

${shortTags}`;
}

// ─── Output ────────────────────────────────────────────────────────────────

const descriptions = { anchor: anchorDescription, milestone: milestoneDescription, short: shortDescription };
const fn = descriptions[typeArg];
if (!fn) {
  console.error(`Unknown type "${typeArg}". Use: anchor | milestone | short`);
  process.exit(1);
}

console.log('\n' + '─'.repeat(60));
console.log(`YouTube description — Day ${day} (${typeArg})`);
console.log('─'.repeat(60) + '\n');
console.log(fn());
console.log('\n' + '─'.repeat(60) + '\n');
