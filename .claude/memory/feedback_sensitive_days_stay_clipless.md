---
name: Sensitive checkpoint days (paused, incident) stay clipless on /clips
description: Days carrying paused/incident/strike/hospitalization context should NOT get clip backfills, even tonally tasteful ones. Cards on /clips render the day's location + miles + date as if a normal arrival happened — adding clips creates a misleading "confirmed walking day" framing for what was actually a halted-event day.
type: feedback
originSessionId: bac783db-a720-40c1-b8dd-7c04d8f6deb5
---
When backfilling Twitch clips to checkpoint days, **explicitly verify the day's emotional/historical context BEFORE picking clips**. If the day was a paused day, incident day, or carries any "this is the day X happened to Zay" weight, leave it clipless on `/clips`.

**Why:** May 3, 2026 — backfilled Day 34 (Apr 28, the strike day) with 3 tonally tasteful pre-strike Apr 28 supporter clips ("Indiana welcomed him" Love Wall). Reasoning at the time: Day 34 had no clips and looked like a backfill miss; pre-strike clips don't violate the no-strike-specifics policy in `project_apr28_incident.md`. Result on `/clips` was wrong though — cards rendered as **Day 34 · Lewisville, IN · Apr 28, 2026 · 703 mi · INDIANA WELCOMED HIM**. Three problems compounded:

1. **Location lie** — Zay was struck en route to Lewisville and never arrived there on foot. Card reads as a confirmed arrival.
2. **Mileage lie** — 703 mi was the *estimated* miles assuming the full Lewisville segment was walked; actual miles walked before the strike are unknown.
3. **Tonal whiplash** — "Indiana welcomed him" framing on the day he got hit by a vehicle reads tone-deaf to anyone who knows what happened. Anyone who *doesn't* know thinks this was a normal walking day with a celebratory wall.

The original v2.12.0 paused-render policy was right: paused/incident days get clip-silence on `/clips`. The story of those days lives in the FAQ + `/updates/april-28-incident` page + book source material — not in the clip archive.

**How to apply:**
- Before running `update-tracker.js --day N --clip ...` (or `--clips`), check the Day N entry in `src/faith-walk-tracker/checkpoints.json` for any `paused: true` or `pausedNote` field, or any indication in the date/CHANGELOG that the day was an incident day.
- If sensitive: do NOT attach. Surface to user before proceeding.
- The v2.15.1 in-progress stash mechanism handles the OTHER common case (clip belongs to today's in-progress day, not yet archived) — that's a different problem solved separately.
- This rule covers the ALREADY-archived sensitive day case where the user might be tempted to "unstale" the archive by adding content.
