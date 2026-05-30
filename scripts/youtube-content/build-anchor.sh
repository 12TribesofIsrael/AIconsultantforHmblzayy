#!/usr/bin/env bash
# build-anchor.sh — assemble the Day 34 anchor video
# "He Was Hit by a Car at Mile 703 — And Kept Walking | Minister Zay's Faith Walk"
#
# Structure:
#   [title card]  Hook — 8 sec
#   [title card]  Who is Zay — 6 sec
#   [clip]        Day 33 Richmond IN (the day before)
#   [title card]  The Incident — 10 sec
#   [title card]  News coverage text — 10 sec
#   [title card]  The Recovery Days 35-38 — 8 sec
#   [clip]        Day 39 Greenfield IN (the return)
#   [clip]        Day 40 Indianapolis IN
#   [title card]  Where is he now — 8 sec
#   [title card]  CTA — 10 sec
#
# Run from repo root: bash scripts/youtube-content/build-anchor.sh

set -euo pipefail

RAW="assets/youtube/raw"
ANCHOR="assets/youtube/anchor"
OUT_FILE="assets/youtube/day-34-anchor.mp4"
FONT_BOLD="C\\:/Windows/Fonts/arialbd.ttf"
FONT_REG="C\\:/Windows/Fonts/arial.ttf"
FONT_LARGE=96
FONT_MED=64
FONT_SM=48
W=1920
H=1080
GOLD="0xfcc500"

mkdir -p "$RAW" "$ANCHOR"

# ─── Helper: make a title card (black bg + centered text) ─────────────────

make_card() {
  local name="$1" duration="$2" line1="$3" line2="${4:-}" line3="${5:-}"
  local out="$ANCHOR/${name}.mp4"
  [[ -f "$out" ]] && { echo "  ✓ Card exists: $name"; return; }
  echo "  ▶ Card: $name"

  local vf="color=black:size=${W}x${H}:rate=30,format=yuv420p"
  vf+=",drawtext=fontfile='$FONT_BOLD':text='${line1}':fontcolor=white:fontsize=${FONT_LARGE}:x=(w-text_w)/2:y=(h-text_h)/2-80"
  [[ -n "$line2" ]] && vf+=",drawtext=fontfile='$FONT_REG':text='${line2}':fontcolor=${GOLD}:fontsize=${FONT_MED}:x=(w-text_w)/2:y=(h-text_h)/2+40"
  [[ -n "$line3" ]] && vf+=",drawtext=fontfile='$FONT_REG':text='${line3}':fontcolor=white:fontsize=${FONT_SM}:x=(w-text_w)/2:y=(h-text_h)/2+120"

  ffmpeg -y -f lavfi -i "$vf" -f lavfi -i "aevalsrc=0:c=stereo:s=44100" -t "$duration" \
    -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -shortest \
    "$out" 2>/dev/null
  echo "  ✓ $out"
}

# ─── Helper: download + trim a clip ───────────────────────────────────────

get_clip() {
  local name="$1" url="$2" trim_end="${3:-}"
  local raw="$RAW/${name}-raw.mp4"
  local out="$ANCHOR/${name}.mp4"
  [[ -f "$out" ]] && { echo "  ✓ Clip exists: $name"; return; }
  echo "  ▶ Downloading: $name"
  python -m yt_dlp --quiet -o "$raw" "$url"
  echo "  ▶ Trimming/scaling: $name"
  local trim_arg=""
  [[ -n "$trim_end" ]] && trim_arg="-t $trim_end"
  ffmpeg -y -i "$raw" $trim_arg \
    -vf "scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:black" \
    -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p \
    -c:a aac -b:a 128k \
    "$out" 2>/dev/null
  rm -f "$raw"
  echo "  ✓ $out"
}

echo ""
echo "━━━ BUILDING DAY 34 ANCHOR VIDEO ━━━"
echo ""

# ─── Title cards ──────────────────────────────────────────────────────────

echo "[ 1/10 ] HOOK card"
make_card "01-hook" 8 \
  "Day 34 of a 3,000-Mile Walk." \
  "He was hit by a car." \
  "5 days later — he was back."

echo "[ 2/10 ] WHO IS ZAY card"
make_card "02-who-is-zay" 6 \
  "Minister Zay" \
  "Walking 3,000 miles — Philly to California" \
  "Streaming every day on Twitch"

echo "[ 3/10 ] Day 33 clip — the day before"
get_clip "03-day33-richmond" \
  "https://www.twitch.tv/hmblzayy/clip/BashfulGiftedOwlOhMyDog-onq1lG06jnunWLpy" \
  "90"

echo "[ 4/10 ] THE INCIDENT card"
make_card "04-incident" 10 \
  "April 28, 2026. Day 34." \
  "Accident on the route." \
  "Zay was hospitalized. The walk paused."

echo "[ 5/10 ] NEWS COVERAGE card"
make_card "05-news" 10 \
  "The world took notice." \
  "TMZ  •  The Shade Room  •  Fox 29  •  Fox 59" \
  "The faith community showed up."

echo "[ 6/10 ] RECOVERY card"
make_card "06-recovery" 8 \
  "Days 35 – 38" \
  "Recovery." \
  "HMBL University Discord filled with prayers."

echo "[ 7/10 ] Day 39 clip — the return"
get_clip "07-day39-return" \
  "https://www.twitch.tv/hmblzayy/clip/SarcasticIncredulousSrirachaRitzMitz-5fBoiuxl0P90xSo9" \
  "90"

echo "[ 8/10 ] Day 40 clip — Indianapolis"
get_clip "08-day40-indy" \
  "https://www.twitch.tv/hmblzayy/clip/YawningCrepuscularDonutKreygasm-PEbHBmiNWUVwXjZK" \
  "90"

echo "[ 9/10 ] WHERE IS HE NOW card"
make_card "09-where-now" 8 \
  "Day 65.  1,245+ Miles." \
  "Missouri — and still walking." \
  "He has never stopped."

echo "[ 10/10 ] CTA card"
make_card "10-cta" 10 \
  "Follow the walk." \
  "faithwalklive.com  •  Live map  •  Prayer wall" \
  "Support → gofundme.com/f/help-launch-hmbl-summer-camp-for-teens"

# ─── Concat list ──────────────────────────────────────────────────────────

echo ""
echo "━━━ Stitching segments ━━━"
CONCAT="$ANCHOR/concat.txt"
> "$CONCAT"
# Use Windows-style C:/ paths so FFmpeg can read them outside Git Bash
WIN_ROOT="$(pwd | sed 's|^/c/|C:/|')"
for seg in 01-hook 02-who-is-zay 03-day33-richmond 04-incident 05-news \
           06-recovery 07-day39-return 08-day40-indy 09-where-now 10-cta; do
  echo "file '${WIN_ROOT}/$ANCHOR/${seg}.mp4'" >> "$CONCAT"
done

ffmpeg -y -f concat -safe 0 -i "$CONCAT" \
  -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 128k \
  "$OUT_FILE" 2>/dev/null

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ Anchor video → $OUT_FILE"
ls -lh "$OUT_FILE"
