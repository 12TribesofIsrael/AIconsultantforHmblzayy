---
name: Faith Walk Live launched
description: faithwalklive.com is live on Vercel as of Apr 17, 2026 — v0.2.0 with AI Bible Gospels branding
type: project
originSessionId: e1c03f75-0330-4b63-9c81-59a81703428c
---
Faith Walk Live deployed to Vercel at faithwalklive.com on Apr 17, 2026 (v0.2.0).

**Why:** Pivot from waiting on HMBL onboarding to owning the platform independently. ShuggC/Big Kiki formally declined services Apr 15; pivot strategy written same day.

**How to apply:** This is the user's flagship portfolio piece for faith-tech consulting. The consulting repo (AIconsultantforHmblzayy) remains the daily operations backend — tracker updates, clips, scripts. faithwalklive repo is the public-facing platform. Checkpoint sync flows from consulting → faithwalklive after each daily update.

**Cross-repo sync (v2.6.0, Apr 19, 2026):** Automated. Every `tracker:update` and `tracker:from-title` invocation calls `syncToFaithWalkLive()` from `scripts/lib/faithwalklive-sync.js` after pushing the consulting commit. It copies `src/faith-walk-tracker/checkpoints.json` → `../faithwalklivecom/src/data/checkpoints.json`, stashes any unrelated WIP in the public repo, rebases on origin/main, commits, and pushes — Vercel redeploys. Best-effort: failures log a warning but never block the consulting commit. Manual one-shot via `npm run faithwalk:sync "optional commit message"`. Sibling repo path is hardcoded: `../faithwalklivecom`.

**Branding:** AI Bible Gospels (YouTube: @AIBIBLEGOSPELS) is positioned as the sponsor/builder brand across the site — nav, footer, homepage, why page, subscribe page. This is the user's own YouTube channel and content brand.
