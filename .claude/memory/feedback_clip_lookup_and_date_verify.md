---
name: Twitch clip auto-lookup and date cross-reference
description: When a tracker day has no clip, auto-query Twitch GQL for clips on that date. Also use this endpoint to verify any date/day-number claim before publishing.
type: feedback
originSessionId: 370e5003-12aa-4896-8a0e-e42adf54f73b
---
When updating the Faith Walk tracker and a day comes through with `clip: null` (or the user explicitly skips supplying one), **automatically query the Twitch clips list for that date** and propose top candidates — don't leave the day blank without trying. Same goes for verifying any date or day number the user mentions: if it's plausibly out of whack, cross-reference Twitch on your own before acting on it.

**Endpoint:** POST to `https://gql.twitch.tv/gql` with header `Client-ID: kimne78kx3ncx6brgo4mv6wki5h1ko` (the public web client ID — same one `scripts/lib/twitch.js` uses for fetching stream titles, no auth required).

**Query template:**
```js
{
  user(login: "hmblzayy") {
    clips(first: 100, criteria: { period: LAST_WEEK, sort: VIEWS_DESC }) {
      edges { node { slug title createdAt durationSeconds viewCount url } }
    }
  }
}
```
Filter results by `createdAt.startsWith('YYYY-MM-DD')` to find a specific day. `period` can be `LAST_DAY | LAST_WEEK | LAST_MONTH | ALL_TIME`. Stick with `VIEWS_DESC` sort — `CREATED_AT_DESC` sometimes returns server errors.

**Public viewing URL** (for the user, not for scraping — JS-rendered): https://www.twitch.tv/hmblzayy/clips

**Why:** People following the Faith Walk who don't know where Zay is rely on the tracker as their source of truth. Wrong dates or missing clips erode that trust. The Twitch clip/VOD timeline is the most reliable independent verifier — clips are UTC-timestamped, persist longer than VODs (which age off in 14-60 days), and stream titles + clip volume per day make day boundaries unambiguous. Better to take 30 seconds to verify than to publish a wrong date and have it ripple to faithwalklive.com.

**Authority order (high → low):**
1. Twitch clip `createdAt` and VOD `publishedAt` — written by Twitch, not editable, source of truth.
2. Twitch stream title (current `DAY N` value via `fetchStreamTitle`).
3. Existing `checkpoints.json` (only as authoritative as the Twitch data it was last verified against — past entries can drift via off-by-1).
4. Route-team Discord posts — best-effort, not guaranteed accurate. Useful as a hint, not an anchor.
5. Verbal/typed day-or-date claims from the user — Thomas has explicitly said these are not 100% guaranteed; cross-reference before acting.

If (4) or (5) conflicts with (1), trust (1). Walk forward/backward from any verified Twitch anchor to recompute the whole day↔date chain — one solid Twitch pair is enough to validate or reject everything around it.

**How to apply:**
1. After any `tracker:update` or `tracker:from-title` run, scan `checkpoints.json` for recent days with `clip: null` and offer to backfill via this lookup. Don't leave Day N blank silently.
2. If the user states a day/date/location ("Day 24 was Tuesday", "we hit Mt. Vernon on the 17th"), and it doesn't match checkpoints.json or feels off, run the clip query for the relevant date range and verify against actual clip timestamps before agreeing or editing files.
3. When proposing clips, lean toward highest-view + faith/journey-aligned (matches the historical pattern: Day 23 "GOD DID" 70v, Day 24 "w chrisean" 78v). Note rest days often have very few low-engagement clips — flag that explicitly when offering placeholders.
4. Use `update-tracker.js --day N --clip "<url>"` (clip-only mode) for backfill — see [scripts/update-tracker.js](scripts/update-tracker.js).
