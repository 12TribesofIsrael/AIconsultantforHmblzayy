---
name: tracker-inprogress-dedup
description: "tracker:from-title doesn't dedupe in-progress fields across checkpoints — when in-progress lives on a non-latest entry, the next run leaves stale duplicates that mis-fire rollover"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a128621f-c638-4c35-ae49-34478e072c02
---

`scripts/tracker-from-title.js` `annotateInProgress` adds destination/destinationLat/destinationLng/inProgressDay/milesRemaining/estimatedSegmentMiles/inProgressStartedAt to `latest` only. It never strips those fields from *other* checkpoints — only `update-tracker.js` new-day mode does that (and only when promoting a confirmed arrival).

**The failure mode** (caught 2026-05-26 on Day 61 → STOUTSVILLE,MO update): a surgical fix earlier in the session put Day 61 in-progress fields on Day 59 walking. Then later, `tracker:from-title` ran with title destination changed (MONROE CITY → STOUTSVILLE), found `latest = Day 60 restOnly`, and ran `annotateInProgress(latest, parsed)` on the rest entry. Result: BOTH Day 59 walking AND Day 60 rest held in-progress fields, with Day 60's being current (STOUTSVILLE) and Day 59's being stale (MONROE CITY).

**Why this matters:** Case 4 rollover (lines 290-299) tail-walks for the first `!restOnly && destination && inProgressDay` checkpoint. With both entries holding in-progress, it lands on Day 59 first (skipping Day 60 rest) and would promote Day 61 to MONROE CITY (stale) — silent wrong-data push to faithwalklive.

**Why:** Stale in-progress fields on non-latest entries are invisible in the UI (display logic also tail-walks and finds Day 60's current data first), so the bug doesn't surface until rollover the next day.

**How to apply:**
- After any tracker:from-title run, audit non-latest checkpoints for in-progress fields:
  ```bash
  node -e "const cps=require('./src/faith-walk-tracker/checkpoints.json'); cps.slice(0,-1).filter(c=>c.inProgressDay||c.destination).forEach(c=>console.log('STALE in-progress on Day '+c.day+': dest='+c.destination+' inProgressDay='+c.inProgressDay));"
  ```
- Any hit = strip those fields from the older entry before next rollover. The 7 fields to strip: `destination, destinationLat, destinationLng, milesRemaining, estimatedSegmentMiles, inProgressDay, inProgressStartedAt` (plus optional `inProgressClip`, `inProgressClips`, `inProgressClipsTitle`).
- Especially watch this after surgical fixes that put in-progress fields on a walking row + a later rest entry then absorbs the in-progress annotation.

**Eventual hardening (deferred):** add to `annotateInProgress` a pass that strips in-progress fields from all checkpoints OTHER than `latest` before/after adding the new ones. One-line guarantee that only the latest entry holds in-progress at any time.

See also `[[tracker-geocode-plausibility]]` (sibling gotcha — both are silent state-corruption bugs in the same script).
