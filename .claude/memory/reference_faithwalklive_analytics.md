---
name: faithwalklive analytics location
description: Where Vercel Analytics lives for faithwalklive.com + which dashboards to point Thomas at when an ROI / click-tracking question needs real numbers
type: reference
originSessionId: de065927-573c-4fc5-a307-76ddfa09dd02
---
`@vercel/analytics/next` is wired into faithwalklive.com — the `<Analytics />` component is mounted in the sibling repo at `../faithwalklivecom/src/app/layout.tsx` (around line 130). No GA, PostHog, or Plausible. No Vercel API token in the repo `.env`, so analytics can't be pulled programmatically from CLI — Thomas has to log in.

**Dashboards (Thomas-accessible, not CLI-accessible):**
- **Vercel Analytics:** vercel.com → faithwalklive project → Analytics tab. Shows visitors, page views, top pages, referrers, UTM Parameters tab, countries/devices/OS. Custom Events require a Pro upgrade — currently unavailable.
- **IG Story Insights:** IG app → profile → Story archive → tap a Story → Insights → "Link sticker taps" is the conversion metric.
- **Meta Business Suite:** business.facebook.com — covers FB + IG combined reach/follows for the AI Bible Gospels account. (Note: this counts feed/Story posts you make as a creator, NOT Reposts.)
- **TT post analytics:** TT app → profile → tap your post → "..." → Analytics. (Mobile only.)
- **Twitch clip view counts (CLI-accessible):** GQL endpoint, see CLAUDE.md "Date / clip cross-reference" section.

**When to point Thomas at which:**
- "How is the tracker traffic doing?" → Vercel Analytics
- "Are the Story stickers converting?" → IG Story Insights, line up with Vercel UTM Parameters tab
- "How is my AI Bible Gospels account growing?" → Meta Business Suite
- "Did the Stitch/Repost actually reach anyone?" → TT post Analytics
- "Are the daily Twitch clips going viral?" → Twitch GQL (CLI)

**Decision-threshold reference (from v2.11.0 playbook, Days 33-40):**
- ≥30 IG Story sticker taps/day = working
- 10-29 taps/day = rewrite Story copy (replace "Watch the route →" with a question)
- <10 taps/day = pull Day 40 wilderness moment forward to Day 36-37
