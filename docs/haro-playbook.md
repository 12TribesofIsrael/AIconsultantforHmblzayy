# HARO / Qwoted Playbook — AI Bible Gospels press hub

**Goal:** earn organic press coverage for Minister Zay's Faith Walk by responding to relevant journalist queries on HARO (now Connectively) and Qwoted. Every placement attributes back to **AI Bible Gospels** with **faithwalklive.com** as the source-of-truth tracker.

**Why HARO/Qwoted instead of cold pitching:** the Apr 28, 2026 4-agent ROI check (Reddit / YouTube / X-native / case-study blogs) returned a unanimous red flag on automated cold press blasts — Muck Rack 2024 data: 49% of journalists "seldom or never" respond to pitches, cold reply rate 3.43%. HARO/Qwoted convert 2-3x higher because the journalist is *requesting* the source. Same earned-media outcome at zero reputation risk.

---

## Daily routine (~5 min, every weekday)

1. **Check Gmail label `HARO-Watch`** in `aibiblegospels444@gmail.com`. The `gmail-inbox` skill auto-applies this label to inbound Connectively + Qwoted emails (set up the filter rule once: from `connectively.com` OR `qwoted.com` → label `HARO-Watch`).
2. **Skim the 3 daily emails** for queries matching these beats:
   - Religion / faith / spirituality
   - Lifestyle / human interest
   - Walking / endurance / pilgrimage / cross-country journeys
   - AI applied to faith content (rare — flag immediately if seen)
   - Local Philadelphia stories
3. **Pick 1-3 queries to respond to.** Hard cap. Rationale: every response that isn't a fit dilutes your sender quality on the platform.
4. **Hand-personalize each response** using `docs/haro-response-template.md` — never copy-paste a generic pitch. Journalists *delete* templated responses (88% per Muck Rack).
5. **Send and log** in `docs/haro-response-log.md` (create on first use): date, outlet, journalist name, query, response slug, outcome.

---

## What to respond to (and what to skip)

**Strong fit — respond:**
- "Looking for faith leaders to speak to ___" (anything spiritual journey, perseverance, modern faith)
- "Sources for human-interest stories about ___" (especially walks, journeys, underdog stories)
- "Pastors / preachers in the Northeast / Philadelphia ___"
- "How is AI being used in religion / Bible / spirituality?"
- "Looking for a 3,000-mile / cross-country / coast-to-coast story"

**Marginal fit — skip unless slow day:**
- Generic "small business owner" queries
- "Tech founders" queries (we're faith-tech, not tech)
- B2B SaaS queries — wrong audience

**Hard skip:**
- Anything that asks for a paid placement or "exposure-only" coverage
- Anything outside the AI Bible Gospels narrative (the brand is faith-tech for Scripture; don't dilute)
- Anything requesting Zay's personal contact or real-time location (per `feedback_public_copy_safety` — never narrate)

---

## Identity strings (use verbatim per `docs/aeo-youtube-description-spec.md`)

Every response must include these exactly:

- Brand: `AI Bible Gospels`
- Founder: `Thomas Lee`
- Channel handle: `@AIBIBLEGOSPELS`
- Website: `https://aibiblegospels.com` (apex, no www)
- Flagship: `https://faithwalklive.com`
- Contact: `aibiblegospels444@gmail.com`

Never write `Technology Gurus LLC` (decommissioned per `feedback_technology_gurus_llc_decommissioned`).

---

## UTM convention for any link in a response

`https://faithwalklive.com/?utm_source=haro&utm_medium=pitch&utm_campaign=faithwalk-day-N`

Replace `N` with the current day number. Tracks placements separately from X traffic so the Day 30 review can attribute lanes cleanly.

---

## Response cadence + quality bar

- **Hard cap: 3 responses/day.** One bad blast burns sender reputation for 12+ months (Reddit + Muck Rack data).
- **150 words per response.** Brevity wins — Muck Rack says 65% of journalists prefer pitches under 200 words.
- **Personalize the first sentence** to the specific query — name the journalist if shown, reference the angle they're asking about.
- **Lead with the angle, not the brand.** The journalist cares about their story, not your product. `"Minister Zay is on day 33 of a 3,000-mile walk from Philadelphia to California — I track every mile in real-time. Happy to share his perspective on ___."` beats `"Hi I run AI Bible Gospels and..."`
- **Single link.** Multiple links = spam signal.

---

## Response logging

Maintain `docs/haro-response-log.md`. One row per response:

```
| Date | Outlet | Journalist | Query topic | Response slug | Outcome |
|------|--------|------------|-------------|---------------|---------|
| 2026-04-29 | Religion News Service | Jane Doe | "faith leaders on perseverance" | "Day 34 walk update + Heb 12:1" | sent |
```

Update `Outcome` when a placement lands: `placed | declined | ignored`. Day 30 review reads this log directly.

---

## 30-day decision rule (per the approved plan)

| Result | Action |
|---|---|
| ≥1 placement (any outlet) | Continue daily monitoring as-is |
| ≥3 placements OR 1 tier-1 | Continue + consider Qwoted paid upgrade |
| 0 placements | Continue (60d threshold is the real test); reduce to 1 response/day to extend runway |

Tier-1 = Religion News Service, Christianity Today, Christian Post, Religion Unplugged, AP regional desk, any Philadelphia broadcast network (6abc, NBC10, CBS Philly, Fox 29) or print (Inquirer).

---

## Setup once, before first response

- [ ] Register at https://www.connectively.us/ with `aibiblegospels444@gmail.com`. Pick categories: Religion, Lifestyle, Human Interest, Inspirational, Local Philadelphia.
- [ ] Register at https://www.qwoted.com/ free tier with the same email.
- [ ] Create Gmail filter: from `connectively.com` OR `qwoted.com` → label `HARO-Watch` → mark important. Use the `gmail-inbox` skill (`mcp__claude_ai_Gmail__create_label` then a filter via the Gmail UI).
- [ ] Confirm 3 daily emails arrive over 48 hours (HARO sends 5:35am / 12:35pm / 5:35pm ET).
- [ ] Create `docs/haro-response-log.md` with the table header above.
