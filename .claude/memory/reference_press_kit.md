---
name: Press kit
description: Canonical press kit URL faithwalklive.com/press, where the spec lives, and current asset-section status
type: reference
originSessionId: 1cbcb0e8-73bf-4326-a11f-dd8ba1ddcd85
---
**Canonical URL:** `https://faithwalklive.com/press` (live since 2026-05-07, sitemap priority 0.85)

**Implementation:** `c:\Users\Claude\hblfaithwalk\faithwalklivecom\src\app\(site)\press\page.tsx` (+ `opengraph-image.tsx` sibling, edge runtime)

**Spec doc:** `c:\Users\Claude\youtubeoptermizer\docs\press-kit-faithwalklive-spec.md` — authored by the youtubeoptermizer Claude, implemented from this side. Cross-Claude collab pattern: spec doc lives in the authoring repo; implementation lives in the target repo.

**What's live:** hero + 3-CTA bar, fast-facts table (Day + mileage from `getStats()`, refreshes per tracker push), 3 boilerplate lengths, Zay bio, AI Bible Gospels bio, coverage list (reads `src/data/outlets.ts` — also imported by `/updates/april-28-incident`), press contact card, "What we're not" footer, `WebPage` + `BreadcrumbList` JSON-LD.

**What's NOT yet live (deferred per spec):**
- §6 asset grid — currently a "Request assets" `mailto:` CTA with 24h SLA. The spec's file-based asset URLs (`/press/assets/...` for logos, hero photos, route map, b-roll, ZIP) point to files that don't exist on disk; once the bundle is produced (logos exported, photos cleared with Zay, ZIP packaged), it's a one-section swap in `press/page.tsx`.

**Cross-doc updates owed by the youtubeoptermizer Claude** (per the spec's hand-off section): swap placeholder press-kit references in `docs/journalist-outreach-apr28-followup.md` and `faith-walk-live/anchor-doc/publish-plan.md` for the live URL; add a one-liner reference memory on the youtubeoptermizer side; patch the spec's "Started March 26" → "Started March 25" (consistent with `checkpoints.json` Day 1 + root-layout Event JSON-LD).

**When to use:** any time press / journalist / outlet outreach comes up — direct them to `faithwalklive.com/press` rather than the homepage. Add new outlets to `src/data/outlets.ts` (one-line edit, both /press and /updates/april-28-incident pick it up automatically).
