# Quick Reference — Links & Commands

## Live URLs
- **Faith Walk Tracker:** https://tinyurl.com/y667pssw
  - *Canonical:* https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html
- **Faith Walk Live (pivot site):** https://faithwalklive.com
- **OBS Stream Overlay (for ShuggC):** https://faithwalklive.com/obs?bare=1
  - Add `&brand=0` to hide the AI Bible Gospels watermark
  - Drop `bare=1` to show Day / Miles / Percent stats panel
- **Stream-overlay redirect (UTM attribution):** https://faithwalklive.com/live
- **Analytics Dashboard:** https://hmbl-faithwalk.goatcounter.com
- **GitHub Repos:** https://github.com/12TribesofIsrael/AIconsultantforHmblzayy · https://github.com/12TribesofIsrael/faithwalklive
- **Your YouTube:** https://www.youtube.com/@AIBIBLEGOSPELS

## Minister Zay Socials
- **Instagram (personal):** https://instagram.com/ministerzay (58K+)
- **Instagram (brand):** https://instagram.com/hmblzay (130K+)
- **TikTok:** https://tiktok.com/@ministerzay (40K+)
- **Twitch:** https://twitch.tv/hmblzayy (8K+)
- **Twitter/X:** https://x.com/minister_zay
- **Facebook:** https://facebook.com/ministerzay
- **YouTube:** https://youtube.com/@stayhumblestayhungryhmbl3203
- **Shopify:** https://stayhumblestayhungryclothing.com
- **Discord:** HMBL University (Server ID: 1488313982581346396)

## Daily Commands
```bash
# Title-driven update (RECOMMENDED) — pulls live Twitch title, annotates
# in-progress day, auto-promotes yesterday's destination on day rollover.
# Idempotent: no commit if nothing changed.
npm run tracker:from-title

# Manual arrival (use when you know the actual mileage Zay walked).
# Strips any auto-estimate and treats your number as ground truth.
npm run tracker:update -- --day 17 --location "Beaver Falls, PA" --miles 327

# Attach a Twitch clip to a day (backfill or new)
npm run tracker:update -- --day 16 --clip "https://www.twitch.tv/hmblzayy/clip/..."

# New day with clip attached
npm run tracker:update -- --day 18 --location "Columbiana, OH" --miles 365 --clip "https://..."

# Manual in-progress (skip if tracker:from-title is doing it for you)
npm run tracker:update -- --destination "Cranberry, PA" --miles-remaining 22

# Watch mode — calls tracker:from-title every 30 min via Twitch sync
npm run tracker:watch

# Run auto-clipper when he's live (needs ffmpeg)
npm run clips

# Run chatbot (needs TWITCH_BOT_TOKEN in .env)
npm run chatbot

# Scrape Discord (once bot is invited)
npm run discord:scrape

# Download footage from Discord
npm run discord:download
```

## Copy-Paste Messages

### Twitch Chat
```
This Faith Walk is inspiring the world 🙏🏾 I built a live tracker so everyone can follow every step — Philly to Cali in real time: tinyurl.com/y667pssw
```

### TikTok (under 150 chars)
```
Zay walking 3,000 miles Philly to Cali for the Most High 🙏🏾 Live tracker for every step 💯 tinyurl.com/y667pssw
```

### Discord (longer version)
```
Peace family 🙏🏾

This Faith Walk has been one of the most powerful things I've ever witnessed. Watching Zay put his body on the line for God's mission every single day — that's real faith. Not talked about. Walked out. 3,000 miles of it.

I wanted to do my part to support the mission, so I built a live interactive Faith Walk tracker. Every checkpoint from Day 1 in Philly to wherever he is right now — updated daily on a real map.

tinyurl.com/y667pssw

Every step is a prayer. All Praises to The Most High 🙏🏾
```

## Key Contacts
- **ShuggC | MR.DOTCONNECTOR [CR8Z]** — Handles all tech for HMBL. Twitch: twitch.tv/shuggc | IG: @shuggc | Also owns ClubX Philly (@club_x_philly). Bringing us onto the tech team. Asked about OBS embed for tracker. Shouted out the tracker at Town Hall (Apr 9).
- **Minister Zay** — Linked up directly at Town Hall (Apr 9). Sending him leg compression sleeves for the walk. We're locked in.

## Timeline
- **Apr 6** — First contact with ShuggC in Discord. Pitched AI automations, shared intro video.
- **Apr 7** — ShuggC used intro video on stream. Cautious about bot access — team still organizing.
- **Apr 9 (morning)** — ShuggC: "Will be bringing you on the tech side. you snapped." Asked about OBS embed.
- **Apr 9 (Town Hall 8pm)** — ShuggC shouted out the tracker publicly. Talked directly with Zay — locked in. Team said 48 hours (by Apr 11) for onboarding confirmations.

## How the Tracker Update System Works

There are three scripts. `tracker:from-title` is the daily driver; `tracker:update` is the manual override; `tracker:watch` runs `tracker:from-title` on a 30-min loop.

### `npm run tracker:from-title` — Title-Driven Updater (Daily Driver)

Single command, no args. Reads Zay's live Twitch title and updates the tracker honestly:

1. **Pulls the title** from Twitch via the public GQL endpoint (no auth)
2. **Parses** day number, destination city, and "X MILES FROM" remaining
3. **Decides what to do** based on how `parsed.day` compares to the latest confirmed arrival:
   - **Same day** → he's already arrived, nothing to do
   - **Day + 1** → he's mid-walk on the next day. Annotate the latest checkpoint with `inProgressDay`, `destination`, `destinationLat/Lng`, `milesRemaining`, and `estimatedSegmentMiles` (haversine × 1.3). Map pin stays on the last *confirmed* location with a dashed line forward to the destination — never lies about his position.
   - **Day + 2 or more** → day rolled over while he was in-progress. Auto-promote yesterday's destination to a real arrival checkpoint with `estimatedMiles: true` and a `~` prefix on the mileage. Then annotate the freshly promoted checkpoint with the new title's in-progress state.
4. **Idempotent**: deep-compares the parsed title against existing fields. If nothing changed, no commit, no push. Safe to run on a 30-min loop.
5. **Sync-safe**: refuses to run on a dirty working tree, and pulls origin/main before mutating anything.

**Key invariant:** the script never creates an arrival with `estimatedMiles: false`. All confirmed mileage comes from manual `tracker:update --miles N` runs.

### `npm run tracker:update` — Manual Override

Use when you know the real mileage (e.g. Zay says "I walked 33 miles today" on stream). Two modes:

```bash
# Log a confirmed arrival (clears any estimate flag on that day)
npm run tracker:update -- --day 17 --location "Beaver Falls, PA" --miles 327

# Manually annotate in-progress (rare — tracker:from-title does this for you)
npm run tracker:update -- --destination "Cranberry, PA" --miles-remaining 22
```

When `--miles` is provided, `estimatedMiles` is stripped — your number is treated as ground truth and the `~` prefix disappears from the live tracker.

### `npm run tracker:watch` — Auto-Sync Every 30 Minutes

Wraps `tracker:from-title` in a 30-min interval. Leave running in a terminal to keep the tracker fresh while Zay is streaming. Each cycle is a no-op if nothing changed.

### Display Conventions on the Live Tracker

- **Map pin** sits on the latest *confirmed* arrival (never moves to a city Zay hasn't reached).
- **Dashed gold line** extends forward from the pin to the destination during in-progress days.
- **Stat bar** shows the in-progress day number (e.g. `DAY 17`) even before that day's arrival is logged. Total miles always shows the last confirmed cumulative number — never the estimate.
- **Mileage with `~` prefix** (e.g. `~325 MI`) means it's an auto-promoted estimate. Manual `tracker:update --miles N` clears it.

### Quick Troubleshooting
| Problem | Cause | Fix |
|---------|-------|-----|
| `Title incomplete: ... destination unknown` | Zay's title doesn't have a parseable "X MILES FROM CITY" pattern | Wait for the title to update, or run manual `tracker:update` |
| `Day rollover detected but no in-progress data to promote` | The day jumped 2+ without any in-progress annotation having been recorded | Run manual `tracker:update --day N --location "City, ST" --miles XXX` for the missed day |
| `Uncommitted local changes detected` | The script refuses to run on a dirty tree | Commit or stash your local edits, then re-run |
| Location is wrong on map | Geocoding picked the wrong city | Manual `tracker:update` with "City, ST" format (include state) |
| Tracker didn't update online | Git push failed | Run `git push origin main` manually |

## Strategy Reminders
- Don't spam — one message per platform, let it breathe
- Don't mention automations in chat — just be supportive
- Update tracker daily to show consistency
- When he crosses into Ohio (first state line) — that's the big moment
- Check analytics dashboard to see traffic after dropping links
