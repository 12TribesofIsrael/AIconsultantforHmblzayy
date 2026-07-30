---
name: project_faith_walk_complete
description: "The Faith Walk finished Jul 27, 2026 (Day 124) at the California line — the tracker is now a record, not a live feed. Automation retired."
metadata: 
  node_type: memory
  type: project
  originSessionId: 59c4e4b3-f053-46c0-aa9c-073684b66d5f
  modified: 2026-07-29T01:04:07.574Z
---

**Minister Zay completed the 3,000-mile Philadelphia→California Faith Walk on July 27, 2026 — Day 124**, crossing out of Lake Havasu City, AZ. **The exact crossing town is unresolved and the site deliberately names none** — Day 124 is labelled "California state line". His IG finish Reel geotags *Needles*, his own stream title's mileage points at *Parker Dam*, and every outlet names no town at all; only Zay or ShuggC can settle it. Raised roughly $154K–$200K toward HMBL University. Covered same-day by Complex, The Source, Hollywood Unlocked, Unheard Voices, the Philadelphia Tribune, R&B Philly, and NBC10 Philadelphia. His last Twitch stream ended 16:46 UTC that day (`hmbl zay signing out`).

**Why:** the whole tracker system — nightly task, GitHub Actions cron, `tracker:from-title`, in-progress annotations, the pulsing map beacon — existed to answer "where is he today." That question is closed. faithwalklive.com is now a **record of a finished journey**, not a live feed.

**How to apply:**
- **Do not re-enable the tracker cron.** `.github/workflows/faith-walk-tracker.yml` is disabled in the GitHub UI *and* has its `schedule:` commented out. `workflow_dispatch` is kept only for re-deriving a checkpoint. Never suggest "the nightly job will catch it."
- **Day 124 is the last checkpoint.** It carries `completed: true` + `completedNote`. `getStats()` keys the whole completed UI off `isComplete`.
- **Completed mileage is reported as 3,000, not our estimate.** Our per-leg figures are haversine × 1.3 and known-biased (~8.5% high in July per [[v2.26.0 reconcile]]); the chain lands at 2,957, which would render a finished walk as 98.6%. `getStats` swaps in the stated 3,000 on completion and still returns the raw figure as `estimatedMiles`. Don't "fix" this back.
- **His TikTok grew ~11x during the walk** — @hmblzayy is at 440K followers (the master profile still says 40K). Any audience math using the old numbers is stale.
- **His own captions carry no quotable copy** (`#HMBLZAYY #viral #fyp`). Completion copy has to come from the clips and the press.
- Instagram is currently unresolvable for him — see [[reference_zay_handles]].

**What's live now, if the work continues:** the walk is over but HMBL University is not built. The site's email capture and CTAs were repointed from "follow the walk" to the school breaking ground. That's the open thread, not the map.

**The pivot was not exhaustive — expect stale present-tense copy.** On Jul 28 Thomas spotted a leftover "Get daily walk updates / one short email a day — the checkpoint, the clip, the verse" signup card still live in the homepage footer; it was removed (faithwalklive `7838ccc`). The *hero* capture is the one live signup and points at the school — keep it. Nobody has swept `/subscribe`, `/why`, `/faq`, or `/clips` for the same problem. Do that before assuming the site reads correctly as an archive.
