---
name: Post-pause day numbering = calendar-cumulative + restOnly backfill, not next-walking-day
description: When the walk resumes from a pause, the resume day's number jumps to (paused-day-number + calendar days elapsed), matching Zay's stream-title convention. Backfill the gap days as restOnly recovery entries. Do NOT use next-sequential walking-day index.
type: feedback
originSessionId: bac783db-a720-40c1-b8dd-7c04d8f6deb5
---
When the Faith Walk resumes from a paused state, the resume day's number = paused-day-number + (calendar days elapsed during pause). Backfill the gap as `restOnly` recovery entries. This honors Zay's stream-title convention and gives the public site a continuous day-number sequence without skips.

**Why:** May 3, 2026 (Day 39 resume from the Apr 28 / Day 34 strike pause). Calendar math: Day 34 (Apr 28) + 5 calendar days (Apr 29, 30, May 1, 2, 3) = Day 39. Zay's stream title also said "DAY 39." User initially said "Day 40" but corrected to 39 after I surfaced the math.

The v2.13.1 design used dynamic `displayDay = currentDay + recoveryDay` while paused — keeps the public stat bar moving during pause without writing to checkpoints.json. That design is still correct DURING pause (before any walking entry past the paused day exists). Once the resume day is logged, the dynamic logic becomes redundant — the explicit `day:` field on the resume entry takes precedence.

**How to apply on resume:**

1. Decide the resume day number = `pausedDay + calendarDaysSincePaused`. Example: pause at Day 34 on Apr 28, resume on May 3 = Day 34 + 5 = Day 39.
2. Edit `src/faith-walk-tracker/checkpoints.json`:
   - Remove `paused: true` and `pausedNote` from the paused-day entry (Day 34).
   - Append `restOnly` entries for each gap day (Day 35-38), each carrying `restOnly: true`, `date`, `location`, `lat/lng`, `miles` (matches paused-day's miles since no walking happened), `day` (gap number).
   - Add in-progress fields (`destination`, `destinationLat/Lng`, `inProgressDay = resumeDayNumber`, `milesRemaining`, `estimatedSegmentMiles`, `inProgressStartedAt`) to the paused-day entry (Day 34).
3. The walk-resume reference implementation is the deleted-after-run script `scripts/_resume-day-39.js` (see commit `7f8d520`). Recreate that pattern next time.
4. After edit, `npm run tracker:from-title` won't help here (rollover logic can't promote across a 5-day gap). Manual one-shot script is the right path.
5. Recovery `restOnly` entries don't carry clips — the stream was offline during recovery.

**Public render impact:**
- Stat bar reads `Day {resumeDay}` (was `Day {pausedDay} · Recovery Day N`)
- Paused banner / 🙏 PRAYERS badge clear (because `paused: true` is removed from latest walking entry)
- `EventPostponed` JSON-LD reverts to `EventScheduled`
- Card row gains the gap-fill recovery cards (Day 35-38 as rest)
- Map shows pulsing beacon at paused-day location with dashed line to resume destination

**Out of scope for this rule:**
- The `/updates/april-28-incident` page tense rewrite is a SEPARATE task (multiple sections + JSON-LD freshness). Do as a dedicated edit when the news cycle has settled.
- The "Why is the walk paused?" FAQ entry rewrite to past-tense "What happened on Day 34?" was handled May 3 (faithwalklive commit `9894b82`) — pattern documented there.
