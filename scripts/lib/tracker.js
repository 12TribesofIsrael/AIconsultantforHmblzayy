/**
 * Tracker file helpers — load / save checkpoints.json, build the
 * tracker HTML by injecting data into the existing template, and
 * orchestrate the rebuild + commit + push flow.
 */

const fs = require('fs');
const path = require('path');
const { commitAndPush } = require('./git-sync');

const ROOT = path.join(__dirname, '..', '..');
const CHECKPOINTS_PATH = path.join(ROOT, 'src', 'faith-walk-tracker', 'checkpoints.json');
const TRACKER_HTML_PATH = path.join(ROOT, 'src', 'faith-walk-tracker', 'index.html');
const DOCS_HTML_PATH = path.join(ROOT, 'docs', 'faith-walk-tracker.html');

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

// Inject checkpoints + stats into the tracker HTML template.
// The display day is the in-progress day if set on the latest checkpoint,
// otherwise the latest arrival day. Total miles always shows the last
// confirmed cumulative total — never the estimate — so the headline
// number is never a guess.
function buildTrackerHTML(checkpoints) {
  const current = checkpoints[checkpoints.length - 1];
  const displayDay = current.inProgressDay || current.day;
  const remaining = TOTAL_MILES - current.miles;
  const states = new Set(checkpoints.map(cp => cp.location.split(', ')[1])).size;

  let html = fs.readFileSync(TRACKER_HTML_PATH, 'utf8');

  // Replace the CHECKPOINTS array
  const checkpointsJson = JSON.stringify(checkpoints, null, 6);
  html = html.replace(
    /const CHECKPOINTS = \[[\s\S]*?\];/,
    `const CHECKPOINTS = ${checkpointsJson};`
  );

  // Replace stat bar values. totalMiles gets a ~ prefix when the latest
  // checkpoint's mileage is an auto-promoted estimate (cleared by manual
  // --miles override).
  const milesText = (current.estimatedMiles ? '~' : '') + current.miles;
  html = html.replace(/id="currentDay">\d+/, `id="currentDay">${displayDay}`);
  html = html.replace(/id="totalMiles">~?\d+/, `id="totalMiles">${milesText}`);
  html = html.replace(/id="remaining">[\d,]+/, `id="remaining">${remaining.toLocaleString()}`);
  html = html.replace(/id="states">\d+\/10/, `id="states">${states}/10`);

  return html;
}

// Save checkpoints, rebuild HTML, commit and push.
function rebuildAndPush(checkpoints, commitMessage) {
  saveCheckpoints(checkpoints);
  console.log('  Saved checkpoints.json');

  const updatedHtml = buildTrackerHTML(checkpoints);
  fs.writeFileSync(TRACKER_HTML_PATH, updatedHtml);
  fs.writeFileSync(DOCS_HTML_PATH, updatedHtml);
  console.log('  Rebuilt tracker HTML');

  return commitAndPush(commitMessage);
}

module.exports = {
  loadCheckpoints,
  saveCheckpoints,
  buildTrackerHTML,
  rebuildAndPush,
  formatDate,
  CHECKPOINTS_PATH,
  TRACKER_HTML_PATH,
  DOCS_HTML_PATH,
  TOTAL_MILES,
};
