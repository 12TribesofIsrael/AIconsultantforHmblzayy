# ZayAutomations — AI Consulting for Minister Zay / HMBL

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
| `scripts/lib/` | Shared helpers (git-sync, twitch, geo, tracker file ops) |
| `scripts/twitch-clipper.js` | Auto-clip stream moments for all platforms |
| `scripts/twitch-chatbot.js` | Chatbot with custom HMBL commands |
| `src/intro-video/` | Remotion intro video (vertical + wide + square) |
| `src/faith-walk-tracker/` | Interactive map tracker (GitHub Pages) |
| `docs/` | Documentation, proposals, pitch messages |

## Commands
```bash
npm run discord:scrape       # Pull all Discord server data
npm run discord:download     # Download media from Discord
npm run tracker:from-title   # DAILY: read Twitch title + update tracker (idempotent)
npm run tracker:update       # Manual confirmed arrival: --day X --location "City, ST" --miles X
npm run tracker:sync         # One-time check Twitch (delegates to tracker:from-title)
npm run tracker:watch        # Run tracker:from-title every 30 min
npm run clips                # Auto-clip stream moments (needs ffmpeg)
npm run chatbot              # Run Twitch chatbot
```

## Live URLs
- **Tracker:** https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html
- **Repo:** https://github.com/12TribesofIsrael/AIconsultantforHmblzayy

## Deliverables
1. **Intro Video** — Looping Faith Walk video with music (DONE — used on stream)
2. **Platform Research** — Complete social media audit across 8 platforms (DONE)
3. **Faith Walk Tracker** — Live interactive map on GitHub Pages (DONE)
4. **Twitch Auto-Clipper** — Stream → TikTok/IG/YouTube clips (DONE)
5. **Twitch Chatbot** — Custom HMBL commands (!progress, !route, !pray, etc.) (DONE)
6. **Discord Bot** — Server scraper ready, awaiting bot invite to HMBL University
