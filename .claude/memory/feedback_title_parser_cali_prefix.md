---
name: tracker-from-title parser CALI prefix — structural fix shipped v2.17.0
description: Parser now skips CALI as MILES FROM/TO match + falls back to bare "DAY N | CITY, ST" — but bare format leaves milesFromNext null so manual in-progress set still needed when title omits distance
type: feedback
originSessionId: 871eb9bf-6c1d-4751-ae46-0df4f8e8b73f
---
**Resolved as of v2.17.0 (May 9, 2026)** — structural fix in `scripts/lib/twitch.js parseStreamTitle`:
1. MILES FROM/TO regex now discards matches where the city is `CALI` (the overall walk goal, never a daily leg).
2. New fallback regex `DAY\s+\d+\s*\|\s*([A-Z][A-Za-z\s]+,\s*[A-Z]{2,})` extracts bare `DAY N | CITY, ST` for the post-resume title shape (`WALKING 3000 MILES TO CALI 🌴| DAY 45 | DANVILLE, IN📍| FAITH WALK🙏🏾`).

**Why:** v2.16.1 was a one-shot manual patch (commit `2e3dda4`); the bug returned the next day on the Day 44→45 rollover. This version fixes the parser itself.

**How to apply:**
- The CALI bug should not recur. If a future title introduces a new branding prefix that triggers similar greedy-match issues, add it to the discard list in `parseStreamTitle`.
- **Caveat that DOES still need handling:** the bare `DAY N | CITY, ST` format gives no `milesFromNext`. `tracker-from-title.js` line 156 (`isWalkingUpdate = parsed.nearLocation && parsed.milesFromNext != null`) skips in-progress annotation when miles are absent. For those days, set in-progress manually via inline `geocode + estimatedRoadMiles + rebuildAndPush` (pattern shipped in v2.17.0 commit `6ae11d2`'s session). When title carries the classic `N MILES TO CITY` qualifier, the parser still extracts both fields and `tracker-from-title` runs end-to-end.
- Verify after every script run regardless: `node -e "const c=require('./src/faith-walk-tracker/checkpoints.json').find(x=>x.inProgressDay); console.log(c?.destination, c?.milesRemaining, c?.destinationLat, c?.destinationLng)"` — destination should be the daily leg, not "CALI" or undefined.
