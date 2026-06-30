---
name: stale-currentdate-verify
description: The injected currentDate context can be stale — for date-sensitive tracker work, verify the real date against the system clock and git commit timestamps before promoting days
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 1cf34187-13f6-4912-8006-9d948e29bdba
---

On Jun 29, 2026 the session's injected `currentDate` read **2026-06-27**, but the real date was **Jun 29** (confirmed by `date` → `Mon Jun 29 21:03 EDT 2026` and by git commit timestamps showing nightly runs on Jun 28/29). Acting on the stale date, I nearly promoted the wrong walking day (started treating Day 94/Wiley as "today" when today was actually Day 96).

**Why it matters here:** the Faith Walk tracker maps day-numbers to calendar dates one-to-one. A 2-day date error means promoting the wrong location, mis-dating entries, and attaching the wrong clips — all of which ship to the public map.

**How to apply:**
- For any date-sensitive tracker operation, don't trust the injected `currentDate` blindly. Cross-check with `date` (system clock) and the timestamps in `git log --format="%ad"` (esp. the nightly task's commits, which fire ~21:00 daily and stamp the true date).
- Tell-tale that the date is off: the latest clip timestamps, the live title's day-number, and recent commit dates all sit *past* the supposed "today." When the tracker state is N days ahead of where the injected date implies it should be, the date is stale, not the tracker.
- When in doubt, anchor on Zay's day-numbered clips + commit timestamps (per `[[tracker-date-anchor-prayer-clips]]`), which are ground truth.
