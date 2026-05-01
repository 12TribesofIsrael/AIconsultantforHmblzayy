---
name: ShuggC back channel — CLOSED May 1
description: ShuggC relay closed. Apr 17 call → Apr 18 overlay shipped → Apr 22 gatekeeping confirmed → IG DM to Zay → ShuggC silent for weeks → May 1 Thomas decision: done routing through ShuggC.
type: project
originSessionId: e1c03f75-0330-4b63-9c81-59a81703428c
---

## Current status (May 1, 2026): RELAY CLOSED

**Thomas's decision May 1:** done with ShuggC as a routing path. Gatekeeping confirmed permanent (silent ~weeks since the Apr 22 IG DM to Zay). **Do not suggest** "DM ShuggC first," "send to ShuggC and let him surface," or any ShuggC-mediated play in future sessions.

**Active surfaces going forward:**
1. **Direct to Zay** — IG DM (sent Apr 22 as AI_BIBLE_GOSPELS), text on standby
2. **HMBL University Discord** — Thomas posts as community member; tone matters extra since this is now a primary surface, not a fallback
3. **Twitch chat as AI_BIBLE_GOSPELS** — incidental presence, not a pitch surface

**Watermark stays.** AI Bible Gospels / faithwalklive.com attribution on `/obs` overlay does not depend on ShuggC permission and was never going to. If Zay or his team adopts /obs at any point, the brand stays unless they specifically ask otherwise.


## Timeline

**Apr 17, ~10:23 PM:** ShuggC called Thomas on Discord (11 min, pinned).
- Admin team (Kiki, Cierra) was assembled hastily at Day 5-6 with no vetting. ShuggC acknowledges the dysfunction.
- He can't remove existing admins but is restructuring (departments, team heads, chain of command).
- Offered Thomas a direct back channel: "between us, nobody else has to know." Report to ShuggC directly, not through Kiki's application queue.
- Acknowledged Thomas's work: "I see you did all this."
- Thomas brought up IP protection (from his other business experience) — ShuggC didn't know about it. Thomas had already purchased hmbluniversity across 7 TLDs (.com, .info, .net, .org, .shop, .store, .xyz) days prior to prevent squatting. .com renews Apr 12, 2029; the others renew Apr 12-13, 2027.
- Floated PM role as the operation scales.
- Acknowledged Cierra is intense with gatekeeping.
- Call ended positively: "God bless you, man. Let's go."

**Apr 17, 10:43 PM:** Thomas DM'd ShuggC with three offers:
1. IP lockdown — trademark search on HMBL + HBL University
2. Tech/automation — map location, anything organized
3. Send list of what you need done (YouTube API, Reddit, Twitter, etc.)

**Apr 17, 10:58 PM:** ShuggC replied with first real deliverable request:
- "What i fasure need asap is to figure out that map bipp"
- Use on OBS Remote feature through IRL Toolkit / IRL Run
- Work with "the site you made" (confirms he's seen faithwalklive.com — link is in Thomas's Twitch + Discord bio)
- Include the line track feature ("the yellow jawn")

**Apr 17, 11:02 PM:** Thomas replied: "Say less. I can build an OBS overlay version of the map — just the route line and current pin, no menus, sized for stream. I'll have something for you to test tomorrow be blessed!"

**Apr 18, 10:42 AM:** Thomas delivered overlay URL: https://tinyurl.com/22sg8xhc (redirects to /obs on Vercel preview branch feat/obs-overlay).
- Full-bleed dark map, gold polyline, pulsing amber beacon at current location
- Corner stats label (Day/miles/percent) togglable with `?bare=1`
- Brand watermark "faithwalklive.com" bottom-right togglable with `?brand=0`
- Built on feat/obs-overlay branch so production faithwalklive.com is untouched until ShuggC validates
- Also built /live UTM redirect route for trackable attribution traffic

**Status as of Apr 18 midday:** Awaiting ShuggC's test + go-ahead to merge to production (faithwalklive.com/obs).

**Apr 18, evening:** Diagnosed that the preview-branch tinyurl (`22sg8xhc`) hit a Vercel auth wall because preview deployments are auto-protected. Fast-forward merged `feat/obs-overlay` → `main` (2 commits: `136f0ed` /obs route + `f5d01ba` brand watermark + /live UTM) and pushed. Vercel promoted to production. Verified `https://faithwalklive.com/obs?bare=1` returns 200 with no auth wall.

**Canonical OBS URL (send to ShuggC going forward):** `https://faithwalklive.com/obs?bare=1`
- Stable on custom domain, no login prompt, survives branch/preview churn
- Old tinyurl `22sg8xhc` is now stale — preview branch deploy still auth-walled, ignore

**Apr 18 follow-up:** Vercel Deployment Protection disabled on faithwalklive project. Future `feat/*` preview URLs are now shareable without a login wall — good for sending ShuggC in-progress overlay iterations before merging to prod.

**Apr 19:** No reply from ShuggC since Apr 18 overlay delivery (~24+ hrs silence). Overlay is shipped to prod at `faithwalklive.com/obs?bare=1` regardless. Thomas holding posture — no follow-up nudge yet, letting the work sit. Day 25 was a rest day on the walk which may mean no stream usage attempt yet.

**Apr 20 (Day 26 stream check):** Visited live stream — overlay is NOT in use. Layout is camera-first (chest-cam full-bleed) with text widgets (timer top-right, "REST CHECKPOINT IN..." / "MILES TO..." cards bottom). `faithwalklive.com/obs` not adopted as background or as a corner widget. Thomas's call: leave it alone, no nudge — work is shipped, ball is in ShuggC's court. Don't pitch a corner-widget variant or message ShuggC about it unless he raises it first.

**Apr 22 — gatekeeping confirmed, direct-channel executed:** Overlay still untouched on stream 4 days after delivery. User declared "Gatekeeping again" and pivoted to go direct to Zay. Zay was at Ohio State rest day, chill on Twitch with mods present. Decision tree:
- Stream chat in front of mods = worst channel — ShuggC almost certainly watching or is a mod; public pitch there reads as calling out gatekeeping in front of the room.
- IG DM = chosen channel. Sent Apr 22 as AI_BIBLE_GOSPELS (handle already visible in Zay's chat). Copy framed as AI Bible Gospels delivering *to* him, "no strings", link to faithwalklive.com/obs, NO tech jargon (first draft said "for your OBS" → stripped because that routes back to ShuggC).
- Text message on standby — user believes he has Zay's cell from past family work. Hold 24-48h before sending; second-channel too soon flips "gift" → "please respond".

**Status as of Apr 22 end:** IG DM sent. Awaiting any signal (chat shoutout, overlay appearing on stream, reply). Text holstered. Dual-track fully live — ShuggC channel still open but de-prioritized; Zay-direct is now the active play.

## Strategic notes

- Thomas attended the Apr 17 town hall, stayed calm, supported chat, didn't raise grievances. Right posture — ShuggC called right after.
- faithwalklive.com pivot is NON-NEGOTIABLE regardless of HMBL relationship status. Dual-track always.
- Thomas's domains (HBLUniversity.com/org/net) are leverage but being played as service, not hostage. Won't mention cost to ShuggC.
- All HMBL interactions through ShuggC DM only — do not re-engage Kiki or Cierra directly.
- Brand watermark on overlay is the first time AI Bible Gospels / faithwalklive.com gets exposure on Zay's Twitch stream. Zero permission asked, zero permission needed — it's attribution on work we built. If ShuggC pushes back, `?brand=0` fallback is ready.

## Next steps

1. ~~ShuggC tests overlay → gives word~~ ✅ confirmed Apr 18
2. ~~Merge feat/obs-overlay → main → live at faithwalklive.com/obs~~ ✅ shipped Apr 18
3. Send ShuggC the canonical production URL: `https://faithwalklive.com/obs?bare=1` (replaces old tinyurl)
4. Follow up on IP lockdown domains (hmbluniversity.com + 6 other TLDs) — mention once he's engaged with the overlay on stream
5. Wait for him to send the "list" of what else he needs (YouTube API, etc.)
6. ~~Disable Vercel Deployment Protection on faithwalklive~~ ✅ done Apr 18 — preview URLs now shareable without auth
