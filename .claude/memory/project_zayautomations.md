---
name: ZayAutomations onboarding state
description: Status of the AI consulting pitch to Minister Zay/HMBL — decision-makers, shipped work, team dynamics, and open threads
type: project
originSessionId: c3df2ac9-5749-489d-943c-219e07891345
---
Goal: become the main AI consultant for Minister Zay (Isaiah Thomas) / HMBL Clothing, anchored on support for his Faith Walk (3,000 mi Philly→Cali, streamed daily on Twitch hmblzayy).

## Current version: v2.4.1

## Key people
- **ShuggC (MR.DOTCONNECTOR)** — runs all tech for HMBL. On Apr 9 said "will be bringing you on the tech side". On Apr 10 confirmed onboarding still happening. **He's the point-person — route all tech work through him, not general chat.**
- **Minister Zay** — linked up directly at Apr 9 Town Hall. We sent him leg compression sleeves.
- **Cierra Lanae** — mod / route-team member. Issued warning on Apr 10 for posting tracker in Discord general chat. Resolved cleanly.

## Team dynamic
There's a **route team** posting daily walk plans in Discord (HMBL University) — "HMBL FAITH WALK - DAY N" graphic with Start / Planned Stops / End Stop / Miles. **This is the authoritative daily source.** We don't have Discord access yet, so user pastes them when available. Formal role required before posting in HMBL University Discord.

## Timeline
- **Apr 6** — First contact with ShuggC. Pitched AI automations, shared intro video.
- **Apr 7** — ShuggC used intro video on stream.
- **Apr 9** — ShuggC: "Will be bringing you on the tech side." Town Hall shoutout. Talked with Zay directly.
- **Apr 10** — Cierra warning (resolved). ShuggC confirmed onboarding still on.
- **Apr 12** — Shipped v2.1.0 (clips on tracker cards).
- **Apr 13** — Town Hall announced applications opening. Shipped v2.2.0 (90s intro video) + v2.2.1 (progress bar fix). Day 18 Columbiana OH logged.
- **Apr 14** — v2.3.0 (rest-day rollover) + v2.4.0 (memory sync across laptop/desktop, date fixes). Day 19 rest, Day 20 walking.
- **Apr 15** — v2.4.1 (rollover promote walks back past rest-only archives). Day 20 Alliance OH confirmed from Route Team post (393 mi, 20 mi day). Day 21 in progress to Canton, OH (24 mi).

## STRATEGIC PIVOT (Apr 15) — Faith Walk Live + Faith-Tech Brand
User decided to stop waiting on HMBL formal onboarding and build around them instead. Key realizations:
- Zay (27) + ShuggC + mods show no faith fruit in public content outside the monetized walk itself. Possible money-grab dynamic, or at minimum: business-first with faith as container.
- User had 58K IG from prior funding/credit work vs ShuggC's 6K. Established-operator gap may be driving ShuggC's avoidance (recognized level = "you snapped", then slowed onboarding).
- User feels the Spirit genuinely when on Twitch dropping scripture, but isn't getting reciprocal recognition from the team. "If they were God-fearing, they'd see the Christ in me."
- Spiritual read: losing zeal may be the Spirit withdrawing, not weakness. Elijah / Paul redirection precedent (1 Kings 19, Acts 16:6-7).

Strategy doc created: `docs/faith-tech-pivot-strategy.md`. Two phases:
1. **Phase 1 (30 days):** Expand tracker into "Faith Walk Live" — standalone supporter-built companion platform. Scripture card, clip archive, prayer wall, email signup. Honors the walk, ships under user's own banner, doubles as portfolio.
2. **Phase 2 (90 days):** Pitch Faith-Tech services to other Christian streamers/ministers/missions using Faith Walk as case study. Productized offerings (tracker / clip / chatbot / full-stack).

**Positioning rules (strict):**
- Never go negative on HMBL publicly
- Supporter-built, not official — no logo, no claim of affiliation
- Don't push in HMBL Discord general (violates Cierra warning)
- God first — if Spirit moves to pivot again, listen

## Onboarding status — FRUSTRATION POINT (Apr 15)
- ShuggC DM'd "onboarding should be tomorrow honestly" on Apr 13 → gone silent since. Over a week of "tomorrow."
- HMBL opened staff applications via Discord bot. User applied for **Clippers** role.
- **App #1 (Apr 13):** polished structured answers → **DENIED by @Big Kiki for "ai generated" phrasing**. Ironic — Clippers is literally the role where user's AI+clip pipeline belongs.
- **App #2 (Apr 13):** shorter/casual, cancelled mid-flow.
- **App #3 (Apr 15 8am):** shorter, plainer voice, tracker link included. Pending.
- **User's read:** *"a lot of politics and bullshit going on."* Valid. Respect the frustration when engaging.
- **Lesson:** HMBL application reviewers treat polished writing as a red flag. Match community voice — plain, faith-first, no bullet structures. User's AI work is a liability in written comms even though it's the core skill they'd benefit from.

## Tracker framework (3-tier confidence)
1. **Confirmed** 🟢 — Route Team Discord post (pasted by user) or manual `tracker:update`. Clears `estimatedMiles` flag.
2. **Estimated** 🟡 — Auto-promoted from in-progress when next day's title appears. `estimatedMiles: true` set.
3. **In-progress** 🔵 — Live Twitch title annotation on latest walking checkpoint.

Daily flow: title updates → in-progress state. Next-day title → auto-promote prior day as estimated. Route post pasted → upgrade to confirmed.

## Cross-machine workflow
User works from both laptop and desktop. Rebase set as global default (`pull.rebase true`). Pull before push every session. Memory sync across machines via `.claude/memory/` + `scripts/memory-sync.js` (v2.4.0).

## What's shipped (proof of work)
1. **Intro video v2** — 90-second highlight reel, 15 Twitch clips, 3 formats
2. **Faith Walk Tracker** — 20+ days with clips, in-progress display, live on GitHub Pages
3. **Auto-sync system** — title parser, day rollover, rest-day handling, estimated/confirmed tiers
4. **Twitch auto-clipper + chatbot** — built, ready to deploy
5. **Platform research** — all 8 platforms audited
6. **Discord scraper** — ready, awaiting bot invite

## Strategy rules
- **Discord general chat OFF-LIMITS** until formal role
- **Watch announcements channel** for application
- **Don't chase ShuggC** — work speaks for itself
- **One drop per platform, let it breathe**
