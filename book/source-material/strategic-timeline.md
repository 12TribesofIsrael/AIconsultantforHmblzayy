# Strategic Timeline — Source Material

Raw narrative material for the book Zay asked Thomas to write. Honest about obstacles, written so the team can read it without stinging. Dates inferred from git log, docs, and memory files.

---

## Arc 1 — Cold Approach & First Free Deliverable (Apr 6–7, 2026)

**Situation.** Thomas was an AI automation engineer in Philly, on the outside of HMBL looking in. No relationship with Zay, no intro, no permission to build anything. Zay had 130K followers on his brand IG and a Faith Walk streaming daily with no dedicated tech team yet.

**Move.** Thomas researched all 8 of Zay's platforms first (intro video, research profile, platform-by-platform audit in `research/`). Then he DM'd ShuggC — HMBL's tech lead — on Discord Apr 6 with a full menu: auto-clip system, live tracker, chatbot, highlight reels, intro video. He led with a demo intro video he'd built in a few minutes, neighborhood credibility (29th & Lehigh), and "no charge for any of this right now." He also DM'd Zay on IG referencing the intro video already being used on stream.

**Result.** Apr 7 morning, ShuggC used the intro-wide video to open the Twitch stream. First validation that the work could land without a contract. ShuggC was cautious about Discord bot access — "the team is 5-6 days old, give it another week." Zay never replied to the IG DM directly. The pattern was set: ship first, talk later, Zay reachable only through team.

**Source:** `docs/admin-pitch-message.md`, `docs/zay-dm.md`, `.claude/memory/shuggc_relationship.md`, commit `8764b5e` (Initial setup).

---

## Arc 2 — Breakthrough & Town Hall (Apr 9)

**Situation.** After two days of proof-of-work posted quietly in Twitch chat and Discord, Thomas dropped a link to the live Faith Walk tracker.

**Move.** Ship the tracker publicly. Let the community reaction do the asking.

**Result.** Apr 9, 9:34 AM — ShuggC DM'd: "Will be bringing you on the tech side. you snapped." That night at the HMBL Town Hall, ShuggC shouted out the tracker publicly, and Thomas connected directly with Zay for the first time. Thomas committed to sending Zay leg compression sleeves. The team said give us 48 hours to formalize onboarding. Status: locked in.

**Source:** `.claude/memory/shuggc_relationship.md`, `docs/quick-reference.md` timeline.

---

## Arc 3 — Admin Gatekeeper Friction (Apr 10–15)

**Situation.** The 48-hour onboarding window passed with no paperwork. Meanwhile Thomas ran into HMBL's admin layer — assembled quickly around Day 5-6 of the walk with no vetting (ShuggC later confirmed this on the Apr 17 call).

**Move.** Keep shipping. Keep updating the tracker daily. Stay respectful.

**Result.**
- **Apr 10** — Cierra Lanae issued a warning for posting the tracker in the Discord general channel (route team territory). Thomas apologized, explained he didn't know a route team existed. ShuggC DM'd warmly: "onboarding is definitely still happening should be tomorrow honestly."
- **Apr 13** — HMBL opened Clippers applications via a Discord bot. Thomas applied with polished structured answers. **@Big Kiki denied it at 5:44 PM**: "please resubmit with shorter answers that aren't ai generated." The irony didn't escape Thomas — the role where AI skill was the whole point rejected him for sounding AI-fluent.
- **Apr 13–15** — Two more submissions, softer voice, still pending.
- **ShuggC went silent** after Apr 13. "Should be tomorrow" stretched into a week.

**Lesson captured in memory:** polished writing is a liability in HMBL applications. Match the community voice — plain, short, faith-first.

**Source:** `.claude/memory/shuggc_relationship.md` Apr 13 section, commit `dd85586` (Clippers saga log).

---

## Arc 4 — The Dual-Track Pivot (Apr 15)

**Situation.** Formal onboarding stalled indefinitely. Thomas had shipped five deliverables for free and was still outside the gate. Frustration was valid; continuing to wait was not.

**Move.** Write `docs/faith-tech-pivot-strategy.md` Apr 15. Thesis: "Zay was the on-ramp, not the destination." Build **Faith Walk Live** as a supporter-built companion platform on Thomas's own domain, positioned explicitly as unofficial. Use it as the flagship portfolio piece for a broader faith-tech consulting brand aimed at Christian streamers, ministers, and mission orgs. Six non-negotiable positioning rules — never go negative on HMBL, no claim of affiliation, no begging, God first.

**Result.** `faithwalklive.com` deployed to Vercel **Apr 17** as v0.2.0 with AI Bible Gospels branding across nav, footer, homepage. Independence from HMBL's internal politics. The tracker kept running in the consulting repo as daily operations; the public site ran under Thomas's banner.

**Source:** `docs/faith-tech-pivot-strategy.md`, commit `3b1db43`, `.claude/memory/project_faithwalklive_launch.md`.

---

## Arc 5 — AI Bible Gospels Branding Integration (Apr 15–17)

**Situation.** Thomas already ran a YouTube channel, @AIBIBLEGOSPELS, as his personal faith-tech content brand. The pivot needed an audience-building vehicle, not just a project.

**Move.** Position AI Bible Gospels as the builder/sponsor across every page of `faithwalklive.com`. The watermark on the live map became the first time that brand would appear on Zay's stream — attribution on work Thomas owned, not a permission ask.

**Result.** Unified faith-tech identity. A toggle (`?brand=0`) was built in so ShuggC could drop the watermark if needed — service-first, not ego-first.

**Source:** `.claude/memory/user_aibiblegospels.md`, `.claude/memory/project_faithwalklive_launch.md`.

---

## Arc 6 — ShuggC Back Channel Opens (Apr 17–18)

**Situation.** Apr 17 Town Hall. Thomas attended, stayed calm, supported chat, raised no grievances. Right posture at the right moment.

**Move.** Present. Available. Silent on the politics.

**Result.**
- **Apr 17, 10:23 PM** — ShuggC called Thomas on Discord for 11 minutes. He acknowledged the admin dysfunction ("assembled in a week with no vetting"), admitted he couldn't remove existing mods but was restructuring with departments and team heads, and opened a direct back channel: *"between us, nobody else has to know."* Report to ShuggC, bypass the Kiki application queue. He floated a PM role as the operation scales. "I see you did all this."
- **Apr 17, 10:58 PM** — First real ask came in: an OBS overlay version of the map for the stream.
- **Apr 18, 10:42 AM** — Thomas delivered. Full-bleed dark map, gold polyline, pulsing beacon, toggles for stats and branding. Merged `feat/obs-overlay` → main same day. Shipped live at `faithwalklive.com/obs`.

**Source:** `.claude/memory/project_shuggc_backchannel.md`, commit `7f45401` (v2.5.0).

---

## Arc 7 — IP Domain Lockdown as Service (Apr 17)

**Situation.** On the Apr 17 call, Thomas raised IP protection — something his business experience had taught him. ShuggC didn't know about it.

**Move.** Days earlier, Thomas had already bought `HBLUniversity.com`, `.org`, `.net` out of pocket ($200) to prevent squatters. He disclosed the fact but never mentioned the cost. Framed as service-in-hand, not hostage.

**Result.** Goodwill without leverage posture. Leverage held quietly.

**Source:** `.claude/memory/project_shuggc_backchannel.md` strategic notes.

---

## Arc 8 — Shoutout & the Book Ask (Apr 19, today)

**Situation.** v2.6.0 shipped — every tracker update auto-syncs to `faithwalklive.com`. Day 24 Mt. Vernon OH confirmed; Day 25 rest day. 494 miles down, roughly 17% of the 3,000.

**Move.** Keep shipping. Keep the tracker honest (never claim unconfirmed mileage). Stay available on the back channel.

**Result.** Zay asked Thomas to write a book. This document is the raw material for it.

---

## Lessons Worth Naming

1. **Always dual-track.** Never make your success contingent on one organization's permission. The moment HMBL's gate stayed closed, Thomas had `faithwalklive.com` ready — and the back channel opened *after* he stopped waiting on it.
2. **Deliver before asking.** The intro video was on stream before Thomas had a contract. The tracker was public before ShuggC onboarded him. Every breakthrough followed proof, never pitch.
3. **Match the voice of the room.** The Clippers denial for "AI generated" phrasing was the cost of writing for the wrong audience. In faith communities, plain voice and testimony beat structured pitches — even when the underlying skill is AI.
4. **Hold leverage as service, not hostage.** The $200 domain lockdown only created trust because Thomas never priced it. What you own quietly is worth more than what you brandish.
5. **Never go negative, even when it's earned.** The admin friction was real. The frustration was valid. None of it went public. When ShuggC finally called, he called because Thomas hadn't burned any bridges worth burning.
