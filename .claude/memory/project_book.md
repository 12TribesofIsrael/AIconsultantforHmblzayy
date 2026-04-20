---
name: Book project — Faith Walk documentation
description: Zay asked Thomas on stream Apr 19 to write a book documenting the process. Scope, structure, and intake status.
type: project
originSessionId: 6b00209d-4126-4980-ad9c-a95844690ff8
---
## Origin

**Apr 19, 2026 (Day 25 of Faith Walk):** Zay gave Thomas a shoutout on Twitch and directly asked him to start writing a book documenting the process.

## Scope

Two parallel journeys:
1. Zay's Faith Walk (3,000 mi Philly → Cali, daily Twitch stream)
2. Thomas's parallel: weight journey (206 lb at walk start → 200 lb Apr 19 → 175 lb goal) + consulting work (all the tools shipped for the Walk) + strategic arc (gatekeepers → ShuggC back channel → shoutout)

**Why:** Direct ask from Zay himself, not speculative. This is the highest-priority long-form deliverable now.

**How to apply:** Every new Walk milestone, deliverable, DM, or personal weight check-in should be logged live to `book/source-material/*.md` — the book is written in real time, not reconstructed later. When I encounter any of those events in future conversations, update the relevant source file.

## Structure on disk — TWO-REPO SPLIT

**Private book repo (`../faithwalkbook`, github.com/12TribesofIsrael/faithwalkbook — PRIVATE):**
- `README.md`, `outline.md`, `NEED-FROM-YOU.md` — the book itself
- `chapters/` — draft chapters (to be created Phase 2)
- `personal/` — weight journey, photos, private notes (to be created after intake)
- `source-material/` — SYNCED FROM consulting repo, read-only downstream copy

**Consulting repo (this one, `AIconsultantforHmblzayy`):**
- `book/README.md` — pointer to the private repo + explains the sync
- `book/source-material/deliverables-timeline.md` — agent-mined, v1.0.0 → v2.6.0
- `book/source-material/faith-walk-timeline.md` — agent-mined, Day 1 → Day 25
- `book/source-material/strategic-timeline.md` — agent-mined, cold pitch → shoutout
- `scripts/sync-book.js` + `scripts/lib/book-sync.js` — mirror source-material/ into `../faithwalkbook`
- npm command: `npm run book:sync`

**Rule:** source material is written/updated in this repo (derived from git log, checkpoints, changelog). Chapter drafts, personal notes, and intake responses all live ONLY in the private repo. Never write chapter drafts or weight data into the consulting repo.

## Key facts to preserve

- **Thomas's weight: 206 lb at Walk start → 200 lb on Apr 19 → 175 lb goal.** This is the parallel narrative.
- **Book tone:** first-person (Thomas), respectful of all parties including gatekeepers (Kiki, Cierra), faith-forward without preaching.
- **Sensitivity:** assume Zay/ShuggC/HMBL team will eventually read it. No scores settled. ShuggC himself acknowledged admin dysfunction so that's defensible to reference.
- **Chapters 1, 2, 11 are the first drafts to attempt** once intake arrives — highest-density, most emotionally weighted.

## Open data gaps flagged by research agents

1. Day 17 Beaver Falls (~53 mi) flagged `estimatedMiles: true` — verify against Twitch VOD
2. Day 21 (Canton) + Day 22 (Wilmot) both dated `Apr 16, 2026` in checkpoints.json — tooling bug, fix before book references the dates
3. Day 19 rest-day rollover handled in v2.4.1 but book narrative should reflect the correction

## Status as of Apr 19

Phase 1 complete: agents mined source material, outline drafted, intake doc sent to Thomas. Awaiting responses on Priority 1 (shoutout transcript), Priority 2 (weight journey), Priority 3 (Thomas's "why"). Nothing written into `book/chapters/` yet.
