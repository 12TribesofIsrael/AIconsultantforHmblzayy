---
name: Faith Walk Tracker — never lie about position
description: Map pin must never sit on a city Zay hasn't reached. Estimates must be marked as estimates.
type: feedback
originSessionId: 6d9e3e26-aeb7-4150-92b7-f5d0095481a8
---
When updating the Faith Walk tracker (`src/faith-walk-tracker/`), the map pin's lat/lng must always represent Zay's last *confirmed* arrival — never a city he's only "heading to". In-progress days are tracked by annotating the latest checkpoint with `inProgressDay`, `destination`, `destinationLat/Lng`, `milesRemaining`, and `estimatedSegmentMiles`. The HTML draws a dashed forward line and shows a "Day N → City, X mi to go" popup.

Auto-promoted arrivals (when a day rolls over before the user manually confirmed mileage) get `estimatedMiles: true` and the public stat bar shows `~325 MI` with a tilde prefix. Manual `tracker:update --miles N` strips the flag.

**Rest days** (title contains `REST DAY`): annotate the latest checkpoint with `inProgressDay`, `restDay: true`, and optional `restDayClip`. Stat bar shows the rest-day number (matches Twitch). Popup morphs to show *only* the rest-day identity and one clip (hide the Day N-1 walk clip while resting). Card row keeps Day N-1 visible as a normal arrival + appends a virtual rest-day card as the active one — do NOT morph Day N-1's card or it disappears from the visible sequence. When `tracker-from-title` detects walking again (destination + milesFromNext), it clears `restDay` automatically; `restDayClip` persists as historical data on Day N-1's checkpoint.

**Why:** On 2026-04-11 I read Zay's Twitch title `22 MILES FROM BEAVER FALLS, PA` as "arrived at Beaver Falls" instead of "still 22 miles away", logged Day 17 = Beaver Falls with a guessed 303 miles, and the public-facing tracker pin sat on a city he hadn't reached. Thomas caught it immediately and was upset that the tracker was lying. The fix introduced the title-driven flow with strict invariants: pin = last confirmed only, totals = last confirmed only, estimates = clearly marked.

**How to apply:** Any time I touch tracker checkpoint logic, mileage display, or position rendering, preserve these invariants. If unsure whether something is "confirmed" or "estimated", default to estimated and mark it. Never invent a number for the public-facing total miles stat.
