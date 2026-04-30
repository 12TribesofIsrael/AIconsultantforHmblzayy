# 4-agent ROI check — News-cycle traffic capture (Apr 28, 2026 incident)

**Question asked:** When a news story drives a surge in branded-search and social attention but the brand's own site (faithwalklive.com) isn't capturing the traffic, what actually converts that attention into site visits — for a single-operator, no-budget, no-team-help tracker site?

**Trigger:** TMZ + The Shade Room + Fox 29 + Fox 59 (and the wider Fox-network syndication) covering Minister Zay being struck by a vehicle on Day 34 of the 3,000-mile Faith Walk. Massive social surge, but faithwalklive.com traffic not commensurate.

**4 channels run in parallel** (Reddit / YouTube / X / case-study blogs), 5 standard ROI questions each + 2 domain-specific probes per agent. Per `feedback_roi_check_new_concepts.md` rule: 4 separate reports stitched, NOT one synthesized brief.

---

## Convergent verdict: **REFRAME**

All 4 channels independently returned REFRAME on the assumption that comment-camping news posts is the highest-ROI tactic. The convergent recommendation:

> **Ship a structured-data-rich incident page (`NewsArticle` + `FAQPage` + `Speakable` + `BreadcrumbList`) on faithwalklive.com within 6 hours. That's the headline play. Comment-camping, bio-link asks, Reddit cross-post are cheap secondary plays — not the strategy.**

This work shipped in v2.13.0 (commit `a67449b` on faithwalklive). The page is live at https://faithwalklive.com/updates/april-28-incident.

---

## Channel reports

### Reddit (REFRAME)

> Reddit's site-search via Google returned no useful direct threads — Reddit blocks scraping. Agent flagged this honestly and used Reddit-adjacent surfaces (industry posts that aggregate Reddit discussion + academic + GOV.UK half-life data).

**Key signal:** AI Overviews appear on **<6% of breaking news queries** (vs. 60.5% on health). That suppression is the operator's opening — `NewsArticle` schema lets faithwalklive capture Top Stories carousel for long-tail "what happened to Zay" queries. The Guardian saw +40% Top Stories impressions / +25% organic news traffic from full Article schema.

**Half-life:** No Reddit-specific thread, but Pfeffer half-life paper + GOV.UK news study converge on **~24-36 hour half-life, ~10% residual by Day 7.** Surge window = 24-72 hours.

**Hype-without-data flag:** Comment-camp's "5-10x pinned-comment CTR" stats are creator-economy assertions, not Reddit-validated.

**Reddit-validated alternative play:** A single well-placed post in the right sub. Reddit's SEO visibility on Google jumped 1,328% Jul '23 → Apr '24 and Reddit is the #1 cited source in AI Overviews (37% of SERPs).

**Bottom line:** Ship `NewsArticle`-schema'd Day 34 page within 6 hours, plus one Reddit post in r/Twitch within 72 hours. Comment-camp = third-tier add-on.

→ Full report: [docs/roi-news-capture-apr28-reddit.md](roi-news-capture-apr28-reddit.md)

---

### YouTube (REFRAME)

> Searched Backlinko, Income School, Aleyda Solis, Barry Adams, Justin Welsh, Jenny Hoyos + Searchlab/Schema App data they cite.

**Zero hard-numbers precedent** for comment-camping under a third-party news post driving measurable external traffic to a fan tracker site. Every CTA-with-data video is about pinned comments under YOUR OWN video.

**What the data DOES back, with hard numbers:**
- Backlinko Skyscraper case: **+652% organic traffic / 7 days** on a single newsjacked own-site post
- Brandvisibility newsjack case: +2,800% day-of, +800-1,260% conversions, 75K pageviews / 5 months long-tail
- Searchlab AI Overviews 2026: **+40% AI-Overview inclusion** for schema'd pages, **+156% citation lift** for pages with original first-person data
- Google News Initiative: news-event search demand = "a single week of high interest" — actionable window is **~3-5 days**

**Conflict with X agent:** YouTube agent recommended `LiveBlogPosting` schema. **Resolved against** — see X agent below.

**Bottom line:** Ship a `/updates/april-28-incident` page with NewsArticle JSON-LD this week. The operator's first-person status of Days 1-34 is the moat — that maps directly to the +156% citation-lift mechanism.

→ Full report: [docs/roi-news-capture-apr28-youtube.md](roi-news-capture-apr28-youtube.md)

---

### X / Twitter (REFRAME)

> Searched growth operators (Fishkin, Natividad, Welsh, Appleby) + SEO leads (Lily Ray, Glenn Gabe, Aleyda Solis, Cyrus Shepard).

**Highest-ROI tactic:** Zero-click content on operator's owned channels (Natividad's @amandanat doctrine — every major platform suppresses outbound clicks; deliver value in-platform, let one Story link sticker / pinned bio do the click work). Comment-camping has **no posted-receipts evidence** for third-party tracker sites driving meaningful traffic.

**Hype flag:** "Newsjacking" is the term most invoked but lacks per-event traffic data for solo-operator use cases. Most evidence is brand anecdotes (Oreo Super Bowl 2013).

**Reputational risk flagged:** Jack Appleby (Future Social) cadence consistently warns of opportunism risk when commenting on tragedy/hospitalization posts without prior relationship to the public figure.

**Attribution reality (Rand Fishkin / SparkToro):** **76% of news-driven traffic will show as "direct"** — dark-social referrer stripping. Don't expect clean UTM attribution.

**Schema reframe (critical):** Use `Event` + `Person` + `NewsArticle` + `FAQPage` for the paused page. **Skip `LiveBlogPosting`** — Glenn Gabe (@glenngabe) and seoforjournalism.com note it requires Google News content-policy compliance (the tracker isn't a publisher), and Gabe explicitly says schema alone "doesn't impact rankings." Lily Ray's AIO posts suggest extractability/entity-mass beats authority for AI Overview citation.

**Half-life:** No X operator has posted a verifiable Google Trends decay screenshot for celeb-incident searches. Flagged as **hype-without-data**, do not quote a specific half-life number publicly.

**Bottom line:** Lead with zero-click content on owned channels + structured-data entity ownership for AIO/Perplexity citation over the next 7 days. Comment-camp = cherry, not cake.

→ Full report: [docs/roi-news-capture-apr28-x.md](roi-news-capture-apr28-x.md)

---

### Case-study blogs (REFRAME)

> Searched Search Engine Land, Search Engine Journal, Search Engine Roundtable, Backlinko, Authority Hacker, HubSpot, Buffer, Aleyda Solis blog, Marie Haynes, Smartocto, Averi/Wellows, NewzDash via PPC.land.

**What the blogs back with hard numbers:**
- Nieman Lab / Google Trends-Schema-Axios joint study: average big news story decays in **~7 days** (entire monetizable window)
- Search Engine Land — Lucid Insider case: new site captured **8,351 of 9,726 Google clicks (86%) via Discover** within 30 days from launch. **Discover, not Search, is where breaking-news third-party sites win.**
- Search Engine Roundtable: AI Overviews show <6% for breaking news (vs. 60%+ for health) — AIO is the **post-incident tail play**, not the acute-day play
- Averi / Wellows: **`FAQPage` schema produces 3.2x higher AI Overview citation probability** and 20-40% higher citation rate than paragraph text
- Smartocto: Breaking-news content gets **2x distribution priority** in Google's News Urgency pipeline
- NewzDash via PPC.land: Discover share of news-publisher traffic 37% → 67.5% in two years

**Hype-without-data flagged:**
- "First comment strategy" universally recommended (Blog2Social) but zero third-party CTR/conversion studies for a no-team tracker site converting comment-camp → external clicks. By analogy with IG/TikTok ad CTRs (0.84% / 1.5-3%), realistic = dozens of clicks, not thousands.
- "Speakable boosts voice traffic 20%" stat circulates but couldn't be traced to a controlled study; treat as directional.

**Bottom line:** Ship a single `/incident` page with `NewsArticle` + `FAQPage` + `Speakable` JSON-LD answering verbatim queries ("Is Minister Zay okay?" etc.), Search Console news submission, daily updates for 7 days. ~2-3 hours of work. First-comment camp + IG Story link sticker run as cheap secondary plays.

→ Full report: [docs/roi-news-capture-apr28-blogs.md](roi-news-capture-apr28-blogs.md)

---

## What we shipped vs. what the agents recommended

| Recommendation | Source | Shipped in v2.13.0? |
|---|---|---|
| `NewsArticle` JSON-LD on incident page | All 4 | ✅ |
| `FAQPage` JSON-LD on incident page (3.2x AIO citation) | Blogs | ✅ |
| `SpeakableSpecification` on incident page | All 4 | ✅ |
| `BreadcrumbList` JSON-LD | Blogs | ✅ on /updates, /updates/april-28-incident, /faq, /why |
| Skip `LiveBlogPosting` (publisher-policy) | X | ✅ skipped |
| `Event` `EventPostponed` + `previousStartDate` | X | ✅ |
| Daily-updates cadence for 7 days | All 4 | ✅ structure ready (`src/data/updates.ts` `aprilTwentyEightRecovery`); needs daily append |
| Citation array linking all news outlets | YouTube + Blogs | ✅ |
| `dateModified` bumps on every edit | YouTube | ✅ (build-time `Date().toISOString()`) |
| Search Console submission + IndexNow | Reddit + Blogs | Pending — Track A2 |
| Reddit r/Twitch post within 72h | Reddit | Pending — Track B1 Tier 4 |
| Comment-camp on Tier 1 surfaces | All 4 (as third-tier) | Pending — Track B1 |
| Bio-link audit + ShuggC escalation gate | (Plan agent) | ✅ docs/bio-link-audit-apr28.md |
| UTM attribution in faithwalklive-utm-log.csv | (Plan agent) | ✅ |
| Don't expect clean UTM attribution (76% direct) | X | Documented in comment-camp doc |

---

## Open follow-ups

1. **Search Console news submission** + IndexNow ping for /updates and /updates/april-28-incident. Pending T+2h after Vercel deploy verifies green.
2. **Daily recovery-entry append** for ~7 days. Mechanism: edit `src/data/updates.ts` `aprilTwentyEightRecovery`, push (sitemap auto-bumps lastModified). Use this opportunity to maintain freshness signal.
3. **AEO seeding verification** at T+24h and T+48h on the 6 canonical queries — see `docs/comment-camp-apr28.md` and `feedback_live_schema_verification.md`.
4. **48-hour go/no-go** on Track B1 surfaces — pull Vercel Analytics, kill <10-session sources.
