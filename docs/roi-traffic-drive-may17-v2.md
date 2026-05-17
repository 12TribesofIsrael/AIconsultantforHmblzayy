# 4-Agent ROI Check v2 — Corrected Baseline (May 17, 2026)

**Re-ask reason:** v1 (earlier the same day) ran on the WRONG dataset. I told Thomas faithwalklive.com was at 3.4 visits/day. That was actually the legacy GH Pages tracker URL via GoatCounter — a stagnant secondary surface. The real faithwalklive Vercel Analytics number: **320 visitors / 30 days (~28/day), 848 pageviews, 2.6 PV/visitor, 52% bounce**, with **Google as the #1 referrer (93 visitors, 29% of traffic)**.

That changes the question. v1 asked "how do we get traffic when there is none." v2 asks "given Google AEO is already the unfair lever doing 29% of acquisition, what's the highest-ROI NEXT move?"

The 4 candidate plays evaluated:
- **A. AEO content velocity** — more long-form, /press expansion, /why deepening, topic pages, FAQ expansion.
- **B. Email capture above the fold** — convert the 28/day into a 1st-party owned list.
- **C. HARO/Qwoted daily** — press placements drive direct + backlink-fed Google ranking lift.
- **D. Something else entirely.**

---

## Verdict tally

| Channel | Ranking | Verdict | Sequence flag |
|---------|---------|---------|--------|
| **Reddit** | B > C > D-Reddit > A | SHIP | "B → C → D, defer A" — B is load-bearing |
| **YouTube** | B > A > C > D | SHIP | "B unlocks A and C" — B is load-bearing |
| **X / Twitter** | C > A > B > D | SHIP | "C feeds A; B too small at 28/day, defer 60-90d" |
| **Case-study blogs** | A > B > C > D | SHIP | "B first (1-day prereq), then A, defer C to month 6" |

**3 of 4 explicitly say B is load-bearing.** X dissents — argues 28/day is too small a base for B to matter, and that C (HARO playbook already on disk per v2.15.0) is the cheapest unlock.

**Sequence consensus (3-of-4 agreeing): B → A or C → defer the other.**

---

## Hard corrections to my prior math

| What I said | What the data says | Source |
|-------------|--------------------|--------|
| 20% above-the-fold email capture rate | 2.1% Omnisend median (1.24B popups, 2025); 2.9% with timed/exit trigger (BDOW); 3% Welsh hero-CTA range | Omnisend 2025, BDOW |
| 64 emails/month at current traffic | ~18-25 emails/month realistic | 28/day × 2.1% = 0.59/day |
| 770 emails in 12 months | ~250-300 emails in 12 months | Welsh's "0-to-100 in 28 days" framing |
| HARO is "press flywheel" / easy lever | 5-15% pitch-to-placement, 0-3 placements/mo sustained, HARO degraded by AI-spam saturation since Featured.com 2025 rebuild | SE Ranking, RepuLinks |
| AEO velocity = next move | Topical clusters take 6-12mo to compound; the JSON-LD foundation already paying is doing the work; marginal new-page ROI declining | BuzzStream, Circuit, Authority Hacker case studies |

**The most painful correction:** at 2.1% conversion, capture math is roughly the size of Justin Welsh's "0 to 100 subs in 28 days" baseline — not a flood, but real compounding when measured over 12 months.

---

## Convergent thesis across channels

1. **The Google channel is the unfair lever, already working.** All 4 agents agreed: the structured-data investment (`NewsArticle`, `FAQPage`, `Speakable`, `BreadcrumbList`, `WebPage`, `Event`, `Person`, `Organization` schemas) is producing 29% organic Google share. That's the load-bearing acquisition channel. Don't break it; feed it.

2. **The leak is the bottom of the funnel, not the top.** 848 pageviews/30d entering, zero captured as owned audience. Reddit, YouTube, and Blogs all framed this as the binding constraint: *"every visitor without capture is a leaky bucket."*

3. **HARO is a back-loaded play.** v2.15.0 specced the playbook but it's not in production. X argued ship it; Reddit and Blogs said month-3-to-6. Tradeoff: HARO drives backlinks (which compound Google rankings) but takes 60+ days of pitching to land first placements at 5-15% success rate.

4. **More AEO content is the slowest payback.** All 4 agreed the marginal new-page ROI is declining now that the schema/structured-data foundation is in place. Better to deepen existing high-traffic pages (/why, /press, /faq) with internal linking + schema enrichment than to ship new topic pages.

5. **Reddit-native distribution is the dark horse "D" play.** Reddit agent flagged: SISTRIX confirms Reddit is the **#2 site in Google US SERPs behind Wikipedia** as of April 2025. A single thoughtful r/Christianity / r/running / r/MapPorn / r/UpliftingNews comment referencing faithwalklive.com could outperform months of new /why content. ~30 min/week. Worth threading into the plan.

---

## What to ship (sequenced, with realistic numbers)

### Now (this PR — v2.19.0)
**B. Email capture above the fold, wired to Resend** — 1-day install, no daily maintenance after launch.
- Component: `src/components/EmailCapture.tsx` (hero + compact variants, brand-matched)
- Backend: `src/app/api/subscribe/route.ts` (Resend Audiences API + welcome email)
- Placement: hero variant immediately below the headline on `/` (above stat grid + map), compact variant at footer (multi-CTA per Unbounce CRO data)
- Sender: `Faith Walk Live <info@anointed.app>` (reuses verified press-outreach domain)
- **Realistic target:** 250-300 emails in 12 months at 2.1% conversion. Smaller than I previously claimed, but it's a real owned channel that compounds when the walk ends.
- **Thomas-action to activate:** create Resend Audience + add `RESEND_API_KEY` (full-access scope) + `RESEND_AUDIENCE_ID` to Vercel env vars. Returns 503 until configured.

### Within 30 days
**C. Execute the v2.15.0 HARO playbook** — 5 min/day routine that was specced but never operationalized.
- `docs/haro-playbook.md` + `docs/haro-response-template.md` already exist.
- **Realistic target:** 1-3 placements/month from month 2 onward at 5-15% pitch rate.
- Compounds the Google ranking signal (backlinks from journalist-tier domains).

### Month 2+
**A-lite. Schema-first AEO sprint** (Blogs agent's "80/20 of A") — don't write new pages, deepen existing ones with `Article`, `HowTo`, `Event`, internal linking. 4-8 hours one-time.

### Background hum
**D. Reddit-native distribution** — one thoughtful comment per week in a faith/walking/cause-aligned sub linking faithwalklive as a primary source. Test r/Christianity and r/running first.

### Defer
- More AEO content pages (low marginal ROI vs the work the existing JSON-LD is already doing)
- Daily IG Story stickers / TT Stitches (4-agent verdicts Apr 25 + Apr 27 + May 17v1 all said no — the new data doesn't change that)

---

## What NOT to do (per all 4 channels)

- **Don't measure faithwalklive pageviews as the KPI.** Switch to: email captures/week, Discord joins post-link-drop, brand-search lift for "AI Bible Gospels" via GSC, HARO placements/month. The Vercel Analytics traffic graph is a vanity metric beyond a certain point.
- **Don't run more 4-agent ROI checks on this same fundamental question** unless a new variable appears (Zay's team starts posting trackers, news event reopens search demand, traffic baseline 5x's or 0.5x's). Three checks (Apr 25 + Apr 27 + May 17 v1 + May 17 v2 = 16 agent runs total) is enough.
- **Don't over-engineer the email program before subscribers exist.** Ship capture → welcome email → measure first 100 subscribers' engagement before building daily-send infrastructure.

---

## Sources

Full source URLs in the four channel reports (Reddit / YouTube / X / case-study blogs) — captured in the v2.19.0 commit message + agent transcripts.
