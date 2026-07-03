---
name: tracker-multiday-catchup
description: "When the tracker is stuck N days behind the Twitch title, backfill missing days inline with estimatedMiles + clips first, then run tracker:from-title for the latest in-progress"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6a1a055c-9dd1-46d7-9a32-b37458d2f19c
---

When the Twitch title is multiple days ahead of the latest archived checkpoint (e.g. tracker shows Day 46 in-progress while title says Day 48), `tracker:from-title` alone won't catch up — it only handles `latest.day + 1` (Case 3) or `latest.day + 2` rollover (Case 4, one-step). For larger gaps, backfill the intermediate days first.

**The flow:**

1. Query Twitch GQL clips for each missing day's UTC date — find location markers ("MADE IT TO ILLINOIS", state-line crossings, etc.) and the highest-view themed clip per day.
2. Inline-script the backfill (single `node -e` against `./scripts/lib/{git-sync,geo,tracker}`): strip the latest checkpoint's in-progress fields, push new entries with `estimatedMiles: true` and clips attached, call `rebuildAndPush`. One commit covers all missing days.
3. Run `npm run tracker:from-title` — now `latest.day = N-1` and title says Day N, so Case 3 fires and annotates in-progress cleanly.

**Why inline, not a script file:** `scripts/lib/git-sync.js syncWithRemote()` bails on ANY uncommitted change including untracked files. Writing `scripts/backfill-*.js` triggers the abort before it runs. Inline `node -e` avoids the dirty-tree dance for one-shot ops. (See May 17 backfill of Days 46+47 — commit `6053f16`.)

**Why estimatedMiles: true:** Backfilled destinations come from parser-set inProgressDay + late-day clip evidence — not confirmed arrivals. Per `[[feedback_tracker_honesty]]`, default to estimated when unsure, never invent a confirmed number for the public stat bar.

**How to apply:** Any time the gap is ≥ 2 days between latest archived checkpoint and current Twitch title day. Verify each backfilled mileage estimate is geographically sane (≤ 35 mi/day segment) before pushing — if a segment estimates anomalously long, flag that the earlier checkpoint's location may be wrong (parser caught a waypoint, not the actual end-of-day) and surface it in the commit message + open thread rather than silently shipping a broken-looking map leg.
