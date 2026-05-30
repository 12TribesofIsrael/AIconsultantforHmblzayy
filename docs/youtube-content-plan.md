# YouTube Content Plan — AI Bible Gospels / Faith Walk

**Goal:** Drive awareness of Minister Zay's 3,000-mile walk + traffic to faithwalklive.com + GoFundMe donations.
**Channel:** AI Bible Gospels YouTube
**Strategy:** 3 tracks — Day-34 anchor video (priority), 10 milestone episodes, Shorts from existing clips.
**Cadence:** 1–2 videos/week. Never bulk upload.

---

## Phase 0 — Pre-production gates

| Gate | Status | Notes |
|---|---|---|
| ShuggC permission DM sent | ☐ | Discord DM drafted — send before any upload |
| ShuggC "go ahead" received | ☐ | Written confirmation required |
| GoFundMe URL confirmed | ☐ | Add to `.env` as `GOFUNDME_URL=` |
| YouTube Channel ID confirmed | ☐ | Add to `.env` as `YOUTUBE_CHANNEL_ID=` |
| Day 1 clip downloaded | ☐ | @ministerzay Instagram → `assets/footage/day01-philly-start.mp4` |

---

## Track 1 — Day-34 Anchor Video (Ship First)

**Title:** `He Was Hit by a Car at Mile 703 — And Kept Walking | Minister Zay's Faith Walk`

**Source clips:**
- Day 33 (Richmond, IN): `BashfulGiftedOwlOhMyDog-onq1lG06jnunWLpy`
- Day 39 (Greenfield, IN — the return): `SarcasticIncredulousSrirachaRitzMitz-5fBoiux...`
- Day 40 (Indianapolis): `YawningCrepuscularDonutKreygasm-PEbHBmiNWUVw...`

Days 34–38 intentionally clipless (sensitive — public copy says "accident on the route" only).

**Structure:**
```
0:00–0:30   HOOK — "Day 34. He was hit. 5 days later he was back."
0:30–2:00   WHO IS ZAY — Faith Walk context, Day 33 clip
2:00–4:30   THE INCIDENT — Text overlay + TMZ/Shade Room/Fox references (no new private details)
4:30–6:30   THE RECOVERY — Days 35–38, community, HMBL Discord prayer
6:30–9:00   THE RETURN — Day 39 clip + Day 40 Indianapolis
9:00–10:30  WHERE IS HE NOW — Day 64+, Missouri, 1,245 mi
10:30–12:00 CTA — faithwalklive.com/map, GoFundMe, subscribe
```

**Generate description:** `node scripts/youtube-content/description-gen.js --day 34 --type anchor`

| Status | Upload date | YouTube URL |
|---|---|---|
| ☐ Not started | — | — |

---

## Track 2 — 10 Milestone Episodes

Upload 1–2/week in the order below. Day 34 = Track 1 anchor video (already planned above).

**Generate description:** `node scripts/youtube-content/description-gen.js --day N --type milestone`

| # | Day | Title | Clip slug | Miles | Status | Upload date |
|---|---|---|---|---|---|---|
| 1 | 1 | He Left Philadelphia | Instagram (Phase 0) | 0 | ☐ | — |
| 2 | 17 | He Crossed into Ohio | `AssiduousSteamyStapleLitty-lH-6s-vMT1AnbgSz` | 343 | ☐ | — |
| 3 | 30 | 1 Month. 607 Miles. | `KawaiiRelievedJaguarTBTacoLeft-OX2AJJYXcMm3r...` | 607 | ☐ | — |
| 4 | 34 | He Was Hit at Mile 703 | → Track 1 | 703 | ☐ | — |
| 5 | 39 | He Came Back | `SarcasticIncredulousSrirachaRitzMitz-5fBoiux...` | 732 | ☐ | — |
| 6 | 40 | Indianapolis | `YawningCrepuscularDonutKreygasm-PEbHBmiNWUVw...` | 752 | ☐ | — |
| 7 | 52 | 1,000 Miles | `JazzyUninterestedCaribouShazBotstix-aEM48-Ep...` | 999 | ☐ | — |
| 8 | 59 | He Crossed the Mississippi | `RamshackleAbstruseOryxBibleThump-usvR98SKWCu...` | 1133 | ☐ | — |
| 9 | 64 | 1,245 Miles In | `FastExuberantBaconDogFace-v40O7pL-CfLvyz17` | 1245 | ☐ | — |
| 10 | TBD | He Made It — California | TBD | ~3000 | ☐ future | — |

**Title formula:** `Day N: [Milestone] | [Miles] Miles | Minister Zay's 3,000-Mile Faith Walk`

**Per-episode structure (3–8 min):**
```
0:00–0:20  Cold open — most striking moment (no logo intro first)
0:20–1:00  Context — where he is, how far, what's at stake
1:00–3:00  The clip(s) — best moments from the day
3:00–4:00  What's ahead — next milestone or state
4:00–end   CTA — faithwalklive.com, GoFundMe, subscribe
```

---

## Track 3 — YouTube Shorts

**Source:** curated Twitch clips already in `checkpoints.json`.
**Generate description:** `node scripts/youtube-content/description-gen.js --day N --type short`
**Render a Short:** `bash scripts/youtube-content/prep-clip.sh --day N --city "City, ST" --miles N --clip-url URL`
**Output:** `assets/youtube/day-NN-short.mp4`

Priority order (highest emotional stakes first):

| Day | City | Clip slug | Status |
|---|---|---|---|
| 39 | Greenfield, IN | `SarcasticIncredulousSrirachaRitzMitz-5fBoiux...` | ☐ |
| 59 | West Quincy, MO | `RamshackleAbstruseOryxBibleThump-usvR98SKWCu...` | ☐ |
| 52 | Springfield, IL | `JazzyUninterestedCaribouShazBotstix-aEM48-Ep...` | ☐ |
| 30 | Springfield, OH | `KawaiiRelievedJaguarTBTacoLeft-OX2AJJYXcMm3r...` | ☐ |
| 17 | Beaver Falls, PA | `AssiduousSteamyStapleLitty-lH-6s-vMT1AnbgSz` | ☐ |
| 40 | Indianapolis, IN | `YawningCrepuscularDonutKreygasm-PEbHBmiNWUVw...` | ☐ |
| 64 | Salisbury, MO | `FastExuberantBaconDogFace-v40O7pL-CfLvyz17` | ☐ |

---

## Upload checklist (run for every video before uploading)

- [ ] ShuggC permission confirmed in writing
- [ ] GoFundMe URL filled in (not placeholder)
- [ ] Title written to the `Day N: [Milestone] | [Miles] Miles | ...` formula
- [ ] Description generated via `description-gen.js` — links verified
- [ ] Thumbnail created (1280×720, gold-on-dark, day number prominent)
- [ ] Upload paced ≥3 days from previous upload (no bulk)
- [ ] Check YouTube Studio for Content ID claims within 48h of upload

---

## Content ID watch list

If a claim appears within 48h of any upload:
1. Check if it's a music claim (most likely) or a Zay copyright claim
2. Music claim → mute or replace audio segment, re-upload
3. Zay claim → contact ShuggC immediately, do not dispute without their approval
