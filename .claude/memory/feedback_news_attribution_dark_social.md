---
name: News-driven traffic shows as "direct" — dark-social referrer stripping
description: Per Fishkin / SparkToro, ~76% of news-driven traffic shows as direct referrer because most messaging apps and link-shorteners strip referrers. Don't over-index on UTM-attributed sessions when evaluating news-cycle capture tactics.
type: feedback
originSessionId: c2c6c7b5-6590-4750-8837-8caa2cfbc2e3
---
When evaluating news-cycle traffic capture (comment-camp, social shares, AI-citation, etc.), expect **~76% of news-driven traffic to show up as "direct" referrer** in analytics, not as the UTM source you tagged it with.

**Why:** Per Rand Fishkin / SparkToro (cited by the X channel during the Apr 30 4-agent ROI check), most messaging apps (iMessage, WhatsApp, DMs, Slack) and link-shorteners strip the referrer header by default. So even when a UTM-tagged URL is shared from one of our comment-camp surfaces (Shade Room IG, TMZ TikTok, Fox 29, etc.) into a private chat or a DM, the resulting click lands as `utm_source=` empty + referrer=direct in Vercel Analytics. The actual sessions exist; the attribution doesn't.

**How to apply:**
- **Don't kill a UTM source just because it shows <10 attributed sessions.** First check total page traffic on the destination URL. If `/updates/april-28-incident` is getting 200 sessions/day from "direct" referrers, the schema work is doing its job — even if no single UTM source shows >10.
- **The total-on-page metric beats the UTM-attributed slice** when measuring news-cycle capture effectiveness. Watch the destination page's traffic in Vercel Analytics, not the source attribution table.
- **Search Console + total Discover impressions** are independent signals worth pulling alongside Vercel Analytics. They aren't subject to dark-social stripping — they're crawler-driven.
- Mentioned in `docs/comment-camp-apr28.md` "Attribution caveat" section so future Thomas-action checks don't tank a tactic prematurely.
