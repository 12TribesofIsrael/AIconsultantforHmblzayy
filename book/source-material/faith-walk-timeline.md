# Faith Walk — Zay-Side Timeline (Day 1 – Day 25)

Raw source material for the book. Walker: Isaiah "Minister Zay" Thomas. Route: Philadelphia, PA → California (target 3,000 mi). Streamed daily on Twitch (`hmblzayy`) under the title format `DAY X | WALKING 3000 MILES CALI | [LOCATION] | FAITH WALK | HMBL UNIVERSITY`.

Canonical data source: `src/faith-walk-tracker/checkpoints.json`. Supplemental context: `CLAUDE.md` changelog, `research/twitch/profile.md`, version notes. Where a day's events are not documented in the repo, the cell is left blank rather than invented.

## Overview Stats (through Day 25, Apr 19, 2026)

- **Days on the road:** 26 calendar days (Mar 25 – Apr 19, 2026)
- **Walking days logged:** 24 (Day 1 is the Philly start at 0 mi)
- **Rest days taken:** 2 confirmed (Mar 29 in Reading PA; Apr 13 in Columbiana OH) + Day 25 rest in progress in Mt. Vernon OH (Apr 19)
- **Cumulative miles:** 494 (Mt. Vernon, OH — Day 24 confirmed)
- **States crossed:** 2 (PA → OH). State line crossing occurred between Day 17 (Beaver Falls, PA) and Day 18 (Columbiana, OH)
- **Avg miles/day (walking days, Day 2–24):** ~21.5 mi/day
- **Longest single day:** Day 17 — ~53 mi jump to Beaver Falls, PA (flagged `estimatedMiles: true`)
- **Peak Twitch viewers:** 506 (Mar 31, 2026 — Day 6, Sunbury PA)
- **Followers at start of tracking:** 8,050+

## Day-by-Day Log

| Day | Date | Location | Day Miles | Cumulative | Notes |
|-----|------|----------|-----------|------------|-------|
| 1 | Mar 25, 2026 | Philadelphia, PA (start) | 0 | 0 | Faith Walk launch day. Starting point. |
| 2 | Mar 26, 2026 | Norristown, PA | 18 | 18 | First full walking day. Clip logged. |
| 3 | Mar 27, 2026 | Pottstown, PA | 18 | 36 | Clip logged. |
| 4 | Mar 28, 2026 | Reading, PA | 19 | 55 | Clip not logged. |
| — | Mar 29, 2026 | Reading, PA (REST) | 0 | 55 | **First rest day.** Stayed in Reading. |
| 5 | Mar 30, 2026 | Lebanon, PA | 25 | 80 | Longest single day since start at that point. Clip logged. |
| 6 | Mar 31, 2026 | Sunbury, PA | 28 | 108 | **First 100-mile milestone crossed.** Peak Twitch viewers (506) recorded this date. Clip logged. |
| 7 | Apr 1, 2026 | Lewisburg, PA | 17 | 125 | Clip logged. |
| 8 | Apr 2, 2026 | Mifflinburg, PA | 19 | 144 | Clip logged. |
| 9 | Apr 3, 2026 | State College, PA | 18 | 162 | Clip logged. |
| 10 | Apr 4, 2026 | Boalsburg, PA | 13 | 175 | Short day (suburb of State College). Clip logged. |
| 11 | Apr 5, 2026 | Altoona, PA | 20 | 195 | Clip logged. |
| 12 | Apr 6, 2026 | Tyrone, PA | 19 | 214 | **200-mile milestone crossed.** Clip logged. v1.0.0 tracker live same day. |
| 13 | Apr 7, 2026 | Ebensburg, PA | 16 | 230 | Clip logged. |
| 14 | Apr 8, 2026 | Blairsville, PA | 18 | 248 | Clip logged. |
| 15 | Apr 9, 2026 | Greensburg, PA | 12 | 260 | Short day. No clip logged. |
| 16 | Apr 10, 2026 | Vandergrift, PA | 30 | 290 | Big push north. Clip logged. Verified against Twitch VOD history. |
| 17 | Apr 11, 2026 | Beaver Falls, PA | 53* | 343 | **Longest single day logged. Miles flagged as estimated.** Last PA checkpoint before state line. Clip logged. |
| 18 | Apr 12, 2026 | Columbiana, OH | 30 | 373 | **FIRST STATE LINE CROSSED — PA → OH.** Twitch clip logged this same day. |
| — | Apr 13, 2026 | Columbiana, OH (REST) | 0 | 373 | **Second rest day.** Clip still logged this date. v2.3.0 rest-day support shipped same day in tooling. |
| 20 | Apr 15, 2026 | Alliance, OH | 20 | 393 | Apr 14 gap (Day 19 not in checkpoints as walking day — rest-day archive held Day 19 slot). Confirmed from Route Team Discord post. |
| 21 | Apr 16, 2026 | Canton, OH | 22 | 415 | Clip logged. |
| 22 | Apr 16, 2026 | Wilmot, OH | 22 | 437 | Same-date entry as Day 21 — likely a double log or tooling timestamp artifact; both entries carry distinct clips. |
| 23 | Apr 17, 2026 | Millersburg, OH | 20 | 457 | Clip logged. Same day `faithwalklive.com` went live on Vercel. |
| 24 | Apr 18, 2026 | Mt. Vernon, OH | 37 | 494 | Big push day. Second-longest walking day in the log. |
| 25 | Apr 19, 2026 | Mt. Vernon, OH (REST) | 0 | 494 | **Third rest day — in progress.** Stream titled with "REST DAY" marker; tracker reflects. |

\* Day 17 miles are flagged `estimatedMiles: true` in `checkpoints.json` and should be verified against Twitch VOD before being treated as confirmed in the book.

## Narrative Beats (Chapter Anchor Candidates)

1. **Day 1 — The Philly Start (Mar 25, 2026).** Zero miles on the tracker. The inciting moment: stepping off from Philadelphia toward a 3,000-mile target with a Twitch stream running. FOX 29 had already covered the walk pre-launch.

2. **Day 6 — First Hundred & Peak Audience (Mar 31, Sunbury PA, 108 mi).** Crossing 100 cumulative miles the same day the stream hit its documented peak of 506 concurrent viewers. The two milestones stacking on the same date is the first "proof this is working" beat.

3. **First Rest — Day 4+1 (Mar 29, Reading PA).** The first time the walk pauses. One walking week in, body says no. Cumulative at 55 mi.

4. **Day 16 — The 30-Mile Push (Apr 10, Vandergrift PA).** Biggest single day of the Pennsylvania stretch up to that point; also the day the changelog notes required a date-accuracy fix against Twitch VOD history, meaning the day was hard enough to blur the record.

5. **Day 17 — The 53-Mile Anomaly (Apr 11, Beaver Falls PA).** Largest single-day jump in the entire log. Flagged estimated. Either an exceptional push to reach the state line, a route gap, or a mis-logged checkpoint — worth resolving from VOD for the book, because the answer is either a heroic day or a tooling footnote.

6. **Day 18 — Crossing Into Ohio (Apr 12, Columbiana OH, 373 mi).** First state line crossed. Roughly 12% of the 3,000-mile target. This is the natural Act 1 → Act 2 pivot.

7. **Day 19 — The Ohio Rest (Apr 13, Columbiana OH).** First rest day after crossing into a new state. The stream title carried "REST DAY" which forced Thomas to ship rest-day support into the tracker (v2.3.0) that same day — the walk and the consulting stack co-evolving in real time.

8. **Day 24 — 494 Miles & The Mt. Vernon Pause (Apr 18–19, Mt. Vernon OH).** Current frontier. Second-longest walking day (37 mi), immediately followed by the third rest day (Day 25, in progress). Roughly 16.5% of the full route. This is the "end of the first book section" beat as of writing.

## Open Items for Verification from Twitch VOD

- Day 17 mile count (currently estimated at 53).
- Day 19 — whether the Day 19 slot was a rest day followed by Day 20 Alliance OH on Apr 15, or whether a walking Day 19 exists and is unlogged (CLAUDE.md v2.4.1 notes rest-only archives shadowing in-progress source).
- Day 21 and Day 22 sharing the Apr 16 date — confirm whether Canton and Wilmot were the same calendar day (unlikely at 22 mi each) or if one should be Apr 15/17.
- Weather, chat moments, prayer moments, guest walkers, raids, donations — none of these are captured in the repo and must be pulled from Twitch VOD, Discord, or direct interview with Zay.
- **Days 26–33 backfill** — this timeline currently stops at Day 25; the consulting tracker has confirmed checkpoints through Day 33 (Richmond, IN, ~673 mi, Apr 27, 2026). Crossing into Indiana on Day 33 is a state-line beat worth its own anchor. Pull from `src/faith-walk-tracker/checkpoints.json` when extending this table.

## Apr 28, 2026 — Day 34: The Lewisville Stop

On Apr 28, 2026 — Day 34 of the Faith Walk — Zay was struck by a vehicle on the route between Richmond, IN and Lewisville, IN. The walk was paused. The Twitch livestream stopped. Zay was taken to the hospital. He is safe and recovering.

This is the **second** documented vehicle incident on the route — the first was Apr 20, 2026 (Day 26) en route to Sunbury, OH, after which Zay kept walking. This second incident is qualitatively different: the walk halted on the day of the strike, the stream ended mid-day, and care escalated to hospital admission rather than continuation on foot.

**Context for the chapter:**

- **Day 33 (Apr 27, 2026)** — Zay completed a 40-mile push from Dayton, OH into Richmond, IN, his largest single day in the Indiana stretch and the day he crossed the OH→IN state line. Discord title: "DAY 33 COMPLETE!! NEW RECORD! 40 MILES COMPLETED AND CROSSED INTO INDIANA". Cumulative ~673 mi.
- **Day 34 (Apr 28, 2026)** — Planned 30 mi from Richmond, IN to Lewisville, IN. Discord title: "FAITH WALK CONTINUES — DAY 34 — Richmond, IN → Lewisville, IN ~30 MILES". Walk halted at/near Lewisville after the strike. Cumulative recorded at ~703 mi (estimated; final actual mile count of the day to be reconciled with VOD/team report).
- **Public copy** on the tracker reads: "Walk paused — Zay is recovering after an accident on the route. He's safe and in good hands. Please keep him in your prayers. Updates to follow when the team is ready." The tracker's live badge has been replaced with a prayers badge; the current-location marker has been swapped from a pulsing beacon to a steady gold ring. No vehicle, hospital, or accident-spot specifics are narrated in public copy per the project's public-copy-safety rule.
- **Faith framing** — the pattern of striking → continuing (Day 26) and now striking → being taken off the road (Day 34) is its own narrative arc. The "40-day wilderness" framing that was being prepared for Day 40 (planned May 4) — Moses, Israel, Elijah, Christ — now intersects in real time with a forced wilderness rather than a chosen one. Worth a chapter anchor.

**Open items for the book:**

- Actual mile count walked Apr 28 before the strike (was the full ~30 mi covered, or did the strike happen earlier on the route?).
- Specific location of the strike (street/county) — for the timeline only; not for public copy.
- Hospital admission details (which hospital, length of stay, injuries) — direct from Zay or family, not inferred from public posts.
- Twitch stream end timestamp on Apr 28 — anchors the moment the broadcast halted.
- Day-of and day-after Discord/IG/TT post archive — Zay's team statements, the visual treatment, fan response volume.
- Weather and route conditions on Apr 28.
- Anchor moments from Day 33 (state-line crossing into Indiana, the 40-mile record) for the chapter that ends just before Day 34.

## May 2, 2026 — Day 39: The 40-Day Wilderness Inversion

On May 2, 2026 — calendar Day 39 of the Faith Walk — the walk remained paused. Zay continues to recover from the Apr 28 (Day 34) strike. The tracker at faithwalklive.com is still live; the prayers badge and steady gold-ring location marker remain in place. No new walking miles since Day 33's 40-mile Indiana push (~703 mi cumulative).

The date is significant for the book's parallel arc — *Thomas's side* of the walk hit its first hard sub-200 lb scale reading.

**Context for the chapter:**

- **Thomas's parallel — May 2, 2026.** First hard sub-200 lb in 3-4 years pinned at **197.7 lb** (scale-app captured, 09:07 AM). Saturday early-weigh, one day before the protocol's planned Sunday photo-drop. 5 days clean since breaking the 48-hour water fast Thomas started 2026-04-28 — the day Zay was hit. The receipt cleared 200 by 2.3 lb, not a squeak. Detail in `faithwalkbook/personal/weight-log.md` and `faithwalkbook/personal/journal/2026-05-02.md`.
- **40-day wilderness framing inverted.** The "40-day wilderness" arc (Moses 40 days, Israel 40 years, Elijah 40 days, Christ 40 days) was being prepared upstream for **Zay's Day 40 (planned May 4, 2026)**. The Day 34 strike turned that arc from a *chosen* wilderness into a *forced* one for Zay — but the body the arc was prepared for was no longer the body completing it on schedule. **The arc landed on Thomas's body instead — one day early, on Day 39.** When the Walker can't walk, the Witness still walks. The Witness's arc completed early; the Walker's was paused at 34. The 40-day frame still lands — just not on the body it was prepared for.
- **Public copy on tracker** unchanged from Day 34 — walk paused, recovery posture. Thomas's parallel is private to the book; it does not surface in public tracker copy.

**Open items for the book:**

- Zay's recovery posture and any return-to-walk timeline (informs whether Day 39 anchors a long pause or a brief one in the Ch 11 spine).
- Voice-memo capture from Thomas for May 2, 2026 — `faithwalkbook/personal/journal/2026-05-02.md` has the anchor facts and harvest map; verbatim entry block awaits backfill.
- Confirm the "Walker can't walk, Witness still walks" framing as a Ch 11 anchor.
- Reconcile the Day 33 (40 mi push) → Day 34 (strike) → Day 39 (Thomas's receipt) sequence as the parallel-arc spine for **Ch 11 — The Scale and the Mile**.
