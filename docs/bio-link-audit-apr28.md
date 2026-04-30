# Bio-link audit — Apr 28 news capture window

**Status:** Track B2 deliverable. Audit table of every Zay-controlled surface — what's linked, whether faithwalklive.com is reachable from there, and what the route-to-fix is given Zay's team is not promoting.

**Why this matters:** TMZ / Fox / Shade Room won't link to faithwalklive.com. The fastest bridge from "I just saw the news" to "I'm on the tracker" is Zay's own profile bio links — because the FIRST thing news-driven viewers do is search his handles to find out if he's okay. If `@ministerzay` IG or `@hmblzayy` TT bio doesn't carry faithwalklive.com, that traffic falls through.

**Constraint:** we cannot ask Zay's team to add links. The only direct route is ShuggC backchannel (per `project_shuggc_backchannel.md`), and that's reserved for high-leverage asks only — don't burn it on a low-converting surface.

---

## Audit table

| Surface | Handle | URL to check | Has faithwalklive? | Priority | Route to fix |
|---|---|---|---|---|---|
| **Twitch panel (Stream Description / Panels)** | hmblzayy | https://www.twitch.tv/hmblzayy/about | TBD | **HIGH** — direct news-search target ("Minister Zay Twitch") | ShuggC ask if missing — Twitch panels are owner-only edit |
| **Instagram bio** | @ministerzay | https://www.instagram.com/ministerzay/ | TBD | **HIGH** — IG is where Shade Room → IG bio funnel happens | ShuggC ask only if T+48h Vercel data shows comment-camping isn't enough; otherwise wait |
| **TikTok bio** | @hmblzayy | https://www.tiktok.com/@hmblzayy | TBD | **HIGH** — TT is where TMZ TikTok → handle search → bio funnel happens | ShuggC ask same threshold as IG |
| **Twitter/X bio** | (handle to confirm) | https://twitter.com/HmblZayy or https://twitter.com/ministerzay | TBD | MEDIUM — smaller audience, but X discourse around the incident may pick up | Low priority — defer |
| **YouTube channel "About" + first comment pin** | (channel TBD) | YouTube Studio | TBD | LOW — YT isn't a primary surface here | Defer |
| **Facebook Page link** | (page handle TBD) | facebook.com/HMBL... | TBD | LOW — FB is decay surface for Zay's audience | Defer |
| **HMBL Shopify store header / footer** | hmblclothing.com | https://hmblclothing.com | TBD | LOW — merch-buyer ≠ news-watcher; conversion intent doesn't overlap | Defer indefinitely |
| **HMBL University Discord** | discord.gg/MzWAdRbDqu | (Discord channel) | YES (already routed in via /prayer) | DONE | n/a — `/prayer` already routes Discord users back to faithwalklive |

**Note:** "TBD" entries need Thomas to manually open the surface and check (one-shot, ~30 seconds each). Bio-link content can change daily — automated scraping is unreliable, manual eyeball is the source of truth.

---

## Recommendation

1. **Manual eyeball pass (today, 5 min):** Thomas opens each Twitch / IG / TT profile in browser, screenshots the bio. Marks each row above YES / NO.
2. **Decision matrix at T+48h** (after Vercel Analytics pull):
   - If comment-camping (Track B1) brings >50 sessions → bio-link gap is non-blocking; defer ShuggC ask.
   - If comment-camping brings 10-50 sessions → ShuggC ask becomes worth it for 1 surface (the highest-priority gap, likely IG or TT).
   - If comment-camping brings <10 sessions → ShuggC ask is the only realistic next move; proceed with the ask, framed as "I built a recovery hub aggregating all the news coverage in one place, would help if Zay's team can put faithwalklive.com/updates/april-28-incident in his IG bio link tree while the walk is paused — gives anyone searching for him after the news a place to land."
3. **What NOT to do:** do NOT DM the team directly, do NOT comment on Zay's own posts asking for the link, do NOT manipulate followers into requesting it. The only legitimate channel is ShuggC.

---

## Reframe note (from ROI agents)

The X agent flagged: "76% of news-driven traffic will show as direct referrer" (dark-social referrer stripping). That means even WITHOUT bio links, news-search visitors who Google "minister zay" → see our `/updates/april-28-incident` in results → click → arrive as "direct." Bio links are a 2nd-order optimization. The 1st-order optimization (already shipped) is the on-page schema that makes us rank for those searches in the first place.

Don't over-index on the bio-link gap as the bottleneck. Watch Vercel Analytics. If `/updates/april-28-incident` is getting traffic without bio-link help, the schema work is doing its job.
