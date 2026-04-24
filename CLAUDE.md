# ZayAutomations — AI Consulting for Minister Zay / HMBL

**Current Version: v2.8.0**

## Versioning
We use semver (MAJOR.MINOR.PATCH). Bump on every feature/fix:
- **MAJOR** — big new system or breaking change (e.g. new tracker architecture)
- **MINOR** — new feature added to existing system (e.g. in-progress display, parser fix)
- **PATCH** — bug fix, typo, doc-only change

Update the version in **both** this file (above) and `package.json` on every feature commit.

### Changelog
| Version | Date | Changes |
|---------|------|---------|
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
