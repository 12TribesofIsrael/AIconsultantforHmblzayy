# ZayAutomations — AI Consulting for Minister Zay / HMBL

**Current Version: v2.12.0**

## Versioning
We use semver (MAJOR.MINOR.PATCH). Bump on every feature/fix:
- **MAJOR** — big new system or breaking change (e.g. new tracker architecture)
- **MINOR** — new feature added to existing system (e.g. in-progress display, parser fix)
- **PATCH** — bug fix, typo, doc-only change

Update the version in **both** this file (above) and `package.json` on every feature commit.

### Changelog
| Version | Date | Changes |
|---------|------|---------|
| v2.12.0 | Apr 29, 2026 | **Walk paused — Day 34 schema + tasteful render across both repos.** On Apr 28, 2026 (Day 34) Zay was struck by a vehicle on the Richmond, IN → Lewisville, IN route and was hospitalized; the Twitch livestream ended mid-day and the walk halted. New checkpoint schema fields: `paused: boolean` and `pausedNote: string` on a walking checkpoint. Day 34 entry added to `src/faith-walk-tracker/checkpoints.json` at Lewisville, IN (~703 mi est) with the public-safe pausedNote ("Walk paused — Zay is recovering after an accident on the route. He's safe and in good hands. Please keep him in your prayers. Updates to follow when the team is ready."). Per the public-copy-safety rule, no vehicle, hospital, or accident-spot specifics appear anywhere on faithwalklive or the consulting tracker — only on the book source material. Renders updated in both repos: consulting tracker (`src/faith-walk-tracker/index.html`) swaps the red pulsing LIVE badge for a gold "🙏 PRAYERS FOR ZAY" badge, shows a somber gold-on-dark `paused-banner` between header and stats, replaces the pulsing yellow current-location marker with a steady gold ring carrying a 🙏 glyph, replaces the active card's "X miles" line with "🙏 WALK PAUSED", and overrides the map popup to read the pausedNote. faithwalklive (`../faithwalklivecom`) extended `Checkpoint` type with `paused?` / `pausedNote?`, `getStats()` now returns `isPaused` / `pausedNote`, the `/` home page renders a paused banner above the stat row + "PAUSED" badge in the Current-day stat + a "Drop a prayer for Zay" CTA, `MapClient` shows the same banner above the progress bar and a paused NOW card on Day 34, and `TrackerMap` substitutes a `paused-marker` (steady gold ring + 🙏) for the pulsing beacon on paused days plus a paused popup variant. Book source-material gains a "Apr 28, 2026 — Day 34: The Lewisville Stop" section in `book/source-material/faith-walk-timeline.md` (synced to `../faithwalkbook` via `npm run book:sync`) with full context — including the strike, hospital admission, the prior Apr 20/Day 26 vehicle precedent, and the now-real-time intersection with the Day 40 wilderness framing originally planned for May 4. |
| v2.11.0 | Apr 27, 2026 | **Distribution playbook v2 (Days 33-40)** — supersedes v2.10.0 Repost-only plan for the Day 33-40 window after Apr 27 4-agent ROI re-check returned unanimous REFRAME (8 independent runs across Apr 25 + Apr 27, all REFRAME on daily IG Remix). New primary daily play = TT Stitch on Zay's pinned 2M-view "Yeshua the Messiah" video — only evidence-backed audience-borrow mechanic per the agents (Khaby Lame precedent + Brendan Kane / Modern Millie 3-10x reach data). Secondary plays: first-comment camp on `@ministerzay` / `@hmblzayy` push notifications + IG Story link sticker (kept — 5-10x pinned-comment CTR per Later 2024 / Socialinsider). Day 40 (~Mon May 4) escalates to face-on-cam TT Duet + IG Remix Reaction + 3-slide wilderness Story chain (Christ / Moses / Elijah). All 8 daily verses (Galatians 6:9 → Deuteronomy 31:6 + wilderness trio) pre-extracted verbatim from `docs/1611KjvW_apocrypha.pdf` per the verse-source rule. Decision thresholds at end of Day 35 to pull Day 40 forward if Stitch views < 100/day or Story sticker taps < 10/day. New file: `docs/playbook-days-33-40.md`. Memory updated: `project_remix_roi_check.md` now logs both Apr 25 + Apr 27 verdicts to block re-pitching. |
| v2.10.1 | Apr 27, 2026 | **Fix: stat bar showed Day 31 during Day 33 in-progress.** Both the consulting tracker (`scripts/lib/tracker.js` `buildTrackerHTML`) and the public site (`../faithwalklivecom/src/lib/checkpoints.ts` `getStats`) derived `displayDay` from `walking[last].inProgressDay`, but after a rest-day rollover the in-progress fields live on the **trailing rest-only entry** that gets filtered out by `!cp.restOnly`. Result: stat bar fell back to the last walking day (31) while the map popup correctly read the rest-only entry's `inProgressDay` (33) — visible mismatch on faithwalklive.com. Both code paths now walk the array tail-first to find whichever checkpoint holds `inProgressDay`. faithwalklive's `getStats` also now reads `destination` / `milesRemaining` from the same in-progress source so the NOW heading-to fields stay accurate during rest-day rollovers. Existing miles/states logic unchanged (rest-only entries inherit the prior walking entry's mileage). |
| v2.10.0 | Apr 26, 2026 | **10-day Repost→Remix distribution playbook (Days 31-40)** — `docs/remix-playbook-today.md` rewritten from a single-day Day 30 snapshot into a 10-day max-ROI plan. Days 31-39 use native Repost (1-tap, ride the algo wave on Zay's existing high-view content — TT `@hmblzayy` 2M-view "Yeshua the Messiah" walk video, IG `@ministerzay` 269K-view newest walk-era Reel, both scouted live via the `browser` skill). Day 40 escalates to face-on-cam Remix/Duet with biblical 40-day wilderness framing (Moses, Israel, Elijah, Christ anchors; verses pulled at runtime from `docs/1611KjvW_apocrypha.pdf` per `feedback_verse_source` rule, never quoted from memory). Self-serve daily refresh recipe added so Thomas can find each day's top post + rotate UTM (`faithwalk-day-N`) without re-scouting. Story link sticker remains the click driver every day per the Apr 25 4-agent ROI verdict (link-in-bio CTR ~0.004%). Cali-arrival bio-swap-back checklist appended. `scout-*` temp scaffolding gitignored. |
| v2.9.1 | Apr 24, 2026 | **Clip backfill is now a documented standard step** of the daily tracker workflow (CLAUDE.md "Standard daily tracker workflow" section). `tracker:from-title` archives days but does not auto-attach clips — they're curated, not auto-picked, so they have to be attached in the same session via `update-tracker.js --day N --clip "..."`. Without it, the clip archive at faithwalklive.com/clips silently lags the map. Backfilled Day 28 (rest at Columbus, OH — "SUPPORT FLIES OUT THE CAR TO MEET ZAY" 18v) and Day 29 (London, OH arrival — "Another Milestone!!!" 16v) which had been missing. Added an audit one-liner so any future gap is one command away. |
| v2.9.0 | Apr 24, 2026 | **Multi-clip "Love Wall" schema + render** — checkpoints can now carry a `clips: []` array + optional `clipsTitle` for milestone days where multiple Twitch clips deserve the same card (e.g. Day 30 one-month-in support wave). Backward-compatible: `clip` still works for single-clip days; `clips` takes priority when present, with `clip` set to the first entry as a legacy fallback for older renderers. Updates: `update-tracker.js` accepts `--clips "url1,url2,url3"` + `--clips-title "..."`; consulting tracker (`src/faith-walk-tracker/index.html`) renders the wall as a titled pill row in the card + condensed inline links in the map popup; faithwalklive (sibling repo) gets matching support via shared `clipsFor()` helper in `src/lib/checkpoints.ts` — wall pills under the metric row in `MapClient.tsx`, popup links via `ClipLinks` in `TrackerMap.tsx`, and the `/clips` archive page flattens multi-clip days so each clip becomes its own card. Day 30 Love Wall slugs vetted but parked in `docs/day30-love-wall-pending.md` until the team updates the Twitch title tomorrow and the standard archive workflow runs. |
| v2.8.0 | Apr 24, 2026 | New **Research protocol** — when the user introduces a new non-trivial tactic/tool/concept, Claude auto-spins up multiple sub-agents IN PARALLEL (Reddit, YouTube, X, case-study blogs) to find the highest-ROI approach with hard numbers, synthesized into ONE ranked recommendation. Hype-without-data is flagged explicitly. Best practices ≠ ROI — default to ROI. Rule persists in CLAUDE.md so future sessions follow it without being told. |
| v2.7.1 | Apr 23, 2026 | Title parser accepts spelled-out state names (`LONDON, OHIO`) in addition to 2-letter codes (`LONDON, OH`). Day 29 title "26 MILES FROM LONDON, OHIO" was being rejected because the state-code group required exactly 2 uppercase letters. Regex widened to `{2,}`; Nominatim handles full state names fine. README gains a clear "Daily tracker workflow" section. |
| v2.7.0 | Apr 21, 2026 | Book project scaffolding — `scripts/sync-book.js` + `scripts/lib/book-sync.js` mirror `book/source-material/` to private sibling `../faithwalkbook` repo (`npm run book:sync`). Apocrypha source PDF added at `docs/1611KjvW_apocrypha.pdf` for verse sourcing. CLAUDE.md gains a "Date / clip cross-reference (Twitch GQL)" section documenting the public clip query workflow for clip backfills + date verification against Twitch source-of-truth. |
| v2.6.0 | Apr 19, 2026 | Auto-sync to faithwalklive.com — every `tracker:update` / `tracker:from-title` now mirrors `checkpoints.json` to the sibling `../faithwalklivecom` repo, commits, and pushes (Vercel redeploys). Stashes unrelated WIP in the public repo before rebasing, restores after. Best-effort: failures log a warning but never block the consulting commit. New `npm run faithwalk:sync` for manual one-shot sync. Day 24 Mt. Vernon OH (494 mi) confirmed, Day 25 rest annotated. |
| v2.5.0 | Apr 18, 2026 | OBS stream overlay shipped to production at `faithwalklive.com/obs` — merged `feat/obs-overlay` → main on sibling `faithwalklive` repo. Full-bleed dark map + gold polyline + pulsing beacon, `?bare=1` hides stats, `?brand=0` hides AI Bible Gospels watermark. Also shipped `/live` UTM redirect for stream-overlay attribution. Delivered to ShuggC for OBS browser-source use. |
| v2.4.1 | Apr 15, 2026 | Fix rollover promotion when rest-only archives shadow in-progress source — `tracker:from-title` now walks back past rest-only entries to find the walking checkpoint holding `inProgressDay`, so Day N auto-promotes as estimated even after a rest-day archive. Day 20 Alliance OH confirmed from Route Team Discord post, Day 21 Canton OH in progress (24 mi) |
| v2.4.0 | Apr 14, 2026 | Memory sync across laptop/desktop via `.claude/memory/` + `scripts/memory-sync.js` (npm run memory:push/pull/status), DONT_FORGET.md reminder file at repo root, fixed 7 off-by-1/2 date errors on Days 5-10 and Day 16 verified against Twitch VOD history |
| v2.3.0 | Apr 13, 2026 | Rest-day support: parser detects "REST DAY" in title, tracker shows "Day N — REST DAY 💤" label on active checkpoint and stat bar syncs to current Twitch day |
| v2.2.1 | Apr 13, 2026 | Fix intro video progress bar to show real walk progress (~12%) instead of animating to Cali, added Steps Walked counter to tracker stats bar |
| v2.2.0 | Apr 13, 2026 | 90-second intro video highlight reel using 15 Twitch clips from the walk, Remotion OffthreadVideo, Day 18 Columbiana OH logged |
| v2.1.0 | Apr 12, 2026 | Twitch clip per day on checkpoint cards + map popups, `--clip` flag on update-tracker.js, clip-only backfill mode, parser fix for "MILES TO" title format |
| v2.0.0 | Apr 12, 2026 | Title-driven auto-updater (`tracker:from-title`), in-progress "heading to" display with dashed map line, day rollover with auto-promotion, refactored scripts into `lib/` modules, tinyurl for tracker link |
| v1.0.0 | Apr 6, 2026 | Initial: intro video, platform research, live tracker, auto-clipper, chatbot, Discord scraper, manual tracker update |

## Project Overview
AI automation consulting project for **Isaiah "Minister Zay" Thomas**, founder of Stay Humble Stay Hungry (HMBL) Clothing. Goal: become the main AI consultant for his brand and movement.

## Client: Minister Zay
- **Real Name:** Isaiah M. Thomas
- **Brand:** HMBL — Stay Humble Stay Hungry Clothing
- **Location:** Philadelphia, PA
- **Revenue:** ~$2.4M (2022)
- **Stores:** 4 locations (Willow Grove, Fashion District, Morristown, Palisades Center)
- **Platforms:** Instagram (58K+ & 130K+), TikTok (40K+), Twitch (8K+), Twitter/X, Facebook, YouTube, Shopify
- **Active Event:** Faith Walk — walking 3,000 miles from Philly to Cali, streaming daily on Twitch (hmblzayy)

## File Map

| File/Folder | Purpose |
|-------------|---------|
| `research/` | All platform research and profiles |
| `research/master-profile.md` | Comprehensive client profile |
| `research/instagram/` | Instagram research |
| `research/tiktok/` | TikTok research |
| `research/twitch/` | Twitch / Faith Walk research |
| `research/youtube/` | YouTube research |
| `research/twitter-x/` | Twitter/X research |
| `research/facebook/` | Facebook research |
| `research/website/` | Shopify store research |
| `research/press-coverage/` | Articles and interviews |
| `research/discord/` | Discord community intel (HMBL University) |
| `assets/` | Media assets (video, images, audio) |
| `scripts/discord-scraper.js` | Pull all Discord server data |
| `scripts/download-footage.js` | Download media from Discord |
| `scripts/update-tracker.js` | Manual tracker update (confirmed arrivals — clears estimate flags) |
| `scripts/tracker-from-title.js` | Title-driven daily updater — reads Twitch title + previous checkpoint |
| `scripts/twitch-tracker-sync.js` | Watch wrapper — runs tracker-from-title on a 30-min loop |
| `scripts/lib/` | Shared helpers (git-sync, twitch, geo, tracker file ops, faithwalklive-sync) |
| `scripts/sync-faithwalklive.js` | Manual one-shot mirror of checkpoints.json → `../faithwalklivecom` repo |
| `scripts/sync-book.js` | Manual mirror of `book/source-material/` → `../faithwalkbook` private repo |
| `book/` | Source material for the book project (timelines mined from this repo). The book itself — outline, chapters, personal — lives in private sibling repo `../faithwalkbook`. |
| `scripts/twitch-clipper.js` | Auto-clip stream moments for all platforms |
| `scripts/twitch-chatbot.js` | Chatbot with custom HMBL commands |
| `scripts/memory-sync.js` | Sync Claude memory between `.claude/memory/` (git) and `~/.claude/projects/.../memory/` |
| `.claude/memory/` | Checked-in copy of Claude's per-project auto-memory — mirrored to laptop + desktop via git |
| `src/intro-video/` | Remotion intro video (vertical + wide + square) |
| `src/faith-walk-tracker/` | Interactive map tracker (GitHub Pages) |
| `docs/` | Documentation, proposals, pitch messages |
| `docs/remix-overview.md` | Full external-distribution funnel blueprint — remix targets + Story sticker + ManyChat DM capture + UTM scheme. Active strategy (v2.8.0, Apr 24) for driving tracker traffic since Zay's team isn't. |
| `docs/remix-playbook-day30.md` | Day-specific ready-to-ship execution pack: Story sticker copy + ManyChat "WALK" flow spec for the current tracker day. Recreate per day when shipping. |
| `docs/playbook-days-33-40.md` | **ACTIVE distribution playbook for Days 33-40 (Apr 27 – May 4, 2026).** Supersedes `remix-playbook-today.md` for that window. Built off Apr 27 4-agent ROI re-check — daily TT Stitch on Zay's 2M-view post + first-comment camp + IG Story sticker. 8 verses pre-extracted from `docs/1611KjvW_apocrypha.pdf` (Galatians 6:9 → wilderness trio). Day 40 = face-on-cam Duet/Remix swing. |
| `docs/aeo-youtube-description-spec.md` | Hand-off spec for the youtubeoptermizer Claude instance — exact YouTube video description template + pinned identity strings + hard rules to make AI Bible Gospels videos quotable by answer engines. |

## Commands
```bash
npm run discord:scrape       # Pull all Discord server data
npm run discord:download     # Download media from Discord
npm run tracker:from-title   # DAILY: read Twitch title + update tracker (idempotent)
npm run tracker:update       # Manual confirmed arrival: --day X --location "City, ST" --miles X
npm run tracker:sync         # One-time check Twitch (delegates to tracker:from-title)
npm run tracker:watch        # Run tracker:from-title every 30 min
npm run faithwalk:sync       # Manual: mirror checkpoints.json → ../faithwalklivecom + push (Vercel redeploys)
npm run book:sync            # Manual: mirror book/source-material/ → ../faithwalkbook (private book repo)
npm run clips                # Auto-clip stream moments (needs ffmpeg)
npm run chatbot              # Run Twitch chatbot
npm run memory:status        # Compare repo memory vs local ~/.claude memory
npm run memory:push          # Copy local ~/.claude memory INTO repo (before git commit)
npm run memory:pull          # Copy repo memory OUT to local ~/.claude (after git pull on new machine)
```

## Live URLs
- **Tracker:** https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html
- **Repo:** https://github.com/12TribesofIsrael/AIconsultantforHmblzayy

## Standard daily tracker workflow (do not skip the clip step)

Every tracker update — title-driven OR manual — has **two halves**, and both must run for the public site to stay in sync. The clip archive (faithwalklive.com/clips) sources its entries from `checkpoints.json`'s `clip` / `clips` fields; if a day archives without a clip attached, the archive silently falls behind the map.

**The rule:** *every promoted day, including rest days, must end up with a clip before the workflow is considered done.* If you can't find one, attach a placeholder note in the commit so the gap is obvious.

### Half 1 — promote / archive the day (location + miles)

```bash
# Title-driven (preferred — runs idempotently from Twitch title):
npm run tracker:from-title

# Manual confirmed arrival (clears estimate flags):
node scripts/update-tracker.js --day N --location "City, ST" --miles XXX
```

`tracker:from-title` handles in-progress annotation, day rollover (auto-promotes yesterday's destination as `estimatedMiles: true`), and rest-day annotation. Manual `tracker:update` is for confirmed arrivals or corrections.

### Half 2 — attach the day's clip (do this in the same session)

`tracker:from-title` does NOT auto-attach clips — clips are curated, not auto-picked. After Half 1 promotes a day, immediately run:

```bash
# 1. Find candidates for that date (use LAST_WEEK; LAST_DAY only covers ~24h):
node -e "
const https=require('https');
const q=JSON.stringify({query:'{user(login:\"hmblzayy\"){clips(first:100,criteria:{period:LAST_WEEK,sort:VIEWS_DESC}){edges{node{slug title createdAt viewCount url}}}}}'});
const r=https.request({hostname:'gql.twitch.tv',path:'/gql',method:'POST',headers:{'Client-ID':'kimne78kx3ncx6brgo4mv6wki5h1ko','Content-Type':'application/json','Content-Length':Buffer.byteLength(q)}},res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{const e=JSON.parse(d).data.user.clips.edges;e.filter(x=>x.node.createdAt.startsWith('2026-MM-DD')).slice(0,10).forEach(x=>console.log(x.node.viewCount+'v | '+x.node.title+' | '+x.node.url))})});
r.write(q);r.end();
"
# (replace 2026-MM-DD with the day's UTC date)

# 2. Pick the highest-view faith/support/milestone-aligned clip
#    (per memory: pattern is "Day 23 'GOD DID' 70v, Day 24 'w chrisean' 78v" —
#    highest view among themed clips, not the absolute top by views).

# 3. Attach it:
node scripts/update-tracker.js --day N --clip "https://www.twitch.tv/hmblzayy/clip/SLUG-XYZ"

# Or for milestone days with a "Love Wall" of multiple clips:
node scripts/update-tracker.js --day N --clips "url1,url2,url3" --clips-title "Caption"
```

Both halves auto-rebuild HTML, commit, push, and mirror to faithwalklive (Vercel redeploys). Two pushes per day = two ~1-min Vercel builds.

### Audit the gap any time

```bash
node -e "
const cps=require('./src/faith-walk-tracker/checkpoints.json');
const missing=cps.filter(c=>!c.clip&&!(c.clips&&c.clips.length));
console.log('Days missing clips:',missing.length);
missing.forEach(c=>console.log('  Day '+(c.day||'?')+(c.restOnly?' (rest)':'')+' — '+c.location+' — '+c.date));
"
```

If anything shows up, backfill before doing any other tracker work.

## Date / clip cross-reference (Twitch GQL)

When the user states a day number, location, or date — or when a tracker update goes in without a clip — **verify against Twitch's source-of-truth** before publishing. The clips list is the most reliable date anchor (each clip is timestamped UTC; daily streams produce dozens of clips per day).

**Public clip listing:** https://www.twitch.tv/hmblzayy/clips

**Programmatic query** (no auth, public web client ID, same endpoint `scripts/lib/twitch.js` uses):
```js
// Pulls up to 100 recent clips with createdAt timestamps + view counts.
// Filter by createdAt date prefix to find the day.
const postData = JSON.stringify({
  query: `{
    user(login: "hmblzayy") {
      clips(first: 100, criteria: { period: LAST_WEEK, sort: VIEWS_DESC }) {
        edges { node { slug title createdAt durationSeconds viewCount url } }
      }
    }
  }`
});
// POST to https://gql.twitch.tv/gql with header Client-ID: kimne78kx3ncx6brgo4mv6wki5h1ko
```

Use cases:
- **Backfill missing clips**: when running `tracker:update` or after `tracker:from-title` and a day has `clip: null`, query clips for that date and pick the highest-view faith-aligned one (matches the existing pattern: Day 23 "GOD DID" 70v, Day 24 "w chrisean" 78v).
- **Verify dates**: if the user says "Day N was at city X on date Y" and it conflicts with checkpoints.json, cross-reference clip timestamps (and stream titles via `fetchStreamTitle`) before changing anything. Don't blindly accept stated dates if Twitch contradicts them.
- **VOD fallback**: VODs age off (~14d affiliates / 60d partners), but clips persist longer and timestamp the actual stream day.

`period` accepts `LAST_DAY | LAST_WEEK | LAST_MONTH | ALL_TIME`. `sort` `VIEWS_DESC` is most reliable; `CREATED_AT_DESC` sometimes 500s.

## Research protocol — 4-agent ROI check on new concepts

When the user introduces **any substantive new direction** (new tactic, tool, concept, feature, deliverable, content play, product pitch, growth loop, workflow, automation) and we don't already have research on it in this repo, **ask first**:

> *"Want me to run the 4-agent ROI check on this?"*

If yes, spin up **4 sub-agents in parallel** — one per source:

- **Reddit** — r/marketing, r/socialmedia, r/Entrepreneur, r/CreatorEconomy, r/InfluencerMarketing + niche-specific subs. What real people say: pain points, honest reviews, what actually worked vs. flopped. Note: Reddit often blocks direct scraping; agent should report honestly when that happens and fall back to Reddit-adjacent surfaces.
- **YouTube** — tutorials, case studies, "I tried X for 30 days" style breakdowns. Creator-economy educators / growth practitioners who publish specific A/B or conversion data (Think Media, Matt Gray, Pat Flynn, Jenny Hoyos, Dan Koe, Justin Welsh, Ali Abdaal). Prefer numbers over vibes.
- **X / Twitter** — current discourse, who's winning with it, hot takes. Growth operators + creator threads (Buffer, Justin Welsh, Amanda Natividad, SparkToro tier).
- **Case-study blogs** — written deep-dives, business breakdowns, hard numbers. HubSpot, Buffer, Later, Sprout Social, Ahrefs, ConvertKit, Hootsuite, Social Media Examiner, Rival IQ, Socialinsider.

**Each agent answers the same five questions** for the specific use case:

1. Is it worth it?
2. What's the realistic outcome (upside + downside)?
3. How complicated/intense is it to execute?
4. Is there a better way to frame what we're trying to accomplish?
5. Is there a simpler alternative that gets the same outcome?

**Delivery format:** 4 separate reports, stitched together — **not** one synthesized brief. Keep each channel's distinct signal visible (Reddit skeptics often disagree with YouTube evangelists; that's the point). End with a short Thomas-facing recommendation: **ship / reframe / skip**. Flag hype-without-data explicitly so the user knows what's proven vs. asserted.

**Best practices ≠ ROI.** Best practices = what the field calls "right" (convention, safety, politeness). ROI = what actually moves the needle per unit of effort, for *this* goal, measured in clicks/conversions/attention. When they diverge, default to ROI unless the user asks for best-practice compliance (security, legal, accessibility).

**When to trigger:** new social-media play, new pipeline tool, new automation pattern, new funnel idea, new growth tactic, new platform strategy, new product pitch to Zay.
**When to skip:** trivial/obvious changes, decisions with clear precedent in this repo, or user explicitly says "skip research, just ship."

## Deliverables
1. **Intro Video** — Looping Faith Walk video with music (DONE — used on stream)
2. **Platform Research** — Complete social media audit across 8 platforms (DONE)
3. **Faith Walk Tracker** — Live interactive map on GitHub Pages (DONE)
4. **Twitch Auto-Clipper** — Stream → TikTok/IG/YouTube clips (DONE)
5. **Twitch Chatbot** — Custom HMBL commands (!progress, !route, !pray, etc.) (DONE)
6. **Discord Bot** — Server scraper ready, awaiting bot invite to HMBL University
