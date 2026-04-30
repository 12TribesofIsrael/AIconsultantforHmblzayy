#!/usr/bin/env node
/**
 * Daily recovery-entry append for the Apr 28 incident page.
 *
 * What it does:
 *   1. Reads today's date (UTC, YYYY-MM-DD).
 *   2. Reads the body line — either from `--body "..."` arg or stdin prompt.
 *   3. Appends a new {date, body} entry to `aprilTwentyEightRecovery`
 *      in `../faithwalklivecom/src/data/updates.ts`.
 *   4. Pulls --rebase, commits, pushes the sibling repo.
 *
 * Why:
 *   The /updates/april-28-incident NewsArticle page has a recovery timeline
 *   that's the canonical surface for daily news-cycle updates. A new entry
 *   bumps NewsArticle.dateModified (build-time `Date().toISOString()`) and
 *   sitemap.lastModified (max recovery date), maintaining freshness signals
 *   for Search + Discover for the ~7-day news-event search demand window.
 *   Combined with `getStats().recoveryDay`, the homepage stat bar advances
 *   daily ("Day 35 · Recovery Day 1", "Day 36 · Recovery Day 2", ...) so
 *   the tracker stays visibly alive while the walk is paused.
 *
 * Usage:
 *   npm run recovery:append                    # interactive prompt
 *   npm run recovery:append -- --body "..."    # one-shot
 *   npm run recovery:append -- --dry-run       # preview without push
 *
 * Idempotency:
 *   If today's date already has an entry, the script errors out instead of
 *   creating a duplicate. Use `--force` to overwrite the existing entry.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
const FAITHWALK_REPO = path.resolve(REPO_ROOT, '..', 'faithwalklivecom');
const UPDATES_FILE = path.join(FAITHWALK_REPO, 'src', 'data', 'updates.ts');
const ARRAY_NAME = 'aprilTwentyEightRecovery';

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

function parseArgs(argv) {
  const out = { body: null, dryRun: false, force: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--body') out.body = argv[++i];
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--force') out.force = true;
  }
  return out;
}

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (a) => { rl.close(); resolve(a); }));
}

function git(args, { allowFail = false } = {}) {
  const r = spawnSync('git', args, { cwd: FAITHWALK_REPO, encoding: 'utf8' });
  if (r.status !== 0 && !allowFail) {
    const err = new Error(`git ${args.join(' ')} failed: ${r.stderr.trim() || r.stdout.trim()}`);
    err.stderr = r.stderr;
    throw err;
  }
  return { stdout: (r.stdout || '').trim(), stderr: (r.stderr || '').trim(), status: r.status };
}

function findRecoveryArray(file) {
  const startMarker = `export const ${ARRAY_NAME}`;
  const startIdx = file.indexOf(startMarker);
  if (startIdx === -1) {
    throw new Error(`Could not find "${startMarker}" in updates.ts`);
  }
  const closeIdx = file.indexOf('];', startIdx);
  if (closeIdx === -1) {
    throw new Error(`Could not find closing "];" after ${ARRAY_NAME}`);
  }
  return { startIdx, closeIdx };
}

function buildEntry(date, body) {
  // Match the existing 2-space indented format produced by Write.
  return `  {\n    date: ${JSON.stringify(date)},\n    body: ${JSON.stringify(body)},\n  },\n`;
}

function recoveryDay(pausedDate, today) {
  const ms = (new Date(today).getTime() - new Date(pausedDate).getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.floor(ms));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const date = todayUTC();

  if (!fs.existsSync(UPDATES_FILE)) {
    console.error(`✗ Updates file not found: ${UPDATES_FILE}`);
    process.exit(1);
  }

  let body = args.body;
  if (!body) {
    console.log(`\nRecovery entry for ${date} (Recovery Day ${recoveryDay('2026-04-28', date)})`);
    console.log('Tip: one tight sentence on what entered the public record today.');
    console.log('Public-copy safety: only what news outlets / Zay\'s team have already published.\n');
    body = (await prompt('Body: ')).trim();
  }
  if (!body) {
    console.error('✗ Empty body. Aborting.');
    process.exit(1);
  }

  let file = fs.readFileSync(UPDATES_FILE, 'utf8');
  const { startIdx, closeIdx } = findRecoveryArray(file);
  const arraySlice = file.slice(startIdx, closeIdx);
  const dateMatch = new RegExp(`date:\\s*"${date}"`).test(arraySlice);

  if (dateMatch && !args.force) {
    console.error(`✗ Entry for ${date} already exists. Use --force to overwrite.`);
    process.exit(1);
  }

  let updated;
  if (dateMatch && args.force) {
    // Replace the existing today entry. Match the whole {…} block ending
    // with `},` that contains today's date.
    const blockRe = new RegExp(
      `\\s*\\{[^{}]*date:\\s*"${date}"[^{}]*\\},\\n`,
      'g'
    );
    const replacement = '\n' + buildEntry(date, body).replace(/^/, '  ').slice(2);
    updated = file.replace(blockRe, replacement);
    if (updated === file) {
      console.error('✗ Force-replace failed to find the existing block. Edit by hand.');
      process.exit(1);
    }
  } else {
    const before = file.slice(0, closeIdx);
    const after = file.slice(closeIdx);
    updated = before + buildEntry(date, body) + after;
  }

  if (args.dryRun) {
    console.log('\n--- Dry run: would write the following entry ---\n');
    console.log(buildEntry(date, body));
    console.log('--- (no file write, no commit, no push) ---\n');
    return;
  }

  fs.writeFileSync(UPDATES_FILE, updated);
  console.log(`✓ Wrote entry for ${date} into updates.ts`);

  // Git ops on faithwalklive sibling repo. Pull-first per the multi-machine rule.
  if (!fs.existsSync(path.join(FAITHWALK_REPO, '.git'))) {
    console.error(`✗ faithwalklive repo not a git checkout: ${FAITHWALK_REPO}`);
    process.exit(1);
  }

  console.log('\nPushing to faithwalklive...');
  try {
    git(['fetch', 'origin', 'main']);
    // Stash unrelated WIP if dirty (besides our own edit).
    const dirty = git(['status', '--porcelain']).stdout
      .split('\n')
      .filter((l) => l && !l.endsWith('src/data/updates.ts'));
    let stashed = false;
    if (dirty.length > 0) {
      git(['stash', 'push', '-u', '-m', 'recovery-append-auto-stash', '--', '.', ':!src/data/updates.ts']);
      stashed = true;
    }
    git(['pull', '--rebase', 'origin', 'main']);
    git(['add', 'src/data/updates.ts']);
    const rDay = recoveryDay('2026-04-28', date);
    const message = `Recovery Day ${rDay} (${date}): append /updates/april-28-incident timeline entry`;
    git(['commit', '-m', message]);
    git(['push', 'origin', 'main']);
    if (stashed) {
      const pop = git(['stash', 'pop'], { allowFail: true });
      if (pop.status !== 0) {
        console.warn('  ⚠  stash pop failed — check `git -C ../faithwalklivecom stash list`');
      }
    }
    console.log(`✓ Pushed Recovery Day ${rDay} entry. Vercel redeploy in ~1 min.`);
    console.log(`   Live at: https://faithwalklive.com/updates/april-28-incident`);
  } catch (err) {
    console.error('✗ Push failed: ' + err.message);
    console.error('   The local edit is in place; resolve git state and push manually.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('✗ ' + err.message);
  process.exit(1);
});
