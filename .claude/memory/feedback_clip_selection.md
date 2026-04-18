---
name: Clip selection process
description: Always pull clips from Twitch 24hr filter for the current day, not from the weekly top clips
type: feedback
originSessionId: e1c03f75-0330-4b63-9c81-59a81703428c
---
When adding a clip to a tracker day, always fetch clips from the last 24 hours (LAST_DAY period) — not LAST_WEEK. Pick a clip that's specific to that day's location/arrival, not a generic top-viewed clip from the week.

**Why:** The user wants day-specific clips that match the checkpoint. Pulling from weekly top clips gives stale/mismatched moments from other days. The 24hr filter surfaces what actually happened on the walk that day.

**How to apply:** Use the Twitch GQL query with `period: LAST_DAY` criteria. Sort by views or recency, then pick the clip most relevant to the day's destination city. Prefer clips that mention the arrival city by name in the title.
