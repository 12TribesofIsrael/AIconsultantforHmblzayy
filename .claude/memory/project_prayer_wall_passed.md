---
name: Prayer wall — Discord-routed, NOT custom-built
description: 2026-04-25 ROI check killed the custom wall; 2026-04-29 Day 34 news cycle reopened it; shipped as Discord routing, not a build. Don't re-pitch a custom moderated wall on faithwalklive.
type: project
originSessionId: session-end-2026-04-25-pm
---
**Final state (as of 2026-04-29, v2.12.2):** `faithwalklive.com/prayer` is a single-CTA landing page that routes visitors to the HMBL University Discord prayer section via permanent invite `https://discord.gg/MzWAdRbDqu`. The custom moderated wall was never built.

**Timeline:**
- **2026-04-25** — 4-agent ROI check on a custom wall returned unanimous REFRAME (~1–3% submission ceiling, 40–60% week-4 decline, ongoing moderation tax). Reframe alternative (Twitch `!pray` overlay + IG Story sticker + digest email) measured better but Thomas passed on both. Wall parked indefinitely.
- **2026-04-28** — Day 34 vehicle strike, walk paused, hospital. TMZ + Shade Room covered it.
- **2026-04-29** — Thomas reopened the question given the news-cycle traffic surge. Resolved by routing `/prayer` to HMBL Discord (Thomas's call) instead of building. v2.12.2 shipped: faithwalklive commit `ca50167`, single-CTA landing + FAQ language updates ("submit a prayer / prayers are moderated" → "pray with the HMBL community"). Saved ~4–5 hours of build, zero moderation burden, routes attention into Zay's actual community rather than a parallel one.

**Why this shape won:**
- HMBL University Discord already has a prayer section — building a parallel wall on faithwalklive duplicated that.
- TMZ/SR audiences need a destination, not a form. Discord = warm, owned community; custom wall = cold and exposed to trolls.
- `faithwalklive.com/prayer` URL preserved for share/Vercel-Analytics + the existing v2.12.1 FAQ "Drop a prayer for Zay" CTA continues to work — same shareable URL, new destination.

**How to apply:**
- **Don't re-pitch** a custom moderated wall on faithwalklive. The Apr 25 ROI verdict still stands for that shape.
- The shipped Discord-routing pattern is the canonical answer for any future "where do prayers go?" question. Discord invite is permanent (Thomas confirmed 2026-04-29).
- If `/prayer` page needs more depth later (Discord-newcomer explainer, prayer prompts, etc.) — that's incremental, not a re-build.
- Treat the strategy doc's "prayer wall" line in `docs/faith-tech-pivot-strategy.md` as legacy wishlist; the live answer is now the `/prayer` route in faithwalklive.
- The Apr 25 reframe alternative (Twitch `!pray` + IG sticker + digest) is still untouched — different question, different surface, would need its own evidence to pitch.
