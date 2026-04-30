---
name: Apr 28 Faith Walk incident (Day 34 — vehicle strike, walk halted, hospitalized)
description: On Apr 28 2026 (Day 34) Zay was struck by a vehicle on the Richmond IN → Lewisville IN route, was hospitalized, and the walk + livestream paused. Tracker schema gained `paused` / `pausedNote` fields and a paused-state render across both repos.
type: project
originSessionId: 095baa6a-618b-4c94-9dcc-f766c48f8e60
---
On Apr 28, 2026 (Day 34 of the Faith Walk), Zay was struck by a vehicle on the route between Richmond, IN and Lewisville, IN. He was taken to the hospital and is recovering. **The walk and the daily Twitch livestream are paused** as of Apr 28. National coverage broke same-day on TMZ (TikTok `@tmz/video/7633948800264047885`) and The Shade Room (Instagram post `DXsREFagUhr`).

**This is the second documented vehicle incident on the route.** First was Apr 20 / Day 26 (`project_apr20_incident.md`) where Zay kept walking after being struck. This one is qualitatively different — walk halted same day, stream ended mid-day, hospital admission rather than continued on foot.

**Resolved Apr 29 morning** (this session, commits below):
- **Schema** — added `paused?: boolean` and `pausedNote?: string` to a walking checkpoint. Day 34 entry sits at Lewisville, IN (lat 39.8456, lng -85.358, miles 703 with `estimatedMiles: true`) carrying the public-safe pausedNote: *"Walk paused — Zay is recovering after an accident on the route. He's safe and in good hands. Please keep him in your prayers. Updates to follow when the team is ready."*
- **Consulting tracker** (`src/faith-walk-tracker/index.html`, commit `55351af`): LIVE badge → "🙏 PRAYERS FOR ZAY" badge, paused banner between header and stats, pulsing marker → steady gold ring + 🙏, active card "X miles" → "🙏 WALK PAUSED", popup carries pausedNote with no clip.
- **faithwalklive** (commits `9f2efd3` + `7ffdb18`): `Checkpoint` type extended, `getStats()` returns `isPaused` + `pausedNote`, home + /map both show paused banner + paused NOW card, `TrackerMap` swaps pulse → paused-marker on `now.paused`, FAQ page gains "Why is the walk paused?" entry with TMZ + Shade Room links + /prayer CTA. `QA` type extended with optional `links: { label, href }[]` array; answer text stays plain string so `FAQPage` JSON-LD with `SpeakableSpecification` stays canonical.
- **Book source material** (`book/source-material/faith-walk-timeline.md`, mirrored to `../faithwalkbook` via `npm run book:sync`) gained "Apr 28, 2026 — Day 34: The Lewisville Stop" section with full unredacted context — strike, hospitalization, the prior Apr 20/Day 26 vehicle precedent, and the now-real-time intersection with the Day 40 wilderness framing originally planned for May 4.

**Public-copy stance**: NO vehicle, hospital, or strike-spot specifics anywhere on faithwalklive or the consulting tracker. Only the FAQ entry references the TMZ + Shade Room coverage by linking it — never narrating new details. Full incident specifics live only in book source material.

**Why:** This is a real safety event with national news coverage. Stay tasteful. The render is sticky — banner / badge / paused marker only show while `paused: true` is set on the latest walking checkpoint.

**How to apply:**

- **When the walk resumes** (whenever Zay is back on the road): remove (or set false) `paused` and `pausedNote` from the latest checkpoint, then run a normal `tracker:update` or `tracker:from-title` for the resume day. Banner/badge/marker auto-revert. The FAQ entry "Why is the walk paused?" should be either removed or rewritten as a past-tense recap when that day comes.
- **If walk pauses again** (different incident, illness, weather, etc.): same `paused: true` + `pausedNote` mechanism. Edit `pausedNote` to fit the new context — schema is reusable, render is generic.
- **Day 34 actual mile count is unconfirmed** — I used 703 (Day 33's 673 + ~30 mi planned) with `estimatedMiles: true`. Whether the full 30 mi was completed before the strike is unknown; needs Thomas / team confirmation if it ever matters for the book.
- **Days 26–33 backfill** in `book/source-material/faith-walk-timeline.md` is still open. The Day-34 section calls it out. Dedicated book Claude instance can pull from `checkpoints.json`.
- **Day 33-40 distribution playbook** (`docs/playbook-days-33-40.md`) is now stale. Don't pitch executing it. If/when walk resumes, the playbook needs a re-think because the cultural moment changed (national news = audience awareness of Zay just spiked, separate from the prior 2M-view Yeshua dynamics).

**Apr 30 update — v2.13.0 + v2.13.1 news-capture pivot shipped:**

By Apr 30, coverage had widened beyond TMZ + Shade Room to **Fox-network syndication** (Fox 29 Philly, Fox 59 Indianapolis, Fox 5 NY, Fox 5 Atlanta, KTVU, Fox 32 Chicago, Fox 35 Orlando) + Daily Voice + Express Tribune + Lokmat Times. 11 outlets total. Massive social surge (TT + IG) but faithwalklive.com wasn't capturing the search traffic. 4-agent ROI check (Reddit / YouTube / X / case-study blogs) returned **unanimous REFRAME**: comment-camping is third-tier; structured-data ownership of an incident page is the headline play (see `feedback_news_cycle_capture.md`).

- **v2.13.0** (faithwalklive `a67449b` + consulting `24f004b`): New `/updates/april-28-incident` page — `NewsArticle` + `FAQPage` + `Speakable` + `BreadcrumbList` JSON-LD with `citation` array linking all 11 outlets. New `/updates` chronological index. Root Event JSON-LD pivots to `EventPostponed` + `previousStartDate` when `getStats().isPaused`. Root metadata description + keywords lead with paused-state queries. `sitemap.ts` is dynamic. FAQ Q7 expanded with all-outlet links. `Footer.tsx` press contact `aibiblegospels444@gmail.com`. `public/llms.txt` rewritten for AI answer engines.
- **v2.13.1** (faithwalklive `845f81d` + consulting `5ce15d5`): `getStats()` exposes `recoveryDay` (calendar days since paused day) + `displayDay` (currentDay + recoveryDay during pause). Homepage stat bar reads "Day 36 · Recovery Day 2" past the paused day, falls back to "Day 34 · PAUSED" only on the paused day itself. New `scripts/recovery-append.js` + `npm run recovery:append` for nightly 1-line recovery-entry append.

**Apr 28 actual accident specifics published by Fox 59 / Fox 29** (now public-record, OK to reference): U.S. 40 in Indiana, just before 3 p.m. ET, Buick LeSabre rear-ended a Mazda CX-5 support vehicle which then made contact with Zay walking westbound. Driver was 82. Condition stable, not life-threatening. Zay said he intends to finish the walk after recovery. Walk also raising awareness for **HMBL University** (trade school for underprivileged youth) — that fundraising framing is now public.

**Open Thomas actions** (documented in `docs/comment-camp-apr28.md` + `docs/bio-link-audit-apr28.md`):
- Run `npm run recovery:append` nightly through ~May 5.
- Search Console + Bing Webmaster URL submissions (GUI-only).
- Tier 1-2 comment-camp surfaces (Shade Room IG, TMZ TikTok URL TBD, Fox affiliate articles).
- T+48h Vercel Analytics pull (Friday May 1) for go/no-go on tactics.
