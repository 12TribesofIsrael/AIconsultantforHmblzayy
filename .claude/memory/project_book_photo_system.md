---
name: project_book_photo_system
description: "Thomas's weight-loss progress photo archive in faithwalkbook — confirmed weight arc, PIL generators for chart/grid, photo session protocol"
metadata: 
  node_type: memory
  type: project
  originSessionId: e67e9080-2750-484a-89a1-22ece1fef051
---

Full progress photo system lives in `faithwalkbook/personal/photos/`. PIL-based generators in `faithwalkbook/scripts/`.

**Confirmed weight arc (Nov 2022 → May 2026):**
- Nov 30, 2022: 221 lbs (scale screenshot, IMG_9915.PNG)
- Mar 28, 2023: 218.6 lbs (PhotoGrid collage, IMG_1810.JPG)
- Dec 6, 2023 / Jan 1 / Feb 22, 2024: ~220 lbs (Thomas confirmed)
- Jan 11, 2024: 218 lbs (Thomas confirmed)
- Mar 2024: ~220 lbs (IMG_1817_converted.jpg full-body orange shorts)
- Apr 22–May 29, 2026: 200.2 → 197.4 lbs (Smart Fitness Scale screenshots)
- Total tracked drop: -23.6 lbs over 11 sessions

**Photo session folders:**
- `others/` — historical archive (Nov 2022–Mar 2024); HEICs converted to JPG via ffmpeg
- `42226_200.2/`, `42626_200.8/`, `5226_197.7/`, `5222026/`, `5292026/` — 2026 protocol sessions
- New sessions go in `MMDDYYYY/` folder; same "Hard Work and Dedication" banner background, same distance

**Generated outputs (auto-pushed to origin):**
- `personal/photos/weight_tracker.jpg` — PIL line chart, update by adding row to `DATA` in `scripts/weight_chart.py`
- `personal/photos/progress_compare.jpg` — 8-panel front-view arc
- `personal/photos/master_progress_grid.jpg` — ALL images ALL sessions, 4100×5936px
- `personal/photos/5292026/rotated/progress_sheet_5292026.jpg` — 5-angle sheet for May 29 session

**Key technical notes:**
- 2026 session raw photos are landscape (4032×3024, EXIF=1) with Thomas upright — center-crop to 3:4 portrait, do NOT rotate
- May 29 session photos pre-rotated via `scripts/rotate_and_compare.py` → `5292026/rotated/`
- gitignore blocks `personal/photos/*.jpg` at top level — use `git add -f` for generated summary sheets

**Open:** combined master sheet (weight chart on top + photo arc below) to embed in Ch4 (`ch4/chp4.md`). Not built yet as of May 29, 2026.

**Why:** Thomas's weight-loss memoir; Zay's Walk is the catalyst/turning point in the story. The photos + chart are the visual evidence arc for the book.

**How to apply:** When Thomas says "update the weight chart / progress grid / photo session," work in faithwalkbook/scripts/. When he adds a new dated photo folder, run all three generators to refresh the outputs.
