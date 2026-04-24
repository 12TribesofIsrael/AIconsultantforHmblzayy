---
name: Social distribution play — Faith Walk tracker
description: External traffic-drive strategy to faithwalklive.com via remix method + IG Story/DM click plays, since Zay's team isn't actively promoting the tracker
type: project
originSessionId: 69feff6c-de6b-4bfb-a262-f6d840e8b4ce
---
External traffic-drive strategy to `faithwalklive.com` as a two-stage funnel:

- **Top of funnel (grow @AIBibleGospels followers):** Remix / tag-back method on 5 targets — Minister Zay (@hmblzayy), Chrisean Rock (@chriseanrockbabyy), DW Flame (@dwflame), RG Reformed Gangsta (@officialreformedgangsta), Sadie Robertson Huff (@legitsadierob). Cadence: 2-3 remixes/week/creator, rotate across all 5, no more than once per 10 days on same person.
- **Bottom of funnel (convert followers to tracker clicks):** IG Story Link Sticker daily mid-story with custom CTA + poll pairing (0.5-3% CTR), ManyChat DM-automation on Reels ("comment WALK" → DM tracker link, 12-18% CTR / 5-9× bio link), UTM-tagged bio link on every platform, X video-in-body + link-in-first-reply (avoids 30-50% reach penalty).

Full blueprint at `docs/remix-overview.md` (shipped v2.8.0, Apr 24, 2026, commit b9c05a6). Execution starts 2026-04-25 after Thomas gets off work. Tool cost: ~$15/mo ManyChat on personal card.

**Why:** Zay's team isn't actively promoting faithwalklive.com. ShuggC gatekeeping is partially active (see `project_shuggc_backchannel.md`). Thomas has to drive tracker traffic externally — remix method feeds followers, DM/sticker converts them. Direct-to-site is NOT the highest-ROI structure (Matt Gray / Pat Flynn funnels go short-form → DM-capture → tracker + recap email); DM-automation is the capture mechanism that completes the loop.

**How to apply:** When Thomas asks about social content, reach, promotion, or growth — default to this two-stage model. **Remixes are measured on follower growth, NOT tracker CTR** (no case studies show remixes drive direct external clicks; the LEVER is reach, not conversion). Story sticker + DM flow + UTM'd bio link are what drive tracker clicks. Every outbound link must be UTM-tagged per the scheme in the blueprint (`utm_source=ig_story|ig_reels|ig_bio|tiktok|x|yt_shorts`, `utm_medium=sticker|dm|bio|pinned|reply|description`, `utm_campaign=faithwalk-day-N`). 6-week target: 10× @AIBibleGospels follower growth + 20+ tracker clicks/day attributed to DM flow alone. Logged weekly in a Google Sheet Thomas maintains.
