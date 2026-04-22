---
ended: 2026-04-22T00:00:00Z
project: ZayAutomations / Faith Walk Live
branch: main
version: v2.7.0 (consulting) / v0.6.0 (faithwalklive)
originSessionId: c1062ace-566c-45fc-b588-3d994800ee10
---
# Last Session — 2026-04-22

## What the user wanted
Audit current AEO/SEO state across the faith-tech properties, then ship the highest-leverage remaining technical items on faithwalklive.com before moving to the parent brand site.

## What we did
- Scanned all three repos. faithwalklivecom had Phase A SEO (Apr 17, v0.4.0) + Phase A AEO (Apr 21) already shipped — sitemap.ts, robots.ts, metadataBase, OG+Twitter cards, per-page metadata on 6 routes, JSON-LD entity graph (Organization/Person/WebSite/Event) in `src/app/layout.tsx`, FAQPage schema with 14 Q&As at `/faq`, `public/llms.txt`, AI crawler allowlist (GPTBot/ClaudeBot/PerplexityBot/Google-Extended/Applebot-Extended/CCBot). Strategy docs at `docs/seo-strategy.md` + `docs/aeo-strategy.md`.
- aibiblegospels.com is only a v0.1.0 scaffold — and the repo isn't cloned on this Owner machine (it's at `c:\Users\Claude\hblfaithwalk\aibiblegospelscom` on the other laptop). Can't edit from here.
- Shipped v0.6.0 on faithwalklivecom (commit `dccd44f`):
  - `src/app/opengraph-image.tsx` — 1200×630 branded share card via `next/og` ImageResponse (dark navy gradient, gold beacon, "3,000 miles on faith." headline, faithwalklive.com / Built by AI Bible Gospels footer). Edge runtime.
  - `src/app/twitter-image.tsx` — mirrors OG (later fixed — see below).
  - `src/app/icon.tsx` (32×32) + `src/app/apple-icon.tsx` (180×180) — branded gold-beacon-on-navy, replacing the stock Next.js favicon.ico (confirmed default via git log before deletion).
  - FAQPage JSON-LD in `src/app/(site)/faq/page.tsx` now carries `SpeakableSpecification` with `cssSelector: [".faq-q", ".faq-a"]`; `<dt>` / `<dd>` elements got matching classes.
- Bookkeeping: bumped faithwalklivecom CLAUDE.md + CHANGELOG.md to v0.6.0, checked off OG/favicon in seo-strategy.md, moved Speakable from Phase C to Phase A in aeo-strategy.md.
- Committed a separate pre-existing WIP on `src/app/(site)/why/page.tsx` (h3→h2 with brand-cloud styling) as `fc0a711`. Flagged first so it didn't get silently bundled into the v0.6.0 commit.
- While off-session, user landed `50d6ce4` — critical Next 16 turbopack fix. Route-segment config fields (`runtime`, `alt`, `size`, `contentType`) cannot be re-exported via `export { ... } from "./opengraph-image"`; they must be declared as explicit `export const`. This had been silently failing EVERY Vercel build since v0.6.0 landed — meaning Day 27 clip (`353852a`) and Day 25 restOnly card fix (`87c914b`) never reached production until `50d6ce4` went in. Bug only manifests on Vercel turbopack build, not local.

## Decisions worth remembering
- Used Next.js file conventions (opengraph-image.tsx / twitter-image.tsx / icon.tsx / apple-icon.tsx) over static PNGs — zero image-generation tooling needed, auto-wires `og:image` across every page, and easy to iterate design without re-exporting assets.
- Deleted `favicon.ico` outright (after confirming it was Next's stock 25KB default via `git log --all -- src/app/favicon.ico`) rather than keeping both favicon.ico and icon.tsx — cleaner, no precedence confusion.
- Speakable cssSelector pair `[".faq-q", ".faq-a"]` (not a single wrapper) — voice assistants read Q and A as paired units rather than one long block.
- Left the pre-existing `why/page.tsx` WIP unstaged rather than bundling it into the AEO/SEO commit — user confirmed the change was theirs by saying "commit" and it shipped as a separate clean commit.

## Open threads / next session starts here
- **aibiblegospels.com parent brand has zero SEO/AEO**. When on the machine that has the repo cloned (`c:\Users\Claude\hblfaithwalk\aibiblegospelscom`), the natural next move is to replicate faithwalklive's Phase A foundation there — sitemap.ts, robots.ts (with AI allowlist), metadataBase, per-page metadata, OG image via `opengraph-image.tsx`, llms.txt, FAQPage with Speakable, entity JSON-LD for AI Bible Gospels. Use the Apr 22 Next 16 turbopack gotcha (explicit `export const` for route-segment config, no re-export) from day one.
- **Remaining faithwalklive open items** from `docs/aeo-strategy.md` Phase C: `/about` page (or extend `/why`) with per-entity Person/Organization JSON-LD; per-state checkpoint pages (`/pennsylvania`, `/ohio`) once states complete, with Article schema; weekly walk-update posts with NewsArticle schema; `llms-full.txt` expanded version.
- **Thomas-side SEO tasks** still open (he does these, not Claude): Google Search Console verify + sitemap submit, Bing Webmaster, update YouTube channel About with faithwalklive.com link, LinkedIn company page for AI Bible Gospels / Technology Gurus LLC, Reddit testimony post on r/Christianity.
- **AEO monitoring**: run the monthly 5-prompt test suite (docs/aeo-strategy.md §"How to test AEO yourself") against ChatGPT/Claude/Perplexity/Gemini starting ~30 days post-FAQ launch, which is mid-May 2026. Log which engines cite faithwalklive.com.

## Uncommitted work
Clean working tree (both consulting and faithwalklivecom repos, both at origin/main).
