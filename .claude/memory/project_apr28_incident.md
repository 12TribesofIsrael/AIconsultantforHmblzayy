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
