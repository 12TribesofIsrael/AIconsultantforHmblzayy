---
name: GoatCounter analytics dashboard (tracker pages)
description: Where to look for analytics on docs/faith-walk-tracker.html and docs/rv-route-plan.html — same GoatCounter site for both, free tier, account aibiblegospels444@
type: reference
originSessionId: eb63ec03-396e-4fc3-89b9-6f10519cb912
---
**Dashboard URL:** https://hmbl-faithwalk.goatcounter.com

**Account:** logged in as `aibiblegospels444@` (Thomas's primary Google account, matches the rest of his stack).

**What's tracked:**
- `docs/faith-walk-tracker.html` (live walking tracker, GitHub Pages) — pageviews + a `/youtube-click` event when the powered-by link is clicked
- `docs/rv-route-plan.html` (RV route-planning map, GitHub Pages, added v2.14.1) — pageviews + per-segment events firing as `/rv-route/segment-N-slug` (e.g. `/rv-route/segment-13-denver-berthoud-pass-glenwood-springs`) on segment click

Both pages use the same `data-goatcounter` site so all activity rolls up into one dashboard.

**How to read it:**
- **Pages list** is the primary surface — pageviews and events both show up here as path entries. Filter by path prefix (`/AIconsultantforHmblzayy/docs/rv-route-plan` or `/rv-route/segment-`) to scope.
- Per-segment events appear as additional Pages-list rows ONLY after someone actually clicks a segment. No clicks = no row.
- Free tier — no separate Events tab; events live in the same Pages list.

**Caveats:**
- Anyone who hits the page before the GoatCounter script tag was added isn't counted. The RV route map's analytics started at ~1:30 PM May 2 (commit `f94e153`); 1:04–1:30 PM clicks are lost.
- Browsers blocking analytics scripts (uBlock Origin, Brave shields, etc.) won't be counted either. Pageview counts are floors, not exact totals.
- `(unknown)` referrer covers most Discord/iOS clicks because Discord strips referrers.

**Other analytics surface that complements this:**
- TinyURL click counter — append `+` to the short URL (e.g. `https://tinyurl.com/257ddner+`) for raw redirect clicks, useful as a sanity check independent of GoatCounter. Subject to TinyURL's settings.
- See also `reference_faithwalklive_analytics.md` for Vercel Analytics on faithwalklive.com (different surface, different stack).
