---
name: NOW card logic on faithwalklive checkpoints panel
description: Rules for which checkpoint card carries the NOW badge — covers walking, rest-day-in-progress, and rest-day-archived-ahead-of-walking cases.
type: feedback
originSessionId: 370e5003-12aa-4896-8a0e-e42adf54f73b
---
The "NOW" badge on the faithwalklive.com `/map` Checkpoints panel follows this priority order. Apply it everywhere — don't drift from it without a deliberate decision.

**Priority (highest wins, only one card carries NOW):**

1. **Active rest-day in progress** (`hasRestDayCard`): latest walking checkpoint has `restDay: true` and `inProgressDay` set to the current rest day. Render the rest card with NOW labeled `Day {inProgressDay}`. Source: walking checkpoint's annotations.

2. **Archived rest-day sitting ahead of latest walking checkpoint** (`restOnlyAsNow`): the very last entry in `checkpoints` is `restOnly: true` and its `day` > latest-walking `day`. This happens when a rest day got rolled-over into its own archive entry while the next walking day is in progress (e.g. Day 25 rest archived, Day 24 = latest walking, Day 26 walking in progress). Render the restOnly entry as a card with NOW. Closes the visual gap between header day and NOW card by 1.

3. **Latest walking checkpoint** (default): if neither of the above, the latest walking checkpoint gets NOW.

**Cases we explicitly DO NOT do:**

- **Don't render an in-progress walking day as a card.** When Day N+1 is walking-in-progress to a destination city, do NOT add a "Day N+1 → CITY · NOW" card to close the gap to zero. The header already shows the destination; duplicating it on a card amplifies the current-movement signal we're trying to avoid (see [feedback_public_copy_safety.md](feedback_public_copy_safety.md)). A 1-day gap (header N+1 vs NOW N or N-rest) is acceptable.

- **Don't double-count.** The Checkpoints `(N)` count must include any active rest card or restOnly-as-NOW card so the number matches what's rendered. Formula: `walking.length + (hasRestDayCard ? 1 : 0) + (restOnlyAsNow ? 1 : 0)`.

- **Don't strip NOW from the latest walking card without setting it elsewhere.** When `hasRestDayCard` or `restOnlyAsNow` is true, the latest walking card's `isCurrent` flag must be false (so its NOW badge disappears) — but a NOW must still appear on whichever card took priority. Always check: exactly one NOW visible.

**Why:** People glance at the panel to see "where is he right now?" The most-recent thing should carry NOW even if it's a rest day at the same location. A NOW badge stuck on a 2-days-old card is confusing. But putting NOW on a destination he hasn't reached yet is misleading AND a safety leak. Rest-day-as-NOW is the right midpoint.

**How to apply:** When touching [../faithwalklivecom/src/components/MapClient.tsx](../faithwalklivecom/src/components/MapClient.tsx), preserve this priority order. The current implementation (commit `94a279f`) is the reference. If new walking-state cases emerge (e.g. multi-day rest stretches, route detours), extend the priority order — don't replace it.
