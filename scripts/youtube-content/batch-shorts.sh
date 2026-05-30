#!/usr/bin/env bash
# batch-shorts.sh — download + render all 7 priority YouTube Shorts
# Run from repo root: bash scripts/youtube-content/batch-shorts.sh

set -euo pipefail

RAW="assets/youtube/raw"
OUT="assets/youtube/shorts"
FONT_BOLD="C\\:/Windows/Fonts/arialbd.ttf"
FONT_REG="C\\:/Windows/Fonts/arial.ttf"

mkdir -p "$RAW" "$OUT"

render_short() {
  local day="$1" city="$2" miles="$3" url="$4"
  local slug="day-$(printf '%02d' "$day")-short"
  local raw="$RAW/${slug}-raw.mp4"
  local out="$OUT/${slug}.mp4"

  if [[ -f "$out" ]]; then
    echo "  ✓ Already exists: $out — skipping"
    return
  fi

  echo ""
  echo "━━━ Day $day — $city ━━━"
  echo "  ▶ Downloading..."
  python -m yt_dlp --quiet -o "$raw" "$url"

  echo "  ▶ Rendering Short..."
  ffmpeg -y -i "$raw" \
    -vf "crop=ih*9/16:ih,scale=1080:1920,setsar=1,\
drawtext=fontfile='$FONT_BOLD':text='DAY ${day} of 3000':fontcolor=white:fontsize=88:x=(w-text_w)/2:y=110,\
drawtext=fontfile='$FONT_REG':text='${city}':fontcolor=0xfcc500:fontsize=60:x=(w-text_w)/2:y=220,\
drawtext=fontfile='$FONT_REG':text='${miles} MILES WALKED':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=300,\
drawtext=fontfile='$FONT_BOLD':text='faithwalklive.com':fontcolor=0xfcc500:fontsize=52:x=(w-text_w)/2:y=1790" \
    -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -movflags +faststart \
    -c:a aac -b:a 128k \
    "$out" 2>/dev/null
  rm -f "$raw"
  echo "  ✓ $out"
}

# Priority order: highest emotional stakes first
render_short 39 "Greenfield, IN"    732  "https://www.twitch.tv/hmblzayy/clip/SarcasticIncredulousSrirachaRitzMitz-5fBoiuxl0P90xSo9"
render_short 59 "West Quincy, MO"   1133 "https://www.twitch.tv/hmblzayy/clip/RamshackleAbstruseOryxBibleThump-usvR98SKWCu57q6i"
render_short 52 "Springfield, IL"   999  "https://www.twitch.tv/hmblzayy/clip/JazzyUninterestedCaribouShazBotstix-aEM48-EpgFaYPWTD"
render_short 30 "Springfield, OH"   607  "https://www.twitch.tv/hmblzayy/clip/KawaiiRelievedJaguarTBTacoLeft-OX2AJJYXcMm3rXTg"
render_short 17 "Beaver Falls, PA"  343  "https://www.twitch.tv/hmblzayy/clip/AssiduousSteamyStapleLitty-lH-6s-vMT1AnbgSz"
render_short 40 "Indianapolis, IN"  752  "https://www.twitch.tv/hmblzayy/clip/YawningCrepuscularDonutKreygasm-PEbHBmiNWUVwXjZK"
render_short 64 "Salisbury, MO"     1245 "https://www.twitch.tv/hmblzayy/clip/FastExuberantBaconDogFace-v40O7pL-CfLvyz17"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ All 7 Shorts rendered → $OUT/"
ls -lh "$OUT/"
