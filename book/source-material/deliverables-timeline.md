# Thomas — Deliverables Timeline

Raw source material for the book. This is a chronological log of what Thomas built as AI consultant for Minister Zay / HMBL during the Faith Walk (Philly → California), drawn from the git history of `AIconsultantforHmblzayy`, the versioned changelog in `CLAUDE.md`, `package.json`, and the codebase itself.

Client walks. Thomas ships. One entry per commit or grouped deliverable.

---

## Week 1 — Foundations (Apr 6 – Apr 7, 2026)

Zay is ~Day 13 into the walk. Thomas comes in cold and has to build the full consulting stack from zero in 48 hours.

### 2026-04-06 — Initial setup: research, Discord scraper, Remotion intro video
- **What:** Repo bootstrapped. Full platform research across 8 channels (Instagram, TikTok, Twitch, YouTube, Twitter/X, Facebook, Shopify, press) plus HMBL University Discord intel. Remotion-based intro video project scaffolded (vertical, wide, square).
- **Why:** Needed a credible artifact to hand Zay before the pitch. Research proves he did the homework; intro video is the unmissable first deliverable.
- **How:** `research/*` markdown profiles, `scripts/discord-scraper.js` + `download-footage.js` using `discord.js`, Remotion TSX project under `src/intro-video/`.
- **Commit:** `8764b5e`

### 2026-04-06 — Music + real Faith Walk footage added to intro video
- **What:** Swapped placeholder assets for real Twitch-sourced footage and a music bed.
- **Why:** Zay needed to actually use it on stream. Placeholder video doesn't ship.
- **Commit:** `d70f42b`

### 2026-04-07 — Faith Walk live tracker + Zay DM strategy
- **What:** Interactive map tracker (`src/faith-walk-tracker/index.html` + `checkpoints.json`) with Leaflet map and checkpoint cards. DM outreach script drafted.
- **Why:** Thomas needed one "look at this" link to drop in Zay's DMs. The tracker became the hook.
- **Commit:** `3d13997`

### 2026-04-07 — Tracker moved to `/docs` for GitHub Pages
- **What:** Live at `12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html`. Free public hosting.
- **Commit:** `1727a16`

### 2026-04-07 — Auto + manual tracker update system
- **What:** `scripts/update-tracker.js` for manual confirmed arrivals. First cut of Twitch title scraping.
- **Commit:** `ac6e122`

### 2026-04-07 — Twitch auto-clipper + chatbot
- **What:** `scripts/twitch-clipper.js` (stream → TikTok/IG/YouTube clip pipeline via ffmpeg) and `scripts/twitch-chatbot.js` (HMBL commands: `!progress`, `!route`, `!pray`, etc.).
- **Why:** Two more deliverables in the pitch deck. Moves Thomas from "one-off helper" to "infrastructure."
- **Commit:** `7b8399b`

## Week 2 — Live Operations (Apr 8 – Apr 11, 2026)

Daily walk tracking goes live. Thomas starts shipping per-day checkpoint updates.

- **2026-04-08** — Day 13 Ebensburg PA (230 mi), Day 14 Blairsville PA (248 mi) confirmed. Twitch sync improved: new GQL query + robust title parser (`7f4fd32`).
- **2026-04-09** — "Powered by The MOST HIGH & AI Bible Gospels" branding banner lands on tracker, then iterated twice into a header link (`e603505`, `02be814`, `66fd67f`). Day 15 Greensburg PA (260 mi), Day 16 Vandergrift PA (290 mi) confirmed. GoatCounter analytics added (`e188d91`). Quick-reference doc shipped with TikTok script + ShuggC back-channel notes (`1212653`, `438f5ae`, `ae8e6d7`).
- **2026-04-10** — In-progress display added: "heading to Cranberry, PA — 35 mi today" with dashed map line (`055065e`, `ebc3538`). Tracker link shortened via tinyurl (`c507488`).
- **2026-04-11** — Day 17 Beaver Falls PA confirmed after in-progress back-and-forth (`a975c35`, `de37b9b`, `78032b5`). Tracker script now rebases on origin before mutating files to stop cross-machine conflicts (`674f7f4`). `scripts/tracker-from-title.js` ships — title-driven idempotent daily updater (`214198f`, `25a1386`). Stats bar refactored into its own row (`831c5ee`).

## Week 3 — v2.x Product Line (Apr 12 – Apr 15, 2026)

Thomas formalizes versioning and starts shipping named releases.

- **2026-04-12 — v2.0.0** — Title-driven auto-updater, in-progress heading-to display, day rollover auto-promotion, `MILES TO` parser fix, scripts refactored into `scripts/lib/` (`git-sync.js`, `twitch.js`, `geo.js`, `tracker.js`). Versioning system added to `CLAUDE.md` (`d21298e`, `3969382`, `d8dc10c`).
- **2026-04-12 — v2.1.0** — Twitch clips on checkpoint cards + map popups. `--clip` flag and backfill mode. Day-by-day clip backfill for Days 2, 3, 5–14, 17 (12 commits in a row: `1c1f4cf` through `44bac8c`).
- **2026-04-13 — v2.2.0** — 90-second intro video highlight reel using 15 Twitch clips via Remotion `OffthreadVideo`. Day 18 Columbiana OH (373 mi, crossed into Ohio) (`8ab9373`, `d2d3847`).
- **2026-04-13 — v2.2.1** — Intro video progress bar fixed to show ~12% real journey progress instead of animating to Cali. Steps Walked counter added as 5th stat column (`90df1be`, `9aec0a4`, `75cd825`).
- **2026-04-13 — v2.3.0** — Rest-day support in title parser + tracker UI. Day 19 Columbiana OH rest day logged with dedicated clip and virtual rest card (`c0c0604`, `8a464b0`, `ccc87a9`, `c7524e9`). Past rest days (Mar 29, Apr 12) retroactively surfaced as cards (`f777138`).
- **2026-04-13 — v2.4.0 prep** — Claude memory mirrored into git at `.claude/memory/`. `scripts/memory-sync.js` ships with `status/push/pull` commands, enabling laptop↔desktop continuity. `DONT_FORGET.md` reminder file at repo root. 7 off-by-1/2 date errors on Days 5–10 and Day 16 audited and fixed against Twitch VOD history (`b5a1c81`, `bb267ca`, `79ff2b2`, `8060bae`, `8ba3a7b`, `186d7ce`).
- **2026-04-14** — Parser accepts `MILES AWAY FROM` variant; rest-day rollover handled. Day 20 Alliance OH in-progress after rest day (`47b7f66`, `d4ddee1`). Rest-day card-row calendar preserves concluded rest days with Day X–Y ranges in popups (`00ac95e`, `929152a`).
- **2026-04-15 — v2.4.1** — Rollover promotion bug fixed where rest-only archives were shadowing the in-progress source. Day 20 Alliance OH (393 mi) confirmed, Day 21 Canton in progress (`559a0cb`, `b13e5d0`, `b0532ef`, `7445378`). Faith-tech pivot strategy doc added — blueprint for Faith Walk Live as a standalone property + Thomas's consulting brand (`3b1db43`).

## Week 4 — Stealth Infrastructure + Production Launches (Apr 16 – Apr 19, 2026)

Private builds start mattering as much as the public tracker.

- **2026-04-16** — Day 21 Canton OH (415 mi) and Day 22 Wilmot OH (437 mi) confirmed; clip for Day 22 logged (`136bc7b`, `244abfb`, `484f3ef`). Public data disclaimer added to tracker footer for legal/safety reasons (`06a6818`).
- **2026-04-17** — Day 23 Millersburg OH (457 mi) confirmed (`18e8e49`). Private: **faithwalklive.com launched** on Vercel with AI Bible Gospels branding (recorded in memory, not in public commits). ShuggC call + DM, IP domains secured.
- **2026-04-18 — v2.5.0** — **OBS stream overlay shipped to production** at `faithwalklive.com/obs`. Full-bleed dark map, gold polyline, pulsing beacon. `?bare=1` strips stats, `?brand=0` hides watermark. Companion `/live` UTM redirect for stream-overlay attribution. Delivered to ShuggC for OBS browser-source use. Merged on sibling `faithwalklive` repo (`7f45401`). Vercel Deployment Protection disabled so the overlay is publicly crawlable (`00beb1c`). Day 24 Mt. Vernon OH (37 mi) in progress (`4dea653`).
- **2026-04-19 — v2.6.0** — **Auto-sync pipeline** shipped: every `tracker:update` / `tracker:from-title` run now mirrors `checkpoints.json` to the sibling `../faithwalklivecom` repo, commits, and pushes — Vercel redeploys automatically. Stashes unrelated WIP in the public repo before rebasing, restores after. Failures log but never block the consulting commit. `npm run faithwalk:sync` added for manual one-shot mirror. Day 24 Mt. Vernon OH (494 mi) confirmed, Day 25 rest day annotated (`28f31a6`, `f6c90af`, `9967299`). `scripts/sync-faithwalklive.js` and `scripts/lib/faithwalklive-sync.js` are the new plumbing.

---

## Summary Table

| Metric | Count |
|---|---|
| Total commits (Apr 6 – Apr 19, 2026) | 86 |
| Named version releases | 9 (v1.0.0, v2.0.0, v2.1.0, v2.2.0, v2.2.1, v2.3.0, v2.4.0, v2.4.1, v2.5.0, v2.6.0) |
| Scripts shipped (top-level) | 10 (`discord-scraper`, `download-footage`, `update-tracker`, `tracker-from-title`, `twitch-tracker-sync`, `sync-faithwalklive`, `twitch-clipper`, `twitch-chatbot`, `memory-sync`, plus `scripts/lib/*` — 5 shared modules: `git-sync`, `twitch`, `geo`, `tracker`, `faithwalklive-sync`) |
| npm commands exposed | 12 (`discord:scrape`, `discord:download`, `tracker:update`, `tracker:from-title`, `tracker:sync`, `tracker:watch`, `faithwalk:sync`, `clips`, `chatbot`, `memory:status`, `memory:push`, `memory:pull`) |
| Platforms researched | 8 (Instagram, TikTok, Twitch, YouTube, Twitter/X, Facebook, Shopify website, press coverage) + Discord HMBL University |
| Remotion video renders produced | 3 aspect ratios (`intro-vertical.mp4`, `intro-wide.mp4`, `intro-square.mp4`) + 90-second highlight reel (v2.2.0) |
| Checkpoints logged on tracker | 25 days (Day 1 Philly → Day 24 Mt. Vernon OH confirmed + Day 25 rest in progress) |
| Twitch clips embedded in tracker | 14 day-cards backfilled (Days 2, 3, 5–14, 17, 22) + Day 19 rest-day clip |
| Miles tracked | 494 mi confirmed (Mt. Vernon OH) of 3,000 mi target (~16.5%) |
| Public-facing live properties | 2 — GitHub Pages tracker, faithwalklive.com (incl. `/obs` overlay, `/live` redirect) |
| Private/strategic artifacts | Faith-tech pivot strategy doc; IP domain lockdown (referenced in memory); ShuggC back-channel log; Clippers application saga memo; Claude memory sync system for cross-machine continuity |
