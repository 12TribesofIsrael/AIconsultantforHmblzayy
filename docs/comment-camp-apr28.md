# Comment-camp playbook — Apr 28 incident news cycle

**Status:** Track B1 deliverable for the news-driven traffic capture pivot (v2.13.0). Ship-ready copy + URL list.

**ROI context:** All 4 ROI agents (Reddit / YouTube / X / case-study blogs) returned **REFRAME** on the assumption that comment-camping is the headline play. It's a free third-tier add-on, not the strategy. Still worth doing — costs ~5 min per surface, no downside. Just don't expect it to carry the load. The headline play is the structured-data ownership of [/updates/april-28-incident](https://faithwalklive.com/updates/april-28-incident) which already shipped (v2.13.0).

**Signal half-life:** ~24-36 hours per Pfeffer / GOV.UK news studies cited by the Reddit agent. ~10% residual by Day 7. So this whole window is **48-72 hours of meaningful action**, then it tails off.

---

## Rules of engagement

1. **Single comment per post.** No reply chains. No spam.
2. **Sentence-of-empathy first, link last.** Not "click here." Not "follow my site."
3. **No specifics beyond what the outlet already published.** Public-copy safety rule.
4. **Single account per surface.** Don't sock-puppet.
5. **Re-check at T+24h.** If the comment is buried (no upvotes, no replies, fell off the visible top), one re-post is OK. Then stop.
6. **Do not engage with grief / drama / rumor in replies.** Drop the comment, leave.
7. **Reputational risk:** the X agent flagged that commenting on tragedy posts without prior relationship to the public figure can read as opportunistic. Lead with empathy + utility (the recovery hub IS useful), not promotion.

---

## Master comment copy

Reusable across all surfaces. Substitute the UTM source per surface.

> **Praying for Minister Zay 🙏 The walk has a recovery hub with a live status timeline + every news outlet covering the story aggregated in one place: faithwalklive.com/updates/april-28-incident**

Variant for surfaces where a shorter form is better (TikTok comments, IG comments under 300 chars):

> **Praying for Zay 🙏 Live recovery updates + every news outlet on it: faithwalklive.com/updates/april-28-incident**

Variant for X/Twitter (280-char limit, more direct):

> **Live recovery hub for Minister Zay's walk after the Apr 28 incident — status updates + every outlet covering it (Fox 29, Fox 59, TMZ, Shade Room): faithwalklive.com/updates/april-28-incident 🙏**

---

## Surface list — UTM-tagged URLs

Order = highest expected ROI first.

### Tier 1 — celebrity/news verticals (already trending, high view counts)

| Surface | URL | Comment URL with UTM |
|---|---|---|
| The Shade Room IG | https://www.instagram.com/p/DXsREFagUhr/ | `https://faithwalklive.com/updates/april-28-incident?utm_source=shaderoom_ig&utm_medium=comment&utm_campaign=apr28` |
| TMZ TikTok | (URL TBD — Thomas to provide) | `https://faithwalklive.com/updates/april-28-incident?utm_source=tmz_tiktok&utm_medium=comment&utm_campaign=apr28` |

### Tier 2 — Fox network local + national (large local audiences, regional Twitch crossover)

| Surface | URL | UTM source |
|---|---|---|
| Fox 29 Philadelphia | https://www.fox29.com/news/twitch-streamer-minister-zay-hit-car-during-faith-walk-from-philadelphia-california | `fox29` |
| Fox 59 Indianapolis (closest geo) | https://fox59.com/news/indynews/streamer-hit-by-car-in-indiana-while-walking-across-country-to-raise-money-for-children/ | `fox59` |
| Fox 5 New York | https://www.fox5ny.com/news/twitch-streamer-minister-zay-hit-car-during-faith-walk-from-philadelphia-california | `fox5ny` |
| Fox 5 Atlanta | https://www.fox5atlanta.com/news/twitch-streamer-minister-zay-hit-car-during-faith-walk-from-philadelphia-california | `fox5atlanta` |
| KTVU Fox 2 (SF Bay) | https://www.ktvu.com/news/twitch-streamer-minister-zay-hit-car-during-faith-walk-from-philadelphia-california | `ktvu` |
| Fox 32 Chicago | https://www.fox32chicago.com/news/twitch-streamer-minister-zay-hit-car-during-faith-walk-from-philadelphia-california | `fox32chi` |
| Fox 35 Orlando | https://www.fox35orlando.com/news/twitch-streamer-minister-zay-hit-car-during-faith-walk-from-philadelphia-california | `fox35orl` |

URL pattern for Fox surfaces: `https://faithwalklive.com/updates/april-28-incident?utm_source={SOURCE}&utm_medium=comment&utm_campaign=apr28`

Most Fox affiliate articles use Disqus or Facebook comment plugins. Comment if open; some have comments disabled — skip those.

### Tier 3 — local + international

| Surface | URL | UTM source |
|---|---|---|
| Daily Voice (PA) | https://dailyvoice.com/pa/stewartstown-fawn-grove/twitch-streamer-hit-by-car-in-ohio-during-livestream-of-cross-country-walk-from-philly-to-cali/ | `dailyvoice` |
| The Express Tribune | https://tribune.com.pk/story/2605410/what-happened-to-hmblzayy-twitch-streamer-hit-during-3000-mile-faith-walk-in-indiana-crash | `expresstribune` |

### Tier 4 — Reddit (highest single-source ROI per Reddit agent — 1 well-placed post = ~1k pageviews / 500 upvotes in 2 days)

Single post per sub. Don't cross-post the same body. Use this structured format inside the post (Reddit AI Overview citation rate is 37%):

**Sub options (rank by relevance):**

1. **r/Twitch** — most relevant. Title: "Faith Walk paused — recovery updates for Minister Zay (HMBL Zayy) after Apr 28 incident". Body: the same context as our /updates page, with the link. Tag: News.
2. **r/livestreamfail** — broader streamer audience. Lower trust, can devolve into drama. Use only if r/Twitch performs.
3. **r/Indianapolis** or local Indiana subs — geo-relevant since the incident was on US-40. Title: "Update on the Twitch streamer hit on US-40 last week". Local-news framing.
4. **r/InspireFitness** / **r/walking** / **r/getmotivated** — community angle. Frame: "Minister Zay was 700+ miles into a 3000-mile walk when he was struck by a car last week. Recovery updates here."

UTM source: `reddit_twitch` / `reddit_lsf` / `reddit_indy` / `reddit_motivation`.

**Do NOT** post in r/Christianity, r/Christian, r/TrueChristian — those subs strictly enforce no self-promotion / no link-drop rules and you'll get banned.

### Tier 5 — IG / TikTok organic (additional posts beyond the 2 listed in Tier 1)

Per the user: "It's literally all over Instagram and TikTok." Search the platform for posts about the incident at T+0 and T+24h, comment on the top 5 each round. Same single-comment, sentence-of-empathy-first rule. Cap: 10 surfaces max per platform per 48h to avoid the comment-spam trigger.

---

## Cadence

- **T+0 (now):** drop comment on Tier 1 (Shade Room IG; TMZ TikTok when URL arrives) + the Fox 59 Indianapolis post (closest geo, most likely to convert local viewers who saw the original incident from local sources). Total: 3 surfaces.
- **T+2h:** Tier 2 Fox network sweep (Fox 29 + Fox 5 NY + Fox 5 Atlanta + KTVU + Fox 32 + Fox 35) — 6 surfaces.
- **T+6h:** Tier 4 Reddit post in r/Twitch with the full context. One post.
- **T+12h:** IG / TikTok organic sweep (top 5 posts per platform).
- **T+24h:** Re-check — repost only on surfaces where the comment was buried.
- **T+48h:** Pull Vercel Analytics, check UTM rows. Kill any source under 10 sessions, double down on top performer.

---

## Attribution caveat

Per the X agent (citing Rand Fishkin / SparkToro): **76% of news-driven traffic shows as "direct" referrer** because of dark-social referrer stripping. Don't be surprised when the UTM-tagged sessions look low even when total traffic is up. Look at total `/updates/april-28-incident` traffic in Vercel Analytics, not just the UTM-attributed slice.

---

## Search-engine submissions (Thomas, GUI-only — 5 minutes)

These are the only manual steps remaining after v2.13.0 ships. Programmatic submission isn't possible without OAuth keys / IndexNow setup, and per the ROI agents the marginal value isn't worth the setup overhead. Fastest path is the GUIs:

1. **Google Search Console** — https://search.google.com/search-console/inspect?resource_id=https%3A%2F%2Ffaithwalklive.com%2F
   - URL Inspection on `https://faithwalklive.com/updates/april-28-incident` → click "Request Indexing"
   - URL Inspection on `https://faithwalklive.com/updates` → click "Request Indexing"
   - URL Inspection on `https://faithwalklive.com/` → click "Request Indexing" (metadata changed)
   - URL Inspection on `https://faithwalklive.com/faq` → click "Request Indexing" (Q7 changed, BreadcrumbList added)
   - Optional: Sitemaps → resubmit `sitemap.xml` (it's already in the system, but the resubmit nudges a recrawl).

2. **Bing Webmaster Tools** — https://www.bing.com/webmasters
   - If faithwalklive.com isn't verified yet, that's a one-time setup: download the verification XML, place in `public/`, push, then verify. Worth doing — Bing also powers DuckDuckGo and feeds many AI answer engines.
   - Once verified: URL Inspection → Submit URL on the same 4 URLs above.

3. **Skip:** IndexNow (would require key setup + .txt file deployment for marginal additional coverage), Google News Publisher Center (we're not a registered news publisher, and per the X agent's Glenn Gabe citation that's the right call for a non-publisher tracker site).

**Verification at T+24h:** check Search Console Performance → Search results → filter by `/updates/april-28-incident` to see impressions / clicks / position. If position > 30 by Day 3, the schema work isn't winning yet — re-pull Vercel Analytics for Discover-specific traffic (Discover is where breaking-news third-party sites win per the case-study blogs agent — Lucid Insider got 86% of clicks from Discover, not Search).

---

## What we're NOT doing

- **No paid retargeting / pixel ads** — would be ROI-negative for a non-merch tracker site.
- **No press release.** Press footer line in `Footer.tsx` (`aibiblegospels444@gmail.com`) is sufficient as inbound contact.
- **No ManyChat DM funnel** (deferred per Apr 25 Remix ROI verdict — `project_remix_roi_check.md`).
- **No comment-camping in r/Christianity-tier subs** — ban risk.
- **No DM-blasting Zay's followers / HMBL community.** Will read as predatory.
