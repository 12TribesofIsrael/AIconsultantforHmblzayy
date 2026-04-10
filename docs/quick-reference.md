# Quick Reference — Links & Commands

## Live URLs
- **Faith Walk Tracker:** https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html
- **Analytics Dashboard:** https://hmbl-faithwalk.goatcounter.com
- **GitHub Repo:** https://github.com/12TribesofIsrael/AIconsultantforHmblzayy
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
# Update tracker with today's checkpoint (arrival)
npm run tracker:update -- --day 16 --location "City, PA" --miles 280

# Mark mid-day in-progress (shows "heading to X" on current marker)
npm run tracker:update -- --destination "Cranberry, PA" --miles-today 35

# Auto-check Twitch for updates (one time)
npm run tracker:sync

# Auto-check Twitch every 30 min (leave running)
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
This Faith Walk is inspiring the world 🙏🏾 I built a live tracker so everyone can follow every step — Philly to Cali in real time: https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html
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

https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html

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

Two scripts work together to keep the tracker updated:

### Step 1: `npm run tracker:sync` (The Auto-Checker)
Reads Zay's Twitch stream title and tries to parse three things:
- **Day number** — looks for `DAY 15` in the title
- **Total miles** — looks for `214 MILES COMPLETED` or `MILES WALKED` (exact words needed)
- **Location** — looks for `LOCATION: City, ST` or `FROM CITYNAME`

If it finds ALL THREE, it auto-triggers the update script. If anything is missing, it tells you what's missing and you update manually.

**Known limitation:** Zay's titles usually say `33 MILES FROM VANDERGRIFT` — the script reads the city but can't get total miles because he doesn't put "X MILES COMPLETED" in the title. So it almost always says "miles unknown" and won't auto-update.

### Step 2: `npm run tracker:update` (The Actual Updater)
This is what changes the live tracker. When it runs (manually or triggered by sync):
1. **Geocodes** the city name → gets lat/lng coordinates from OpenStreetMap
2. **Adds** the checkpoint to `src/faith-walk-tracker/checkpoints.json`
3. **Rebuilds** the tracker HTML (injects new data into both `src/` and `docs/` copies)
4. **Git commits and pushes** → GitHub Pages auto-deploys in ~1 minute

Manual usage:
```bash
npm run tracker:update -- --day 16 --location "Vandergrift, PA" --miles 293
```

### Recommended Workflow: Update Every Night
- Zay's title changes throughout the day as he walks
- Wait until he stops streaming for the night
- Check Discord or stream for end-of-day total miles
- Run the manual update with final location and miles
- The tracker stays accurate and doesn't jump around mid-day

### Quick Troubleshooting
| Problem | Cause | Fix |
|---------|-------|-----|
| Sync says "miles unknown" | Zay's title doesn't include "MILES COMPLETED" | Update manually with total miles |
| Sync says "Already up to date" | Same day number as last checkpoint | Wait for a new day or update manually |
| Location is wrong on map | Geocoding picked wrong city | Re-run update with "City, ST" format (include state) |
| Tracker didn't update online | Git push failed | Run `git push origin main` manually |

## Strategy Reminders
- Don't spam — one message per platform, let it breathe
- Don't mention automations in chat — just be supportive
- Update tracker daily to show consistency
- When he crosses into Ohio (first state line) — that's the big moment
- Check analytics dashboard to see traffic after dropping links
