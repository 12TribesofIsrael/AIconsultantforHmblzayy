---
name: Tracker update timing — safety rule
description: Only run tracker:update at end of night or next morning, never mid-day, for Zay's physical safety
type: feedback
originSessionId: e1c03f75-0330-4b63-9c81-59a81703428c
---
Only log new checkpoint days at the end of the night (after stream ends) or the next morning. Never update mid-day while Zay is actively walking.

**Why:** Safety. Mid-day updates confirm exactly where Zay is while he's still in that area. End-of-day or morning updates mean he's already settled or already moved on. The data comes from Twitch titles (public) but the timing of when we surface it on the tracker matters.

**How to apply:** When user says "update tracker" — check the time. If Zay is still live/walking, wait. If stream is done for the day, proceed. Don't proactively suggest mid-day tracker pushes. Use 24hr Twitch clips (LAST_DAY period) for the clip selection.
