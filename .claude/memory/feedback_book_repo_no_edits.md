---
name: This instance never touches the book repo
description: A separate dedicated Claude instance handles ../faithwalkbook. This instance (AIconsultantforHmblzayy) must never edit, commit to, or push to that repo to avoid colliding with the other instance's workflow.
type: feedback
originSessionId: 18e2fd24-191c-4ad3-97fa-c682b43e7b6e
---
**Rule:** Never write to, edit, commit to, or push to anything inside the `../faithwalkbook` private repo from THIS instance (AIconsultantforHmblzayy / consulting repo). A separate Claude instance is dedicated to that repo and is the only AI Thomas works with on the book.

**Why:** Thomas said Apr 24, 2026 — "I have private repo with a claude instance that is helping me write the book, I can't have this instance make changes to it bc I'm only in the private instance when we are cooking. I won't be cooking in this repo." Two Claude instances editing the same repo = git collisions, conflicting drafts, and broken context for the dedicated book instance. The book happens in the book repo's instance, period.

**How to apply:**
- **Never touch anything in `../faithwalkbook`** from this instance — no Edit, Write, commit, push, or stash operations against that repo. Don't read files there to "suggest changes inline" either; if Thomas wants book changes, he opens the book-repo Claude.
- **What's still allowed in THIS repo (`AIconsultantforHmblzayy`):**
  - Edit `book/source-material/` — that's mined data (timelines, clip indexes, weight numbers, location logs) that feeds the book pipeline, not the book itself
  - Run `npm run book:sync` to mirror source-material → faithwalkbook (it copies source data the other instance reads from; it doesn't write prose)
  - Fact-check numbers against the canonical weight memory and flag drift for Thomas to bring into the book-repo session
  - Update memory files (like `user_weight_struggle.md`) when he gives new data — the book-repo instance can read these too
- **If asked to draft or edit book prose from this instance:** push back — remind Thomas that book work belongs in the other instance, and offer instead to surface source material / verified data he can take into that session.
- **If he explicitly overrides** ("yes I know, just do it from here this once"), do it that one time only — don't treat the override as permanent.
