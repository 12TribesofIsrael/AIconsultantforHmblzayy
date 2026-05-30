#!/usr/bin/env bash
# gen-all-descriptions.sh — generate all YouTube descriptions and save to files
# Run from repo root: bash scripts/youtube-content/gen-all-descriptions.sh

set -euo pipefail

OUT="assets/youtube/descriptions"
mkdir -p "$OUT"

gen() {
  local d="$1" dtype="$2" file="$OUT/day-$(printf '%02d' "$1")-${2}.txt"
  echo "  ▶ Day $d ($dtype)"
  node scripts/youtube-content/description-gen.js --day "$d" --type "$dtype" > "$file"
  echo "  ✓ $file"
}

echo ""
echo "━━━ GENERATING DESCRIPTIONS ━━━"
echo ""

# Anchor video
gen 34 anchor

# Milestone episodes
gen 1  milestone
gen 17 milestone
gen 30 milestone
gen 39 milestone
gen 40 milestone
gen 52 milestone
gen 59 milestone
gen 64 milestone

# Shorts
gen 39 short
gen 59 short
gen 52 short
gen 30 short
gen 17 short
gen 40 short
gen 64 short

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✓ All descriptions → $OUT/"
ls "$OUT/"
