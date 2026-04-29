---
name: HMBL University Discord — permanent invite
description: Canonical permanent invite URL for HMBL University Discord (Zay's community server). Has a prayer section. Used as the route target for faithwalklive.com/prayer.
type: reference
originSessionId: 4e12cfa8-726c-4dbd-8fe0-64166b26b985
---
**Permanent invite (never expires):** `https://discord.gg/MzWAdRbDqu`

Confirmed by Thomas on 2026-04-29 as the canonical "never-expires" invite for HMBL University Discord (Zay's community server). Replaces the older default-expiry invite `https://discord.gg/7NQueqrqJ` that Thomas initially shared.

**Where it's used:**
- `faithwalklive.com/prayer` page — primary CTA button (`src/app/(site)/prayer/page.tsx` on the `faithwalklive` repo, hardcoded as `HMBL_DISCORD` constant).
- First-comment camp drops on TMZ + Shade Room posts (use `faithwalklive.com/prayer` as the public-facing URL, not the bare `discord.gg` link — gives Vercel Analytics + brand surface).

**What's there:**
- A prayer section/channel where the HMBL community lifts Zay up.
- (Other channels not catalogued here — Discord scraper still awaiting bot invite per CLAUDE.md.)

**How to apply:**
- Any future "where should prayers / community conversation go?" question — default to this invite, not a custom build.
- If the invite ever stops working, get a fresh permanent one from ShuggC or Thomas before publishing anywhere downstream — TMZ comment threads will have stale links for months.
