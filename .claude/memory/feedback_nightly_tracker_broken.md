---
name: Nightly tracker auto-update does NOT work — Thomas updates the tracker manually
description: The "FaithWalk Nightly Tracker" Windows Scheduled Task (v2.20.0) is unreliable in practice; assume the tracker is updated by hand, not on a schedule.
type: feedback
---

The **"FaithWalk Nightly Tracker"** Windows Scheduled Task (registered v2.20.0, May 31 2026 — 9 PM `scripts/nightly-tracker.ps1` → `tracker-from-title.js`) **does not actually keep the tracker current.** Thomas confirmed (2026-06-16) he has been doing the tracker updates **manually** the whole time. Do not assume the nightly job ran or that Half 1 is automated.

**Why it fails (corroborated by the v2.21–v2.22.x changelog):**
- Zay leaves his Twitch title stale/forward-set, so the parser reads the wrong day (the title still said "25.2 MILES TO HERINGTON" hours after "HERINGTON WE MADE IT").
- The single 9 PM slot misses days when the title jumps two day-numbers between runs → silently skipped/conflated days (Day 80 was dropped entirely Jun 13).
- The Phase-2 title format kept tripping the parser (forced 3 straight manual updates before v2.21.0; still drifts dates +1).
- It only does Half 1 (location) and never attaches clips, so Half 2 is always manual anyway.

**How to apply:**
- When tracker work comes up, **assume it's manual.** Run `npm run tracker:from-title` (or `update-tracker.js`) yourself / with Thomas, verify against Twitch clips per `feedback_tracker_date_anchor_prayer_clips`, and do the clip half. Don't tell Thomas "the nightly job will catch it."
- Don't cite the v2.20.0 nightly automation as a working safety net. The frozen changelog entry stays as-is (`feedback_changelogs_are_frozen`), but reality = manual.
- If revisiting automation, the real fix is a second (morning) run + reading clips as the day anchor rather than the stale title — see `feedback_tracker_multiday_catchup` and the v2.22.1 root-cause note.
