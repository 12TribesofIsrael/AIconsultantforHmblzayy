---
ended: 2026-04-20
project: ZayAutomations — AI Consulting for Minister Zay / HMBL
branch: main
version: v2.6.0
originSessionId: 370e5003-12aa-4896-8a0e-e42adf54f73b
---
# Last Session — 2026-04-20 (continued)

## What the user wanted
Continue from earlier today's tracker maintenance into a UX-pass on faithwalklive.com — specifically the "Day 26 vs DAY 24 NOW" confusion a new viewer would see — and lock in durable rules so we don't relitigate the same UX questions next time. End-of-day handoff to the laptop for the book project.

## What we did (this half of the day, after the prior /session-end)
- **New-viewer explainer on /map** (faithwalklivecom commit `ed552f9`): added a one-line description under the "Checkpoints (N)" heading. First draft was verbose ("Zay is walking right now…"). User flagged it as too revealing for threat actors. Tightened to neutral marker-label copy (`8a87be1`): "NOW marks the latest checkpoint card. The day in the header is the current day on the walk."
- **Vercel queued-build incident**: `ed552f9` stuck "queued" for 15+ min after push. Diagnosed via GitHub check-suites API. Root cause = `On-Demand Concurrent Builds: Disabled` on the project + a back-to-back push. Empty nudge commit (`57491e6`) cleared it.
- **Verse rotation swap to verbatim 1611 KJV** (`ada14dc`): all 8 entries in [../faithwalklivecom/src/lib/scripture.ts](../faithwalklivecom/src/lib/scripture.ts) replaced with KJV text pulled from `docs/1611KjvW_apocrypha.pdf` via pdftotext. Added "KJV 1611" attribution next to the ref line in [../faithwalklivecom/src/components/ScriptureCard.tsx](../faithwalklivecom/src/components/ScriptureCard.tsx).
- **Day 25 REST as NOW card** (`94a279f`): user surfaced that header "Day 26" + card "DAY 24 NOW" was visually mismatched. Added logic in [../faithwalklivecom/src/components/MapClient.tsx](../faithwalklivecom/src/components/MapClient.tsx) to render the most recent restOnly entry as a NOW card when its day-number > latest walking checkpoint's day-number. Closes gap from 2 days to 1.
- **Map beacon popup synced to same logic** (`5daea4d`): user spotted that map popup still said "NOW — Day 24" while cards said NOW — Day 25. Edited [../faithwalklivecom/src/components/TrackerMap.tsx](../faithwalklivecom/src/components/TrackerMap.tsx) to mirror MapClient's `restOnlyAsNow` logic — popup now reads "NOW — Day 25 · REST · Mt. Vernon · REST DAY 💤" with the placeholder clip link.
- **Stream check via browser skill**: live screenshot of twitch.tv/hmblzayy on Day 26 confirmed ShuggC has NOT adopted the OBS overlay (`faithwalklive.com/obs`) — layout is camera-first with text widgets. User decided to leave it alone (then reversed: drafted a nudge message but did NOT send).

## Decisions worth remembering
- **Public-facing copy stays location-neutral** — saved as durable memory `feedback_public_copy_safety.md`. Don't pair Zay's name + a present-tense motion verb + a city name in any one sentence.
- **NOW card priority** (saved as `feedback_now_card_logic.md`): active rest > archived-rest-ahead-of-walking > latest walking. Never render in-progress walking days as cards (would broadcast destination — same safety rationale).
- **Present only the optimal path, not menus** (saved as `feedback_present_only_optimal.md`). After I offered an A/B for the map popup sync, user told me directly: A was obviously inferior, don't surface non-optimal options going forward. Recommend and ship.
- **Vercel queued-build stalls** are recurring risk because concurrent builds are disabled. If a deploy doesn't appear within 2-3 min, check `gh api repos/12TribesofIsrael/faithwalklive/commits/<sha>/check-suites` and push an empty nudge commit if status="queued".
- **Map popup convention = backward-looking** (NOW = most recent confirmed event). Header convention = forward-looking (current walking day). The 1-day gap between them is structural and acceptable; close it via rest cards, never by surfacing in-progress walking days.

## Open threads / next session starts here
- **User is on the laptop next, working on the book.** Heading to `../faithwalkbook` (private sibling repo per `project_book.md` memory). Source material lives in `book/` (still untracked here).
- **Book WIP still uncommitted** — same as prior session-end: `book/` (with source-material/), `scripts/sync-book.js`, `scripts/lib/book-sync.js`, `docs/1611KjvW_apocrypha.pdf` all untracked; `CLAUDE.md` + `package.json` modified with `book:sync` wiring + the GQL date-cross-reference section. Still needs a v2.7.0 commit when ready.
- **ShuggC nudge message drafted but NOT sent.** Two options were drafted (A: light check-in + setup help offer; B: shorter passive ping). User read them but got pulled into the Day 25 NOW card discussion before sending. Decision pending — ask whether to revive when relevant.
- **Day 25 clip is still the placeholder** ("ZAY ❤️ CHAT WIFEY", 6v). User said they'd come back and pick a real one — don't auto-replace.
- **`update-tracker.js` --date flag** — still doesn't exist; manual confirmations will keep introducing off-by-1 drift on the date convention until added. Worth picking up as a small enhancement.
- **Cross-machine sync round-trip** — tonight is the first real test (this machine → laptop). If `/session-start` on the laptop catches up cleanly, the workflow is validated.

## Uncommitted work (this repo)
```
 M CLAUDE.md
 M package.json
?? book/
?? docs/1611KjvW_apocrypha.pdf
?? scripts/lib/book-sync.js
?? scripts/sync-book.js
```
Diff surface on tracked files: CLAUDE.md +33 (book:sync entry + GQL date cross-reference section), package.json +1.

The faithwalklivecom sibling repo is clean — all 5 commits (`ed552f9`, `57491e6`, `ada14dc`, `8a87be1`, `94a279f`, `5daea4d`) pushed and live on Vercel.
