---
name: Automation safety — git sync, idempotency, dirty-tree refusal
description: Tracker scripts that auto-commit must pull before mutating, refuse dirty trees, and skip pushes when nothing changed.
type: feedback
originSessionId: 6d9e3e26-aeb7-4150-92b7-f5d0095481a8
---
Any script in `scripts/` that mutates tracker files (`checkpoints.json`, the HTML files) and auto-commits must:

1. **Refuse to run on a dirty working tree** (`git status --porcelain` non-empty) — print which files are dirty and exit. Never silently rebase over the user's edits.
2. **`git fetch origin main` + `git pull --rebase origin main`** before reading checkpoints. The script must see the latest remote state, not stale local data.
3. **Skip the push if nothing semantically changed** — deep-compare the parsed/incoming state against existing fields. Idempotent runs produce no commits.
4. **Cache geocoding** — don't re-hit Nominatim if `latest.destination === parsed.nearLocation` and coords are already stored.

Shared helpers live in [scripts/lib/](scripts/lib/): `git-sync.js` (`syncWithRemote`, `commitAndPush`), `twitch.js`, `geo.js`, `tracker.js`. New tracker scripts should import these, not duplicate them.

**Why:** Without the sync-first rule, two different sessions/machines pushing to the same repo cause merge conflict traps (happened 2026-04-11 when one session pushed an in-progress annotation while another tried to log a checkpoint — manual rebase + conflict resolution required). Without idempotency, the watch loop spams 48 noise commits a day.

**How to apply:** Before adding any new auto-commit script under `scripts/`, wire it through `require('./lib/git-sync').syncWithRemote()` first thing, and check whether the proposed change is actually different from current state before calling `commitAndPush`. If you're tempted to inline a helper that already exists in `scripts/lib/`, use the lib version instead.
