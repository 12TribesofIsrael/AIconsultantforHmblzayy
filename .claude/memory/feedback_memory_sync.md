---
name: Memory sync workflow (laptop ↔ desktop)
description: Thomas works on two machines. Always remind about memory:push before commit and memory:pull after git pull, because Claude memory lives outside the repo.
type: feedback
originSessionId: 6d9e3e26-aeb7-4150-92b7-f5d0095481a8
---
Thomas works on both laptop and desktop. Claude's auto-memory at `~/.claude/projects/c--Users-Owner-zayautomations/memory/` does NOT follow git — it's per-machine. The repo mirrors memory at `.claude/memory/` via `scripts/memory-sync.js`, exposed as three npm scripts:

- `npm run memory:push` — local `~/.claude/...` → repo `.claude/memory/` (run before `git commit`)
- `npm run memory:pull` — repo `.claude/memory/` → local `~/.claude/...` (run after `git pull`)
- `npm run memory:status` — diff both locations (shows SAME / DIFF / REPO ONLY / GLOBAL ONLY)

The user's root-level [DONT_FORGET.md](DONT_FORGET.md) documents this workflow in the repo.

**Why:** Without this, any memory I write on one machine is invisible on the other, defeating the purpose of memory. Thomas asked for this explicitly on 2026-04-14 after realizing memory lived only on the current machine.

**How to apply:**
1. Whenever I write/update a memory file during a session, remind Thomas to run `npm run memory:push` before the session's final `git commit`.
2. Whenever a session starts with `git pull` (or after he mentions switching machines), remind him to run `npm run memory:pull` right after.
3. If he forgets and commits without pushing memory, the repo `.claude/memory/` will drift — call it out proactively, don't wait for him to notice. The pattern is: "I added a memory this session — before you commit, `npm run memory:push`".
