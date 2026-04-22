---
name: Verify Vercel deploy status before assuming a push is live
description: After pushing to faithwalklivecom or aibiblegospelscom, verify the deploy actually succeeded via GitHub deployments API. Don't trust "pushed to main → live in ~1 min" — builds can silently fail and pile up.
type: feedback
originSessionId: c3e99340-881e-4f1c-9b9d-53f92d7c983c
---
When pushing to a Vercel-connected repo (`faithwalklivecom`, `aibiblegospelscom`), DO NOT assume the push reached the live site just because `git push` succeeded. Vercel builds can fail silently for days while commits pile up on `main`.

**Why:** On 2026-04-22, a Day 25 rest-card fix appeared to ship but the live site still showed the old code. Investigation: Vercel had been failing every deploy since commit `dccd44f` (v0.6.0, ~6 hrs earlier) because `twitter-image.tsx` re-exported Next.js route-segment-config fields (`runtime`, `alt`, `size`, `contentType`) from `opengraph-image.tsx`. Next 16 Turbopack statically parses those — it can't follow re-exports. Three intervening commits (Day 27 clip, Day 25 fix, and an unrelated Why-page edit) all looked pushed but none were live. The user had to surface the problem ("still") before I noticed.

**How to apply:**

1. **After any push to `../faithwalklivecom` or `../aibiblegospelscom`**, poll the GitHub Deployments API to confirm the latest deploy succeeded:
   ```bash
   sha=$(git rev-parse HEAD)
   id=$(gh api "repos/12TribesofIsrael/faithwalklive/deployments?sha=$sha" --jq '.[0].id')
   gh api "repos/12TribesofIsrael/faithwalklive/deployments/$id/statuses" --jq '.[0] | {state,description}'
   ```
   Replace `faithwalklive` with `aibiblegospelscom` for the other repo.

2. **If state is `failure`**: read the description (includes a Vercel deploy ID), inspect logs, fix the build error before attempting further pushes. Don't let failures pile up.

3. **Always run a local `npm run build` before pushing UI changes** to these Next.js repos — catches turbopack/route-config errors before they hit Vercel.

4. **The consulting repo's `scripts/lib/faithwalklive-sync.js` is fire-and-forget** ("best effort: failures log a warning but never block the consulting commit"). That's by design, but it means checkpoint syncs can silently go undeployed — periodically check live-site state vs. `checkpoints.json` when debugging rendering gaps.

5. **WebFetch caches for 15 min.** When verifying a just-deployed site via `WebFetch`, append a cache-busting query param (`?v=<sha>`) or the verification will look like a deploy failure.

**Next.js 16 route-segment-config gotcha** (the specific bug that triggered this): fields like `runtime`, `alt`, `size`, `contentType`, `dynamic`, `revalidate`, etc. MUST be declared with explicit `export const` in every route file. `export { runtime } from "./sibling"` is not statically parseable by Turbopack. Only `default` can be safely re-exported.
