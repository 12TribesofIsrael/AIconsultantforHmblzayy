#!/usr/bin/env bash
# prep-clip.sh — download a Twitch clip and render it as a branded YouTube Short
#
# Usage:
#   ./scripts/youtube-content/prep-clip.sh \
#     --day 39 \
#     --city "Greenfield, IN" \
#     --miles 732 \
#     --clip-url "https://www.twitch.tv/hmblzayy/clip/SLUG"
#
# Output: assets/youtube/day-<N>-short.mp4
#
# Requires: yt-dlp, ffmpeg
# Fonts:    Arial Bold + Arial pulled from Windows font cache (or pass --font-dir)

set -euo pipefail

DAY=""
CITY=""
MILES=""
CLIP_URL=""
FONT_DIR="C\\:/Windows/Fonts"
OUT_DIR="assets/youtube"

# Parse args
while [[ $# -gt 0 ]]; do
  case "$1" in
    --day)       DAY="$2";       shift 2 ;;
    --city)      CITY="$2";      shift 2 ;;
    --miles)     MILES="$2";     shift 2 ;;
    --clip-url)  CLIP_URL="$2";  shift 2 ;;
    --font-dir)  FONT_DIR="$2";  shift 2 ;;
    --out-dir)   OUT_DIR="$2";   shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

if [[ -z "$DAY" || -z "$CITY" || -z "$CLIP_URL" ]]; then
  echo "Usage: $0 --day N --city \"City, ST\" --miles N --clip-url URL"
  exit 1
fi

MILES_LABEL="${MILES:+${MILES} MILES WALKED}"
SLUG="day-$(printf '%02d' "$DAY")-short"
TMP_RAW="$OUT_DIR/${SLUG}-raw.mp4"
OUT_FILE="$OUT_DIR/${SLUG}.mp4"
FONT_BOLD="$FONT_DIR/arialbd.ttf"
FONT_REG="$FONT_DIR/arial.ttf"

mkdir -p "$OUT_DIR"

echo "▶ Downloading clip..."
python -m yt_dlp --quiet -o "$TMP_RAW" "$CLIP_URL"

echo "▶ Rendering Short (1080×1920)..."
ffmpeg -y -i "$TMP_RAW" \
  -vf "crop=ih*9/16:ih,scale=1080:1920,setsar=1,\
drawtext=fontfile='$FONT_BOLD':text='DAY ${DAY} of 3000':fontcolor=white:fontsize=88:x=(w-text_w)/2:y=110,\
drawtext=fontfile='$FONT_REG':text='${CITY}':fontcolor=0xfcc500:fontsize=60:x=(w-text_w)/2:y=220,\
drawtext=fontfile='$FONT_REG':text='${MILES_LABEL}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=300,\
drawtext=fontfile='$FONT_BOLD':text='faithwalklive.com':fontcolor=0xfcc500:fontsize=52:x=(w-text_w)/2:y=1790" \
  -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 128k \
  "$OUT_FILE"

rm -f "$TMP_RAW"

echo "✓ Done → $OUT_FILE"
