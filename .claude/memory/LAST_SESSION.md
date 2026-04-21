---
ended: 2026-04-21T00:00:00Z
project: ZayAutomations
branch: main
version: v2.7.0
originSessionId: 355f1237-d352-426b-8186-6f18564d9c4a
---
# Last Session — 2026-04-21

## What the user wanted
Pull latest from origin safely, then formalize the unversioned book-project + Twitch-GQL work into a real release. Then a side conversation about repo architecture (is this the source of truth?) led to enabling GitHub branch protection. User is new to traditional dev/devops and explicitly asked for best-practice + ROI framing throughout.

## What we did
- Pulled origin (fast-forward `10050a4..0f5890a`) using stash → pull → pop because local `CLAUDE.md` + `package.json` had unstaged work. Zero overlap with incoming changes.
- Bumped CLAUDE.md `Current Version` and `package.json` `version` from `2.6.0` → `2.7.0`. Added v2.7.0 changelog row dated Apr 21, 2026.
- Committed everything as `d9012d4` *"v2.7.0: Book project scaffolding + Twitch GQL clip-verification doc"* — 9 files: CLAUDE.md, package.json, scripts/sync-book.js, scripts/lib/book-sync.js, book/README.md, book/source-material/{deliverables,faith-walk,strategic}-timeline.md, docs/1611KjvW_apocrypha.pdf (3.2 MB).
- Pushed to `origin/main`.
- Verified the sync architecture by reading `scripts/lib/book-sync.js` + grepping for write patterns in `scripts/lib/faithwalklive-sync.js` — both are **outbound only** (copy from this repo to sibling, then commit+push in the sibling's cwd; never read sibling state back).
- Enabled GitHub branch protection on `main` via `gh api`: `allow_force_pushes=false`, `allow_deletions=false`, `enforce_admins=false` (admin can still bypass for emergency recovery). Required two attempts — first call failed with HTTP 422 because empty strings for `required_status_checks`/`required_pull_request_reviews`/`restrictions` aren't accepted; resent with explicit JSON nulls via stdin.

## Decisions worth remembering
- **No PR-review requirement on main protection.** Solo dev — review friction outweighs benefit. Only enabled the two zero-friction destructive-op blocks (force-push, deletion). Layer in PR/CI rules when collaborators arrive.
- **`enforce_admins=false`** by intent — keeps an emergency escape hatch for the user. The protection catches accidents, not deliberate admin recovery.
- **One v2.7.0 commit, not two.** Bundled book scaffolding + GQL doc together rather than splitting because both were already sitting unversioned and the user prefers one cohesive feature commit (consistent with `feedback_present_only_optimal`).

## Open threads / next session starts here
- **Day 26 → SUNBURY, OH** is in-progress per pre-session commit `1a8a908`. Next `tracker:from-title` run after Zay's stream ends will promote it. Current commit `0f5890a` has the stashed Day 26 clip ready to auto-carry on promotion.
- **Apocrypha PDF (3.2 MB)** is now in repo at `docs/1611KjvW_apocrypha.pdf`. Per `feedback_verse_source` memory, walk-of-the-day verses must be sourced from this file via pdftotext, not from model memory.
- **Book sync untested end-to-end** — `npm run book:sync` has never been run yet because `../faithwalkbook` may not exist on this machine. Script is no-op-safe (logs and skips if sibling missing). User should test on whichever machine has the book repo cloned.

## Uncommitted work
Clean working tree.
