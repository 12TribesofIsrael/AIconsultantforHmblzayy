/**
 * Faith Walk Live cross-repo sync.
 *
 * faithwalklive.com is a separate Next.js repo (sibling directory
 * `../faithwalklivecom`) that reads its own copy of checkpoints.json
 * from `src/data/checkpoints.json`. Updates to the consulting repo
 * don't propagate automatically — this helper copies the latest
 * checkpoints over, commits in that repo, and pushes so Vercel
 * triggers a redeploy.
 *
 * Behavior:
 *  - No-op (with a friendly log) if the sibling repo isn't present.
 *  - Stashes any unrelated working-tree changes in faithwalklive
 *    before rebasing on origin, then restores them after push.
 *    Your in-progress edits in the public site repo are preserved.
 *  - Idempotent: if the source and target checkpoints already match,
 *    no commit and no push.
 *  - Errors are logged but never block the consulting repo's own
 *    commit/push — the public sync is best-effort.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FAITHWALK_REPO = path.resolve(REPO_ROOT, '..', 'faithwalklivecom');
const SOURCE_CHECKPOINTS = path.join(REPO_ROOT, 'src', 'faith-walk-tracker', 'checkpoints.json');
const TARGET_CHECKPOINTS = path.join(FAITHWALK_REPO, 'src', 'data', 'checkpoints.json');
const STASH_LABEL = 'faithwalklive-sync-auto-stash';

function git(args, { allowFail = false } = {}) {
  const r = spawnSync('git', args, { cwd: FAITHWALK_REPO, encoding: 'utf8' });
  if (r.status !== 0 && !allowFail) {
    const err = new Error(`git ${args.join(' ')} failed: ${r.stderr.trim() || r.stdout.trim()}`);
    err.stderr = r.stderr;
    throw err;
  }
  return { stdout: (r.stdout || '').trim(), stderr: (r.stderr || '').trim(), status: r.status };
}

function syncToFaithWalkLive(commitMessage) {
  if (!fs.existsSync(path.join(FAITHWALK_REPO, '.git'))) {
    console.log('  faithwalklive repo not found at ../faithwalklivecom — skipping public sync.');
    return;
  }
  if (!fs.existsSync(TARGET_CHECKPOINTS)) {
    console.log('  faithwalklive checkpoints.json missing — skipping public sync.');
    return;
  }

  console.log('\nSyncing to faithwalklive.com...');
  let stashed = false;

  try {
    git(['fetch', 'origin', 'main']);

    const dirty = git(['status', '--porcelain']).stdout;
    if (dirty) {
      git(['stash', 'push', '-u', '-m', STASH_LABEL]);
      stashed = true;
    }

    git(['pull', '--rebase', 'origin', 'main']);

    fs.copyFileSync(SOURCE_CHECKPOINTS, TARGET_CHECKPOINTS);

    const changed = git(['status', '--porcelain', 'src/data/checkpoints.json']).stdout;
    if (!changed) {
      console.log('  faithwalklive already up-to-date.');
      return;
    }

    git(['add', 'src/data/checkpoints.json']);
    git(['commit', '-m', commitMessage]);
    git(['push', 'origin', 'main']);
    console.log('  Pushed to faithwalklive — Vercel redeploy in ~1 min.');
  } catch (err) {
    console.log('  ⚠  faithwalklive sync failed: ' + err.message);
    console.log('     Consulting-repo push succeeded; sync the public site manually.');
  } finally {
    if (stashed) {
      const pop = git(['stash', 'pop'], { allowFail: true });
      if (pop.status !== 0) {
        console.log('  ⚠  faithwalklive stash pop failed — check `git -C ../faithwalklivecom stash list`.');
      }
    }
  }
}

module.exports = { syncToFaithWalkLive };
