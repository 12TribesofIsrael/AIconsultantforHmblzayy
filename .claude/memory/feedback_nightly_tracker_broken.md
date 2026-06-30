---
name: nightly-tracker-broken
description: The FaithWalk Nightly Tracker task DOES fire and advance day-numbers, but mis-sets in-progress destinations and over-trusts the stale title — always verify the actual daily stop by hand
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 1cf34187-13f6-4912-8006-9d948e29bdba
---

The "FaithWalk Nightly Tracker" Windows Scheduled Task (`scripts/nightly-tracker.ps1` → `tracker-from-title.js`, 9 PM, Owner machine) is **not "broken" in the sense of not running** — observed firing Jun 28 21:00 (`59eb104`, promoted Day 94→Wiley) and Jun 29 21:00 (`513d4e4`, promoted Day 95→Hasty, set Day 96 in-progress). It DOES advance day-numbers unattended.

**But it is not trustworthy and must be verified by hand**, because Zay leaves Twitch titles stale/forward-set:

1. **It promotes the in-progress destination as the day's arrival** even when the title's destination is the *next major waypoint*, not where Zay actually stopped. Jun 29: title said `DAY 96 | 38 MILES TO LAJUNTA, CO`, so the nightly set Day 96 in-progress → La Junta (38 mi). Zay actually stopped at **Las Animas, CO** (~19 mi, the midpoint town). Clips ("WELCOME TO LAS ANIMAS COLORADO") were the only way to know. Had to re-point Day 96 to Las Animas and clear the La Junta annotation.
2. It still **drops days when the title jumps two day-numbers** between 9 PM runs (the original Day 80 Council Grove drop, Jun 13) and **mis-dates** by run-time when the title is forward-set (`[[tracker-date-anchor-prayer-clips]]`).

**How to apply:**
- On every tracker update, do BOTH halves by hand and **verify the latest day's actual stop against clips** — never accept the nightly's in-progress destination as the arrival. A daily segment >~30 mi is the tell that it grabbed a far waypoint, not the real stop (cross-check `[[tracker-geocode-plausibility]]`'s segment gate).
- Expect the nightly to keep doing this; plan to correct the most-recent day each session rather than assume it's right.
- This refines the older "assume the tracker is updated by hand" stance: the hand-work is now mostly *correcting* the nightly's last day + backfilling clips, not building every day from scratch.
