---
name: weight-grid-always-update
description: Always sync new weight photos into master_grid.py SESSIONS list when adding weight data
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e054c4e0-d0c4-44f3-bba9-d610e3563e79
---

**Rule:** Every time you add a new weight entry to `weight_chart.py` `DATA`, you MUST ALSO add the corresponding photo session to `master_grid.py` `SESSIONS`.

**Why:** The weight_chart.py drives the numeric display (timeline chart). The master_grid.py drives the visual photo progression grid. They need to stay in sync — if one gets a new entry and the other doesn't, the grid falls behind the chart.

**How to apply:**

When Thomas adds new weight + photos:

1. Update `weight_chart.py` `DATA` with the new `(date_label, weight, is_approx)` tuple
2. **Before regenerating**, also add the photo session to `master_grid.py` `SESSIONS`:
   ```python
   ("Jun 3, 2026", "194.4 lbs", [
       os.path.join(BASE, "632026", "progress-202606-1.jpg"),
       os.path.join(BASE, "632026", "progress-202606-2.jpg"),
       # ... rest of photos
   ]),
   ```
3. Then run ALL 4 generators:
   - `python3 scripts/weight_chart.py`
   - `python3 scripts/progress_compare.py`
   - `python3 scripts/master_grid.py`
   - `python3 scripts/combine_master_sheet.py`
4. `git add -f` all JPGs + the 4 outputs, commit, push

**Evidence:** Jun 3 2026 session added new 5 photos + weight → had to manually patch master_grid.py SESSIONS after regenerating the other 3. Automation reminder set to prevent future skips.
