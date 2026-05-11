---
name: tracker-from-title parser CALI prefix — fully resolved v2.17.1
description: Parser iterates matches with matchAll + skips CALI hits, so titles with BOTH the CALI branding prefix AND a real MILES FROM segment now parse correctly
type: feedback
originSessionId: d943abf6-9ec1-4ea9-9ccd-849dcb9f3e08
---
**Resolved as of v2.17.1 (May 10, 2026)** — `scripts/lib/twitch.js parseStreamTitle` final state:

1. **CALI-skip loop**: MILES FROM/TO regex is global + uses `title.matchAll()`. Iterates every match in the title and `continue`s past any where the captured city is `CALI` (the overall walk goal — branding prefix, never a daily leg). First non-CALI hit wins.
2. **Bare fallback**: when no MILES FROM/TO hit succeeds, regex `DAY\s+\d+\s*\|\s*([A-Z][A-Za-z\s]+,\s*[A-Z]{2,})` extracts the bare `DAY N | CITY, ST` shape (`WALKING 3000 MILES TO CALI 🌴| DAY 45 | DANVILLE, IN📍`).

**Why two versions:** v2.16.1 was a manual one-shot patch (commit `2e3dda4`). v2.17.0 added structural CALI-skip but used `String.match()` which only returns the **first** match — when that first match was CALI, the guard discarded it and the parser never looked further, so a real `18 MILES FROM MONTEZUMA, IN` later in the same title was silently dropped (`milesFromNext: undefined` blocked `tracker:from-title`'s in-progress annotation). v2.17.1 (commit `20c9854`) switched to `matchAll` + `continue`.

**How to apply:**
- Both bugs should now be impossible. If a future title introduces a new always-skip prefix (e.g. branding like "1000 MILES TO HEAVEN"), add it to the skip check next to the `CALI` comparison — the loop already supports multiple skips.
- **Caveat that still applies:** when the title uses the bare `DAY N | CITY, ST` form with no MILES FROM/TO qualifier, `milesFromNext` is still undefined and `tracker-from-title.js` skips in-progress annotation (`isWalkingUpdate` requires both `nearLocation && milesFromNext != null`). Manual in-progress set via inline `geocode + estimatedRoadMiles + rebuildAndPush` (pattern from v2.17.0's session).
- Verify after a run: `node -e "const c=require('./src/faith-walk-tracker/checkpoints.json').find(x=>x.inProgressDay); console.log(c?.destination, c?.milesRemaining, c?.destinationLat, c?.destinationLng)"` — destination should be the daily leg, not `CALI`, and miles should be non-null when the title carried a distance.
