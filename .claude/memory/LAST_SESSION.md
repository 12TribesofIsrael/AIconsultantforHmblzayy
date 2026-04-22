---
ended: 2026-04-22T04:25:00Z
project: ZayAutomations
branch: main
version: v2.7.0
originSessionId: c3e99340-881e-4f1c-9b9d-53f92d7c983c
---
# Last Session — 2026-04-22

## What the user wanted
Two quick fixes on the Faith Walk tracker: attach a specific Twitch clip for Day 27's "W COLUMBUS" Ohio milestone, and fix the missing Day 25 rest card on faithwalklive.com (it renders on GitHub Pages but disappeared on the Next.js site). Then update memory so the logic gap doesn't bite again.

## What we did
- **Day 27 clip attach.** Verified `LachrymoseTenuousCoyoteMau5-xWncMBvmFn7cA4bX` via Twitch GQL (title: "W COLUMBUS", createdAt 2026-04-21T20:38:51Z, 25 views). Since Day 27 is still in-progress and not yet archived, stored the URL as `inProgressClip` on the Day 26 carrier checkpoint — it'll promote to Day 27's `clip` on rollover via [scripts/update-tracker.js:141-148](scripts/update-tracker.js#L141-L148). Commit `0d3dbdf` on consulting repo.
- **Day 25 rest card fix on faithwalklive.** Root cause: [MapClient.tsx:153](../faithwalklivecom/src/components/MapClient.tsx#L153) iterated `walking` (filtered `!restOnly`), so historical `restOnly` entries vanished unless they happened to be the very last entry (caught by `restOnlyAsNow` NOW-card path). Fixed by iterating all `checkpoints`, branching on `c.restOnly` to render a compact secondary card. Count formula updated to `checkpoints.length + (hasRestDayCard ? 1 : 0)`. Commit `87c914b` on faithwalklivecom.
- **Vercel deploy failure excavation.** Pushed the fix, user reported still broken. Queried GitHub Deployments API — every deploy since `dccd44f` (v0.6.0, ~6 hrs earlier) had been silently failing. Root cause: [twitter-image.tsx](../faithwalklivecom/src/app/twitter-image.tsx) re-exported route-segment-config fields (`runtime`, `alt`, `size`, `contentType`) from `opengraph-image.tsx`. Next 16 Turbopack statically parses those — it can't follow re-exports. Fixed by inlining explicit `export const` in twitter-image.tsx; only `default` stays re-exported. Commit `50d6ce4` on faithwalklivecom.
- **Verified live.** `WebFetch https://faithwalklive.com/map?v=50d6ce4` now reports `Checkpoints (27)` with Day 25 · REST visible at Mt. Vernon OH Apr 19. Day 27 in-progress clip "W COLUMBUS" also now live (the stack of 3 undeployed commits all shipped in one deploy).
- **Memory updates.** Expanded [feedback_now_card_logic.md](feedback_now_card_logic.md) into two explicit sections: (A) NOW badge priority, (B) historical restOnly rendering rule. Created [feedback_verify_vercel_deploy.md](feedback_verify_vercel_deploy.md) documenting the GitHub Deployments API polling procedure, the Next 16 route-config re-export gotcha, and the WebFetch 15-min cache pitfall. MEMORY.md hook updated. Consulting repo commit `ed1fd78`, then memory-sync follow-up `1fb0702`. All pushed.

## Decisions worth remembering
- Stored the Day 27 clip as `inProgressClip` (not by creating a premature Day 27 entry, and not by extending `update-tracker.js`). Minimal change; natural promotion path on rollover.
- Discarded an accidental `package-lock.json` mutation in faithwalklivecom (from `npm install` needed for local build verify). Only the MapClient change + the twitter-image fix got committed.
- Did not touch the GitHub Pages tracker HTML — its rest-only rendering was already correct; faithwalklive needed to match it, not vice versa.

## Open threads / next session starts here
- **Day 27 archival is still pending.** As of 2026-04-21T20:15Z it was in-progress Sunbury → Columbus, 24 mi remaining. Running `npm run tracker:from-title` or `tracker:update --day 27 --location "Columbus, OH" --miles ...` will promote both the day and the stashed `inProgressClip` ("W COLUMBUS").
- **Apr 20 incident** (see [project_apr20_incident.md](project_apr20_incident.md)) — Day 26 may involve a vehicle incident; verify before promoting Day 27 or adjusting Day 26.
- **If faithwalklive renders break again**, the new [feedback_verify_vercel_deploy.md](feedback_verify_vercel_deploy.md) has the `gh api repos/.../deployments` polling snippet. Don't trust `git push` → live.

## Uncommitted work
Clean working tree.
