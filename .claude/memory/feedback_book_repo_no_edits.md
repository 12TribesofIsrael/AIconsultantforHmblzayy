---
name: This instance is now PRIMARY on the book repo
description: As of June 2, 2026 Thomas made THIS instance (AIconsultantforHmblzayy) the primary AI for ../faithwalkbook with full write permissions. The old "never touch the book repo" rule is retired. Edit/commit/push to faithwalkbook is allowed from here.
type: feedback
originSessionId: 18e2fd24-191c-4ad3-97fa-c682b43e7b6e
---
**Current rule (June 2, 2026):** THIS instance is the **primary** Claude for the book. Full write permissions on `../faithwalkbook` — Edit, Write, commit, push are all allowed. Thomas said: "you are now the primary you can write to it. I will be only making changes to the book here for now on. you have write permissions."

**Why the change:** Thomas consolidated book work into this instance. He'll only be "cooking" on the book from this repo's session going forward, so the prior collision risk (two instances editing faithwalkbook) no longer applies.

**History (retired rule):** From Apr 24 → Jun 2, 2026 this instance was forbidden from touching `../faithwalkbook` because a separate dedicated book-repo Claude instance owned it. That separation is over as of Jun 2.

**How to apply now:**
- **Write directly to `../faithwalkbook`** when Thomas asks for book work — drafts, edits, chapter files, photo conversions, scripts. Commit + push as normal.
- Still respect the existing cross-repo plumbing: `book/source-material/` in THIS repo is mined data that mirrors to faithwalkbook via `npm run book:sync`. Don't hand-edit `faithwalkbook/source-material/` (it gets overwritten by the sync) — edit the source in this repo and sync, OR edit faithwalkbook prose/chapters directly (those are not sync targets).
- Keep fact-checking numbers against canonical weight memory ([[user_weight_struggle]]) before writing them into chapters.
- Voice: Thomas's authentic spoken cadence is canonical — see his rewrite at `faithwalkbook/personal/rewrite/rewrite.md.txt` (used for Ch1). Preacher rhythm, faith woven in, raw honesty, "Spark Book," "directly proportional to your habitat," "faith without works is dead." Keep the factual spine, re-voice in his tone.
