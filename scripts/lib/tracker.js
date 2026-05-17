/**
 * Tracker file helpers — load / save checkpoints.json and orchestrate
 * commit + push + faithwalklive sync.
 *
 * v2.18.0: Local HTML rebuild stripped. faithwalklive.com is the canonical
 * public surface; docs/faith-walk-tracker.html + src/faith-walk-tracker/
 * index.html are now static redirect pages preserved only for bookmarks.
 */

const fs = require('fs');
const path = require('path');
const { commitAndPush } = require('./git-sync');
const { syncToFaithWalkLive } = require('./faithwalklive-sync');

const ROOT = path.join(__dirname, '..', '..');
const CHECKPOINTS_PATH = path.join(ROOT, 'src', 'faith-walk-tracker', 'checkpoints.json');

const TOTAL_MILES = 3000;

function loadCheckpoints() {
  return JSON.parse(fs.readFileSync(CHECKPOINTS_PATH, 'utf8'));
}

function saveCheckpoints(checkpoints) {
  fs.writeFileSync(CHECKPOINTS_PATH, JSON.stringify(checkpoints, null, 2) + '\n');
}

// Format today's date as "Apr 11, 2026"
function formatDate(d = new Date()) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// Save checkpoints, commit + push, then mirror to faithwalklive.
// The public site (Next.js on Vercel) reads checkpoints.json directly
// and rebuilds itself — no local HTML render needed here.
function rebuildAndPush(checkpoints, commitMessage) {
  saveCheckpoints(checkpoints);
  console.log('  Saved checkpoints.json');

  const pushed = commitAndPush(commitMessage);
  syncToFaithWalkLive(commitMessage);
  return pushed;
}

module.exports = {
  loadCheckpoints,
  saveCheckpoints,
  rebuildAndPush,
  formatDate,
  CHECKPOINTS_PATH,
  TOTAL_MILES,
};
