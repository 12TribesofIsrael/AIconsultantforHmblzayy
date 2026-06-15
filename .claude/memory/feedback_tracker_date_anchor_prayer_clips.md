---
name: feedback_tracker_date_anchor_prayer_clips
description: "Zay leaves Twitch titles stale/forward-set; use his DAY-N-labeled morning prayer/clip timestamps as the authoritative date anchor, not the title or nightly-run time"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 345c0213-db78-40e4-a19f-c948a315117b
---

Zay routinely leaves his Twitch title **stale or forward-set** — e.g. the title still read `25.2 MILES TO HERINGTON` hours after the `HERINGTON WE MADE IT` clip (he'd already arrived), and morning nightly runs read a title showing the *previous* day's number. This silently drifts checkpoint **dates** (and the nightly rollover can skip a whole day when the title jumps two numbers between runs).

**Why:** the nightly task and `tracker:from-title` trust the live title's day-number + the run timestamp. Both are unreliable because Zay doesn't keep the title current.

**How to apply:** when reconciling dates, anchor on **Zay's own DAY-N-labeled clips** — especially the morning **"DAY N OPENING PRAYER" / "DAY N PRAYER"** clips (fire ~7–10 AM CDT at walk-start) and arrival clips ("CITY WE MADE IT"). Convert clip `createdAt` UTC → CDT (UTC−5). Two or three day-numbered anchors usually pin the whole stretch via linear fit (one walk day per calendar day, no skips). On Jun 14 2026 this caught a +1 drift across Days 77–80 plus an unrecorded Day 81 Herington arrival (see v2.22.1). Cross-references [[feedback_tracker_multiday_catchup]], [[feedback_clip_lookup_and_date_verify]], [[feedback_update_tracker_date_default]].
