---
name: News-cycle traffic capture — structured data > comment-camp
description: When a news event drives a search/social surge, the highest-ROI move is owning the canonical answer page with NewsArticle + FAQPage + Speakable schema. Comment-camping news posts is third-tier, not the headline play.
type: feedback
originSessionId: c2c6c7b5-6590-4750-8837-8caa2cfbc2e3
---
When a news event hits and a brand's site isn't capturing the surge in branded search, default to **structured-data ownership of an incident page**, not comment-camping news posts.

**Why:** Apr 30, 2026 4-agent ROI check (Reddit / YouTube / X / case-study blogs) returned unanimous REFRAME on the assumption that comment-camping was the headline play. All four converged on the same answer: build a single canonical incident page with `NewsArticle` + `FAQPage` + `Speakable` + `BreadcrumbList` JSON-LD, citing every outlet that covered the story. Specific evidence: AI Overviews appear on <6% of breaking-news queries (Reddit + Search Engine Roundtable) — that suppression is the opening. Google Discover (not Search) is where third-party news sites win — Lucid Insider case via Search Engine Land got **86% of 9,726 clicks via Discover** within 30 days. `FAQPage` schema produces **3.2× higher AI Overview citation probability** (Averi/Wellows). News-event search demand half-life: ~24-36 hours (Pfeffer + GOV.UK), ~10% residual by Day 7 — actionable window is 3-5 days.

**Skip `LiveBlogPosting` schema** — Glenn Gabe (@glenngabe) and seoforjournalism.com note it requires Google News content-policy compliance. Non-publisher tracker sites don't qualify and risk schema penalties. Use `NewsArticle` + `FAQPage` + `Speakable` instead.

**How to apply:**
- When a major news event lands and the site needs to capture branded-search traffic: ship the schema-rich incident page within 6 hours (per Reddit + YouTube agents). Citations array → all news outlets. FAQPage with verbatim search queries ("Is X okay?", "What happened to Y?", etc.). Speakable spec on the answer cssSelectors. BreadcrumbList for navigation context. Custom OG image.
- Plan for a daily-update cadence for ~7 days — each push bumps `NewsArticle.dateModified` + sitemap `lastModified`, maintaining freshness signals through the demand window.
- Reference implementation: faithwalklive `/updates/april-28-incident` page (commit `a67449b`).
- Comment-camping, bio-link asks, Reddit cross-post are cheap third-tier add-ons — ship them but don't expect them to carry the load. Documented in `docs/comment-camp-apr28.md` with the 76%-direct-attribution caveat.
