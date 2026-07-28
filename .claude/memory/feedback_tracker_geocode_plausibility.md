---
name: tracker-geocode-plausibility
description: tracker:from-title silently pushes geographically implausible locations when the Twitch title has ambiguous city names or state-only destinations — sanity-check before trusting the output
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 23664cf3-fdf1-4aa4-b6fe-0bbca23b85d1
  modified: 2026-07-28T15:20:33.753Z
---

`scripts/tracker-from-title.js` extracts a destination from Zay's Twitch title, geocodes it via Nominatim, and auto-pushes to faithwalklive.com. Two failure modes hit in the same session (Days 55→58, May 21-23 2026):

1. **Ambiguous city names** — Title `DAY 57 | 23 MILES TO STERLING, IL` was geocoded to STERLING in north-central Illinois near the Wisconsin border (41.79, -89.70), ~150 mi north of the Beardstown→Quincy walking route. The intended city was **MT. STERLING, IL** (39.99, -90.76), a west-central IL town directly on-path. Tipoff: 167-mi segment from Day 56 in one walking day is implausible (Zay's pace is ~15-25 mi/day; record 40 mi).

2. **State-only destinations** — Title `DAY 59 | 11 MILES TO MISSOURI` got "MISSOURI" geocoded to the state's centroid (38.76, -92.56 = Jefferson City area), ~150 mi from the Mississippi River. Reality: Zay was heading to **HANNIBAL, MO**, a border-crossing town ~20 mi from Quincy. Tipoff: Nominatim returning state-center coords for what should be a daily walking destination.

**Why:** Both errors auto-pushed before I caught them, putting wrong coords + wrong miles on the public map. Per `[[tracker-honesty]]`, the map must not lie. The current `tracker:from-title` flow has no plausibility check between geocoded coords and the previous checkpoint, and no guard against state-only destination strings.

**How to apply:**
- **Before considering any `tracker:from-title` run "done"**, eyeball the new coords against the previous checkpoint. Crow-flies distance >50 mi from prior = sanity check before accepting. Cross-reference clips for the day (per `[[clip-lookup-and-date-verify]]`) — clip titles often name the actual destination.
- If the destination in the title is a state name (`MISSOURI`, `OHIO`, etc.) or unusually short (`CALI` is the known overall-walk prefix and already guarded), treat the script's auto-push as suspicious — Zay's team is being imprecise; ask Thomas which actual city before letting it stand.
- Cities that share names with other cities in nearby states (STERLING IL vs MT. STERLING IL, SPRINGFIELD IL vs SPRINGFIELD MO, etc.) need the same eyeball.
- **Don't pile fixes** — bundle corrections into a one-shot `loadCheckpoints → mutate → rebuildAndPush` script to land everything in one commit + one Vercel build instead of 3-4 separate `update-tracker.js` invocations.

**Hardening — PARTLY SHIPPED (v2.23.1, Jul 8 2026):** `scripts/tracker-from-title.js` `applyInProgress` now runs a plausibility guard right after geocoding — `haversineMiles` from the previous checkpoint; if > `MAX_LEG_STRAIGHT_MILES` (100 straight-line) it **throws and aborts** instead of pushing bad coords (nightly task fails safe + logs). This was prompted by the worst instance yet: Day 102's `Fort Del Norte, CO` geocoded to **Northern Ireland** (54.56, -5.60), inflating miles to 14,068 / 468.9% before Thomas caught it on the live stat bar. The guard catches gross wrong-state/country matches decisively (Ireland = 4,522 mi). **Still NOT guarded:** the subtler same-region ambiguous matches from the original examples — STERLING IL (150 mi, would be caught) vs a wrong match only ~60-90 mi off (under the 100-mi ceiling, would slip through), and state-only destinations that land within 100 mi. So the eyeball step above still matters for near-miss ambiguity; the guard only backstops the egregious cases. Deferred: a tighter ~75-mi ceiling risks false positives on legit 2-3 day gaps (~70 mi straight-line), and a state-name blacklist in `parseStreamTitle` is still unbuilt.

**Closing note (Jul 28, 2026) — the guard's last catch was the finish line itself.** Zay's final
title read `17 MILES TO CALIFORNIA`: a **state-only destination**, the exact unguarded mode above,
which happened to geocode 292 mi out and so tripped the 100-mi ceiling anyway. The job failed on
every scheduled run for a day and a half rather than publish it — correct behavior, and the third
live catch (Del Norte→Ireland, KINGSMAN→Kingman, CALIFORNIA). **The walk is now over and the
automation is retired** (see [[project_faith_walk_complete]]), so the deferred hardening is moot —
keep this memory for the *pattern*, which recurs any time a geocoded string reaches a public map,
not as a TODO on this repo.
