/**
 * Book repo cross-repo sync.
 *
 * The book itself lives in a separate PRIVATE repo (sibling directory
 * `../faithwalkbook`). Source material for the book — deliverables
 * timeline, faith-walk timeline, strategic timeline — is derived from
 * this consulting repo's git history, checkpoints, and changelog, so
 * it lives here in `book/source-material/`. This helper mirrors that
 * folder into the book repo under `source-material/`, commits, and
 * pushes so the book repo always has the freshest research material.
 *
 * Behavior mirrors faithwalklive-sync:
 *  - No-op (with friendly log) if the sibling repo isn't present.
 *  - Stashes unrelated working-tree changes in the book repo before
 *    rebasing on origin, then restores them after push.
 *  - Idempotent: if nothing changed, no commit, no push.
 *  - Errors are logged but never block the consulting repo's work —
 *    the book sync is best-effort.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const BOOK_REPO = path.resolve(REPO_ROOT, '..', 'faithwalkbook');
const SOURCE_DIR = path.join(REPO_ROOT, 'book', 'source-material');
const TARGET_DIR = path.join(BOOK_REPO, 'source-material');
const STASH_LABEL = 'faithwalkbook-sync-auto-stash';

function git(args, { allowFail = false } = {}) {
  const r = spawnSync('git', args, { cwd: BOOK_REPO, encoding: 'utf8' });
  if (r.status !== 0 && !allowFail) {
    const err = new Error(`git ${args.join(' ')} failed: ${r.stderr.trim() || r.stdout.trim()}`);
    err.stderr = r.stderr;
    throw err;
  }
  return { stdout: (r.stdout || '').trim(), stderr: (r.stderr || '').trim(), status: r.status };
}

function copyDirRecursive(src, dst) {
  if (!fs.existsSync(src)) return 0;
  fs.mkdirSync(dst, { recursive: true });
  let copied = 0;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copied += copyDirRecursive(s, d);
    } else if (entry.isFile()) {
      fs.copyFileSync(s, d);
      copied += 1;
    }
  }
  return copied;
}

function syncToBookRepo(commitMessage) {
  if (!fs.existsSync(path.join(BOOK_REPO, '.git'))) {
    console.log('  faithwalkbook repo not found at ../faithwalkbook — skipping book sync.');
    return;
  }
  if (!fs.existsSync(SOURCE_DIR)) {
    console.log('  book/source-material/ missing — nothing to sync.');
    return;
  }

  console.log('\nSyncing source material to faithwalkbook...');
  let stashed = false;

  try {
    git(['fetch', 'origin', 'main']);

    const dirty = git(['status', '--porcelain']).stdout;
    if (dirty) {
      git(['stash', 'push', '-u', '-m', STASH_LABEL]);
      stashed = true;
    }

    git(['pull', '--rebase', 'origin', 'main'], { allowFail: true });

    const count = copyDirRecursive(SOURCE_DIR, TARGET_DIR);

    const changed = git(['status', '--porcelain', 'source-material']).stdout;
    if (!changed) {
      console.log('  faithwalkbook source-material already up-to-date.');
      return;
    }

    git(['add', 'source-material']);
    git(['commit', '-m', commitMessage]);
    git(['push', 'origin', 'main']);
    console.log(`  Pushed ${count} file(s) to faithwalkbook.`);
  } catch (err) {
    console.log('  ⚠  faithwalkbook sync failed: ' + err.message);
    console.log('     Consulting-repo work succeeded; sync the book manually.');
  } finally {
    if (stashed) {
      const pop = git(['stash', 'pop'], { allowFail: true });
      if (pop.status !== 0) {
        console.log('  ⚠  faithwalkbook stash pop failed — check `git -C ../faithwalkbook stash list`.');
      }
    }
  }
}

module.exports = { syncToBookRepo };
