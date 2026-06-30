---
name: tracker-geocode-plausibility
description: tracker:from-title silently pushes geographically implausible locations when the Twitch title has ambiguous city names or state-only destinations — sanity-check before trusting the output
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 23664cf3-fdf1-4aa4-b6fe-0bbca23b85d1
---

`scripts/tracker-from-title.js` extracts a destination from Zay's Twitch title, geocodes it via Nominatim, and auto-pushes to faithwalklive.com. Two failure modes hit in the same session (Days 55→58, May 21-23 2026):

1. **Ambiguous city names** — Title `DAY 57 | 23 MILES TO STERLING, IL` was geocoded to STERLING in north-central Illinois near the Wisconsin border (41.79, -89.70), ~150 mi north of the Beardstown→Quincy walking route. The intended city was **MT. STERLING, IL** (39.99, -90.76), a west-central IL town directly on-path. Tipoff: 167-mi segment from Day 56 in one walking day is implausible (Zay's pace is ~15-25 mi/day; record 40 mi).

2. **State-only destinations** — Title `DAY 59 | 11 MILES TO MISSOURI` got "MISSOURI" geocoded to the state's centroid (38.76, -92.56 = Jefferson City area), ~150 mi from the Mississippi River. Reality: Zay was heading to **HANNIBAL, MO**, a border-crossing town ~20 mi from Quincy. Tipoff: Nominatim returning state-center coords for what should be a daily walking destination.

3. **City name == a County name (Jun 29, 2026, Day 96)** — `Las Animas, Colorado` geocoded to Las Animas **County**'s centroid (37.31, -104.06, near Trinidad), not the town of Las Animas (38.0664, -103.2225, Bent County seat, on US-50). Tipoff: a **+106-mi segment** from Hasty in one day. Fix: re-query as `Las Animas, Bent County, Colorado` (the `City, County, State` form disambiguates a town from its like-named county). Same session, `Granada, CO` had earlier resolved to Granada **Colombia** (lat 6.14) — full state name `Granada, Colorado` fixed it. **Bake a segment-distance gate (>45 mi → throw) into every catch-up script** — it caught both before they were trusted.

**Why:** Both errors auto-pushed before I caught them, putting wrong coords + wrong miles on the public map. Per `[[tracker-honesty]]`, the map must not lie. The current `tracker:from-title` flow has no plausibility check between geocoded coords and the previous checkpoint, and no guard against state-only destination strings.

**How to apply:**
- **Before considering any `tracker:from-title` run "done"**, eyeball the new coords against the previous checkpoint. Crow-flies distance >50 mi from prior = sanity check before accepting. Cross-reference clips for the day (per `[[clip-lookup-and-date-verify]]`) — clip titles often name the actual destination.
- If the destination in the title is a state name (`MISSOURI`, `OHIO`, etc.) or unusually short (`CALI` is the known overall-walk prefix and already guarded), treat the script's auto-push as suspicious — Zay's team is being imprecise; ask Thomas which actual city before letting it stand.
- Cities that share names with other cities in nearby states (STERLING IL vs MT. STERLING IL, SPRINGFIELD IL vs SPRINGFIELD MO, etc.) need the same eyeball.
- **Don't pile fixes** — bundle corrections into a one-shot `loadCheckpoints → mutate → rebuildAndPush` script to land everything in one commit + one Vercel build instead of 3-4 separate `update-tracker.js` invocations.

**Eventual hardening (deferred):** Add to `scripts/lib/twitch.js parseStreamTitle` a state-name blacklist (reject single-word UPPERCASE destinations matching US state names) + add to `scripts/tracker-from-title.js` a plausibility check (reject geocoded coords >75 crow-flies miles from previous checkpoint without manual override).
