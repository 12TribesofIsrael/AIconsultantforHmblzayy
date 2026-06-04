---
name: weight-grid-always-update
description: Always sync new weight photos into master_grid.py SESSIONS list when adding weight data
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e054c4e0-d0c4-44f3-bba9-d610e3563e79
---

**Rule:** Every time you add a new weight entry to `weight_chart.py` `DATA`, you MUST update THREE scripts before regenerating:

**Why:** Three separate scripts maintain different visual outputs, each with its own SESSIONS list:
- `weight_chart.py` → numeric timeline chart
- `progress_compare.py` → side-by-side progress arc (before/after)
- `master_grid.py` → full chronological grid of all sessions

If one script's SESSIONS list is missing a new entry, that visual falls behind.

**How to apply:**

When Thomas adds new weight + photos:

1. Update `weight_chart.py` `DATA` with the new `(date_label, weight, is_approx)` tuple
2. Update `progress_compare.py` `SESSIONS` with ONE representative photo from that session:
   ```python
   (os.path.join(BASE, "632026", "progress-202606-2.jpg"),
       "Jun 3\n2026",   "194.4 lbs", False, "portrait"),
   ```
3. Update `master_grid.py` `SESSIONS` with ALL photos from that session:
   ```python
   ("Jun 3, 2026", "194.4 lbs", [
       os.path.join(BASE, "632026", "progress-202606-1.jpg"),
       os.path.join(BASE, "632026", "progress-202606-2.jpg"),
       # ... all 5 photos
   ]),
   ```
4. Then run ALL 4 generators:
   - `python3 scripts/weight_chart.py`
   - `python3 scripts/progress_compare.py`
   - `python3 scripts/master_grid.py`
   - `python3 scripts/combine_master_sheet.py`
5. `git add -f` all JPGs + the 4 outputs, commit, push

**Evidence:** Jun 3 2026 session added new 5 photos + weight → had to manually patch master_grid.py SESSIONS after regenerating the other 3. Automation reminder set to prevent future skips.
