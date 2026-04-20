---
name: Session handoff workflow
description: User uses /session-end + /session-start skills for context continuity across Claude instances; wait for explicit trigger, never auto-invoke.
type: feedback
originSessionId: 02ee88c0-ea7d-4246-8fef-264b4f855c7d
---
User runs `/session-end` when wrapping and `/session-start` when resuming (possibly on a different machine). The rolling handoff log lives at `LAST_SESSION.md` in this auto-memory dir.

**Why:** Eliminates the "review the codebase and catch up" ritual every fresh instance. User explicitly asked for this pattern on 2026-04-20, modeled on Anthropic auto-memory best practices.

**How to apply:**
- Never auto-invoke either skill. User triggers both explicitly.
- On session start, if the user says anything like "catch up" / "where are we" / "session start" — invoke `/session-start` (or the equivalent catch-up flow) before proceeding.
- On session end, if the user says "wrap up" / "save progress" / "session end" — invoke `/session-end`.
- If user pairs `/session-start` with a follow-up intent in the same turn ("session-start and keep going on the book"), do the catch-up then roll straight into the work.
- Respect the cross-machine flow: remind about `npm run memory:push` after `/session-end`, and `npm run memory:pull` before `/session-start` on a fresh machine. Don't run git for them — shared state needs explicit approval.
