/**
 * Git sync helpers — keep local main up to date with origin before
 * mutating tracker files, and commit/push the results.
 */

const { execSync } = require('child_process');

// Pull origin/main with rebase. Refuses to run if working tree is dirty.
// Exits the process with a clear message on any failure.
function syncWithRemote() {
  console.log('Syncing with origin/main...');
  try {
    const dirty = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    if (dirty) {
      console.log('  Uncommitted local changes detected:');
      console.log(dirty.split('\n').map(l => '    ' + l).join('\n'));
      console.log('  Commit or stash them before running this script.');
      process.exit(1);
    }
    execSync('git fetch origin main', { stdio: 'pipe' });
    execSync('git pull --rebase origin main', { stdio: 'pipe' });
    console.log('  Up to date with origin/main.\n');
  } catch (err) {
    console.log('  Failed to sync with origin/main:');
    console.log('  ' + (err.stderr?.toString() || err.message));
    console.log('  Resolve the git state manually before re-running.');
    process.exit(1);
  }
}

// Stage the tracker files, commit with the given message, push to origin.
// Returns true on success, false if push failed.
function commitAndPush(message) {
  console.log('\nPushing to GitHub...');
  try {
    execSync('git add src/faith-walk-tracker/ docs/faith-walk-tracker.html', { stdio: 'pipe' });
    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { stdio: 'pipe' });
    execSync('git push origin main', { stdio: 'pipe' });
    console.log('  Pushed! Site will update in ~1 minute.');
    return true;
  } catch (err) {
    console.log('  Git push failed — you may need to push manually.');
    return false;
  }
}

module.exports = { syncWithRemote, commitAndPush };
