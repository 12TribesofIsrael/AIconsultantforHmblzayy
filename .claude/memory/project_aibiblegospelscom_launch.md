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

**Flagships featured on the home page:**
1. **Faith Walk Live** (faithwalklive.com) — the consulting deliverable built for Minister Zay
2. **Anointed** (anointed.app) — Thomas's own AI video production product (added 2026-04-29, commit `9af3fcb`)

Both render as full-width "Flagship — currently live" sections on `/` with parallel structure. Hero CTA "See the flagships" anchors to `#flagships`. JSON-LD `Organization.sameAs` includes both faithwalklive.com and anointed.app.

**How to apply:**
- Treat this repo like faithwalklivecom: pushes to `main` auto-deploy via Vercel; Vercel redeploys on commit.
- When referring to "AI Bible Gospels" going forward, it now means the YouTube channel AND this website AND both flagship products — check context.
- **Always `git pull` before editing** — this repo gets edits from multiple machines (laptop + desktop). On 2026-04-29 a push attempt was rejected because the remote had 4 commits the local machine hadn't seen (LLC scrub, contact email swap, Privacy/Terms additions). Reset + pull-ff-only + re-apply on top is the recovery pattern.
- Future work: branch protection on `main` (not yet set — deferred from launch), any UI/content changes should be made in the sibling repo, not this consulting repo.
