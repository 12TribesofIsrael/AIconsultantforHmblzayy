---
name: Clip backfill is mandatory part of daily tracker workflow
description: Every tracker update (title-driven or manual) must end with a clip attached for the affected day. tracker:from-title does NOT auto-attach clips — they're curated, not picked. Skipping the backfill step makes faithwalklive.com/clips silently fall behind the map.
type: feedback
originSessionId: 18e2fd24-191c-4ad3-97fa-c682b43e7b6e
---
**Rule:** After any `tracker:from-title` or `tracker:update` that promotes/archives a day (including rest days), immediately attach a clip for that day via `update-tracker.js --day N --clip "..."` (or `--clips ...` for milestone Love Walls). Don't end the session with the day archived but no clip.

**Why:** Thomas flagged Apr 24, 2026 — "the clip archive is always out of date and don't get synced with everything else." The actual mechanism: `tracker:from-title` handles location/miles/promotion/rest-day annotation but doesn't pick clips (those are curated by view count + theme — automated picks would degrade quality). Days were arriving on the tracker without ever getting clips, so faithwalklive.com/clips lagged 2-3 days behind the map. Day 28 (rest at Columbus) and Day 29 (London arrival) had no clips when caught — backfilled to fix.

**How to apply:**
- After any tracker promotion (Half 1 of the workflow per CLAUDE.md "Standard daily tracker workflow"), immediately do Half 2 — find that day's clip on Twitch GQL, pick the highest-view faith/support/milestone-aligned one, attach via `update-tracker.js --day N --clip "..."`.
- Pattern for selection (per `feedback_clip_selection.md`): use 24h-equivalent clips for that specific date (filter `LAST_WEEK` results by `createdAt` date prefix), prefer themed clips (faith / support / milestone) over absolute top-by-views when there's a clear theme match. Reference picks: Day 23 "GOD DID" 70v, Day 24 "w chrisean" 78v.
- For rest days, support-themed clips fit best ("SUPPORT FLIES OUT THE CAR TO MEET ZAY" pattern). For arrival days, milestone-themed clips fit best ("Another Milestone!!!" pattern).
- For milestone days collecting multiple clips (e.g. Day 30 one-month-in), use the multi-clip "Love Wall" form: `--clips "url1,url2,url3" --clips-title "Caption"`.
- **Audit gap any time** with the one-liner in CLAUDE.md → "Audit the gap any time" — scans `checkpoints.json` for days missing clips. If anything shows up, backfill before doing other tracker work.
- If no clip can be found (Twitch returns nothing for that date), commit a placeholder note explaining the gap so it's not silently invisible.
