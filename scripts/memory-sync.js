/**
 * Memory sync — mirror files between the repo's .claude/memory/ and the
 * Claude Code global memory location for this project.
 *
 * This project runs on two machines (laptop + desktop). Git tracks only
 * the repo, so auto-memory that lives in ~/.claude/projects/... doesn't
 * follow. This script keeps the two locations in sync, with the repo as
 * the source of truth.
 *
 * Usage:
 *   node scripts/memory-sync.js push   # global  -> repo (run before git commit)
 *   node scripts/memory-sync.js pull   # repo    -> global (run after git pull)
 *   node scripts/memory-sync.js status # show diffs between the two locations
 *
 * File format: only `.md` files are synced. The script refuses to delete
 * anything — it's additive/overwriting only. If you need to delete a
 * memory, remove it from both sides manually.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const REPO_MEMORY = path.join(__dirname, '..', '.claude', 'memory');

// Claude Code's per-project memory path. Slugs the absolute project path
// with `-` separators (C:\Users\Owner\zayautomations -> c--Users-Owner-zayautomations).
// Keep this in sync with Claude Code's convention if it changes.
function globalMemoryDir() {
  const home = os.homedir();
  const projectRoot = path.resolve(__dirname, '..');
  // Match Claude Code's slug format: drive letter lowercased, ':' removed,
  // separators replaced with '-'. On Windows: C:\Users\Owner\zayautomations
  // -> c--Users-Owner-zayautomations
  const slug = projectRoot
    .replace(/^([A-Za-z]):[\\/]/, (_, d) => d.toLowerCase() + '--')
    .replace(/[\\/]/g, '-');
  return path.join(home, '.claude', 'projects', slug, 'memory');
}

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.md'));
}

function readSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

function copy(from, to, file) {
  const src = path.join(from, file);
  const dst = path.join(to, file);
  fs.mkdirSync(to, { recursive: true });
  const content = fs.readFileSync(src, 'utf8');
  fs.writeFileSync(dst, content);
}

function diff(repoDir, globalDir) {
  const repoFiles = new Set(listMarkdown(repoDir));
  const globalFiles = new Set(listMarkdown(globalDir));
  const all = new Set([...repoFiles, ...globalFiles]);
  const results = [];
  for (const f of all) {
    const inRepo = repoFiles.has(f);
    const inGlobal = globalFiles.has(f);
    const repoContent = inRepo ? readSafe(path.join(repoDir, f)) : null;
    const globalContent = inGlobal ? readSafe(path.join(globalDir, f)) : null;
    if (!inRepo) results.push({ file: f, state: 'only-in-global' });
    else if (!inGlobal) results.push({ file: f, state: 'only-in-repo' });
    else if (repoContent !== globalContent) results.push({ file: f, state: 'different' });
    else results.push({ file: f, state: 'same' });
  }
  return results.sort((a, b) => a.file.localeCompare(b.file));
}

function printStatus(results) {
  const labels = {
    same: 'SAME',
    different: 'DIFF',
    'only-in-repo': 'REPO ONLY',
    'only-in-global': 'GLOBAL ONLY',
  };
  for (const r of results) {
    console.log(`  ${labels[r.state].padEnd(12)} ${r.file}`);
  }
}

function main() {
  const cmd = process.argv[2];
  const globalDir = globalMemoryDir();

  console.log(`Repo memory:   ${REPO_MEMORY}`);
  console.log(`Global memory: ${globalDir}\n`);

  if (cmd === 'status' || !cmd) {
    const results = diff(REPO_MEMORY, globalDir);
    printStatus(results);
    if (!cmd) {
      console.log('\nUsage: node scripts/memory-sync.js [push|pull|status]');
    }
    return;
  }

  if (cmd === 'push') {
    // Global -> repo. Copies all global .md files into repo, overwriting.
    const files = listMarkdown(globalDir);
    if (files.length === 0) {
      console.log('No memory files in global location. Nothing to push.');
      return;
    }
    console.log('Pushing global -> repo:');
    for (const f of files) {
      copy(globalDir, REPO_MEMORY, f);
      console.log(`  ${f}`);
    }
    console.log(`\n✓ ${files.length} file(s) mirrored to ${REPO_MEMORY}`);
    console.log('  Review with: git diff .claude/memory/');
    return;
  }

  if (cmd === 'pull') {
    // Repo -> global. Copies all repo .md files into global, overwriting.
    const files = listMarkdown(REPO_MEMORY);
    if (files.length === 0) {
      console.log('No memory files in repo. Nothing to pull.');
      return;
    }
    console.log('Pulling repo -> global:');
    for (const f of files) {
      copy(REPO_MEMORY, globalDir, f);
      console.log(`  ${f}`);
    }
    console.log(`\n✓ ${files.length} file(s) mirrored to ${globalDir}`);
    return;
  }

  console.log(`Unknown command: ${cmd}`);
  console.log('Usage: node scripts/memory-sync.js [push|pull|status]');
  process.exit(1);
}

main();
