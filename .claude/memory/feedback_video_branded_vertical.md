---
name: Branded vertical from landscape source
description: When OBS records landscape (1920x1080) but Reel/TT/Short need vertical (1080x1920), render branded vertical with text in the letterbox bands instead of leaving them empty
type: feedback
---

When Thomas records the faithwalklive.com tracker in OBS at 1920×1080 (landscape canvas — his default) but needs vertical 1080×1920 for IG Reel / TikTok / YouTube Shorts, **don't push for a re-record at vertical canvas**. Lean into the constraint and produce the full multi-surface split — landscape works as-is for Twitter/X + YouTube long-form, square center-crop works for IG feed, and **branded vertical with text in the top/bottom bands** is the winning template for the vertical surfaces.

**Why:** When you letterbox 1920×1080 into 1080×1920, you get ~400px black bands top and bottom around the content. Empty bands look lazy and the algorithm punishes "wasted screen real estate." Filling the bands with branded text ("DAY N" headline + "X MILES WALKED" subhead + "LIVE TRACKER" footer + "link in bio") makes the layout look intentional and reads as a designed template at thumbnail size on the IG grid.

**How to apply:** Reusable ffmpeg recipe (rotate just the day number + miles each day):

```bash
# Copy fonts once per session (Windows -> .tmp/, ffmpeg drawtext can't escape Windows paths cleanly)
cp /c/Windows/Fonts/arial.ttf .tmp/arial.ttf
cp /c/Windows/Fonts/arialbd.ttf .tmp/arialbd.ttf

# Render branded vertical
ffmpeg -y -i assets/obs1.mp4 \
  -vf "crop=1040:1080:440:0,scale=1080:-2,pad=1080:1920:0:(1920-ih)/2:black,setsar=1,\
drawtext=fontfile=.tmp/arialbd.ttf:text='DAY 31':fontcolor=white:fontsize=140:x=(w-text_w)/2:y=140,\
drawtext=fontfile=.tmp/arial.ttf:text='607 MILES WALKED':fontcolor=0xfcc500:fontsize=56:x=(w-text_w)/2:y=300,\
drawtext=fontfile=.tmp/arialbd.ttf:text='LIVE TRACKER':fontcolor=white:fontsize=84:x=(w-text_w)/2:y=1620,\
drawtext=fontfile=.tmp/arial.ttf:text='link in bio':fontcolor=0xfcc500:fontsize=52:x=(w-text_w)/2:y=1740" \
  -an -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -movflags +faststart \
  assets/footage/cuts/vertical-branded-full-1080x1920.mp4
```

- Crop `1040:1080:440:0` zeroes in on the content (skip the empty side margins of the source).
- HMBL gold = `#fcc500`. Used for the miles subhead + "link in bio" footer.
- Strip audio (`-an`) — Reels/TT do best with trending audio added in-platform anyway.
- Trim to 60s for IG Reel + YT Short with `-t 60`; full duration works for TikTok.
- Pair with `square-1080x1080.mp4` (center-crop), `landscape-full-1920x1080.mp4` (Twitter/X + YT long), `story-bg-10s-1080x1920.mp4` (10s slice from a strong moment for Story background).

Established 2026-04-26 Day 31 distribution. Thomas confirmed the template works; pipeline is reproducible — just swap source + change day number + miles each day for Days 32-39.
