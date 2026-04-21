---
name: Repo architecture & branch protection
description: AIconsultantforHmblzayy is the source of truth; sibling repos are outbound-only mirrors; main has GitHub branch protection enabled
type: project
originSessionId: 355f1237-d352-426b-8186-6f18564d9c4a
---
This repo (`AIconsultantforHmblzayy`) is the **source of truth**. Two sibling repos receive data from it but never push back:

- `../faithwalklivecom` ← receives `checkpoints.json` via `scripts/lib/faithwalklive-sync.js` (auto-fired on every `tracker:update` / `tracker:from-title`, or manually via `npm run faithwalk:sync`)
- `../faithwalkbook` ← receives `book/source-material/` via `scripts/lib/book-sync.js` (manually via `npm run book:sync`)

Both sync helpers run git operations with `cwd` pointed at the *sibling* repo, so they only ever modify the target. Verified Apr 21, 2026.

GitHub branch protection on `main` (enabled Apr 21, 2026):
- `allow_force_pushes: false`
- `allow_deletions: false`
- `enforce_admins: false` ← user can still bypass for emergency recovery
- No PR review requirement, no required status checks (intentional — solo dev, friction not worth it yet)

**Why:** User wanted hardened source-of-truth boundary without workflow friction. The two destructive-op blocks catch accidents (`git push --force` after a bad rebase, or accidental branch delete) without slowing normal `add → commit → push` work.

**How to apply:**
- Never plan to force-push to `main` of this repo — GitHub will reject it.
- If a force-push is genuinely needed (history recovery), bypass requires temporarily disabling protection via `gh api -X DELETE repos/12TribesofIsrael/AIconsultantforHmblzayy/branches/main/protection` then re-enabling. Don't do this lightly — confirm with user first.
- Don't propose adding sync-back paths from sibling repos. The one-way flow is the architecture, not a limitation to fix.
- When designing new automation: data should originate here and flow outward, never the reverse.
