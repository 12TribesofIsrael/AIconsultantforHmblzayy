---
name: NOW card logic + restOnly rendering on faithwalklive checkpoints panel
description: Rules for (a) which checkpoint card carries the NOW badge and (b) how historical restOnly entries must render in the card list. Two renderers (GitHub Pages tracker + faithwalklive MapClient) must agree — don't let them drift.
type: feedback
originSessionId: 370e5003-12aa-4896-8a0e-e42adf54f73b
---
Two separate concerns live in this memory because they've silently diverged before:

## A. NOW badge priority (only one card carries NOW)

The "NOW" badge on the faithwalklive.com `/map` Checkpoints panel follows this priority order. Apply it everywhere — don't drift from it without a deliberate decision.

**Priority (highest wins, only one card carries NOW):**

1. **Active rest-day in progress** (`hasRestDayCard`): latest walking checkpoint has `restDay: true` and `inProgressDay` set to the current rest day. Render the rest card with NOW labeled `Day {inProgressDay}`. Source: walking checkpoint's annotations.

2. **Archived rest-day sitting ahead of latest walking checkpoint** (`restOnlyAsNow`): the very last entry in `checkpoints` is `restOnly: true` and its `day` > latest-walking `day`. This happens when a rest day got rolled-over into its own archive entry while the next walking day is in progress (e.g. Day 25 rest archived, Day 24 = latest walking, Day 26 walking in progress). Render the restOnly entry as a card with NOW. Closes the visual gap between header day and NOW card by 1.

3. **Latest walking checkpoint** (default): if neither of the above, the latest walking checkpoint gets NOW.

**Cases we explicitly DO NOT do:**

- **Don't render an in-progress walking day as a card.** When Day N+1 is walking-in-progress to a destination city, do NOT add a "Day N+1 → CITY · NOW" card to close the gap to zero. The header already shows the destination; duplicating it on a card amplifies the current-movement signal we're trying to avoid (see [feedback_public_copy_safety.md](feedback_public_copy_safety.md)). A 1-day gap (header N+1 vs NOW N or N-rest) is acceptable.

- **Don't double-count.** The Checkpoints `(N)` count must include any active rest card AND every historical restOnly entry that's rendered. Since the main list now iterates `checkpoints` (not `walking`), the formula is: `checkpoints.length + (hasRestDayCard ? 1 : 0)`. The `restOnlyAsNow` entry is counted in `checkpoints.length` (rendered once at the top, skipped in the main list).

- **Don't strip NOW from the latest walking card without setting it elsewhere.** When `hasRestDayCard` or `restOnlyAsNow` is true, the latest walking card's `isCurrent` flag must be false (so its NOW badge disappears) — but a NOW must still appear on whichever card took priority. Always check: exactly one NOW visible.

**Why:** People glance at the panel to see "where is he right now?" The most-recent thing should carry NOW even if it's a rest day at the same location. A NOW badge stuck on a 2-days-old card is confusing. But putting NOW on a destination he hasn't reached yet is misleading AND a safety leak. Rest-day-as-NOW is the right midpoint.

**How to apply:** When touching [../faithwalklivecom/src/components/MapClient.tsx](../faithwalklivecom/src/components/MapClient.tsx), preserve this priority order. If new walking-state cases emerge (e.g. multi-day rest stretches, route detours), extend the priority order — don't replace it.

## B. Historical restOnly entries — render as compact cards, ALWAYS

Every `restOnly: true` entry in `checkpoints.json` MUST render as a card in the Checkpoints panel, regardless of whether it's the last entry. This is a separate problem from NOW-badge priority.

**Bug that keeps recurring:** main list filters to `walking` (entries where `!restOnly`). Rest-only entries then vanish from the list unless they happened to be the very last entry (caught by the `restOnlyAsNow` NOW-card path). Example: Day 25 rest (Apr 19) + Day 26 walking (Apr 20) → Day 25 disappears from faithwalklive's card list even though it's on GitHub Pages.

**The rule:**
- Main list iterates `checkpoints` (all entries), not `walking`.
- Walking entries → regular card with NOW logic per section A.
- `restOnly` entries → compact secondary card: dimmer text colors (`text-brand-cloud/70`, `text-brand-bronze/70`, `border-brand-border/60`), `Day {N} · REST` header, 💤 emoji, Watch-clip link if present.
- `restOnlyAsNow` is rendered ONCE as the NOW card at the top and must be `return null`-skipped during main list iteration (otherwise double-render).

**Why:** People scanning checkpoints want a continuous calendar — seeing Day 23 → Day 24 → (gap) → Day 26 reads like a data bug even though Day 25 was a legitimate rest day. GitHub Pages ([src/faith-walk-tracker/index.html:1004-1022](src/faith-walk-tracker/index.html#L1004-L1022)) does this; faithwalklive must match.

**How to apply:** Any edit to the Checkpoints panel in `MapClient.tsx` must iterate `checkpoints.slice().reverse()`, branch on `c.restOnly`, and render the compact variant for rest-only entries. Reference commit on faithwalklive: `87c914b` (restored Day 25 after it went missing). Two renderers (GitHub Pages HTML, faithwalklive React) — when changing rendering logic, touch both or explicitly note why one is allowed to differ.
