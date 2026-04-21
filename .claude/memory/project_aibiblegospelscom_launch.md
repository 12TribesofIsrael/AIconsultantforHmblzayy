---
name: aibiblegospels.com launch
description: Apr 21, 2026 — parent brand site went live on Vercel at www.aibiblegospels.com; GitHub repo 12TribesofIsrael/aibiblegospelscom, apex 308-redirects to www
type: project
originSessionId: 55dd7ad2-f536-4c2e-9a8d-4d236edb01ef
---
On 2026-04-21, the AI Bible Gospels parent brand site launched:

- **Live:** https://www.aibiblegospels.com (production)
- **Apex:** aibiblegospels.com → 308 redirect → www.aibiblegospels.com
- **Fallback:** aibiblegospelscom.vercel.app (production)
- **Repo:** https://github.com/12TribesofIsrael/aibiblegospelscom (public, owner 12TribesofIsrael)
- **Local:** c:\Users\Claude\hblfaithwalk\aibiblegospelscom
- **Initial commit:** `b34847b v0.1.0: scaffold AI Bible Gospels parent brand site`
- **Stack:** Next.js (matches faithwalklivecom sibling pattern); Vercel auto-deploy wired to GitHub main

**Why:** The brand that sponsors/builds Faith Walk Live (faithwalklive.com) now has its own parent-brand home page — separate from the walk, anchoring the broader faith-tech portfolio (YouTube channel @AIBIBLEGOSPELS feeds here). This is the audience/SEO hub for the AI Bible Gospels brand independent of any single campaign.

**How to apply:**
- Treat this repo like faithwalklivecom: pushes to `main` auto-deploy via Vercel; Vercel redeploys on commit.
- When referring to "AI Bible Gospels" going forward, it now means both the YouTube channel AND this website — check context.
- Future work: branch protection on `main` (not yet set — deferred from launch), any UI/content changes should be made in the sibling repo, not this consulting repo.
