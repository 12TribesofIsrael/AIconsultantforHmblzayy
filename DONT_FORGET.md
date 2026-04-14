# DON'T FORGET

Things I need to remember every time I touch this repo.

---

## Memory sync (laptop ↔ desktop)

Claude's auto-memory lives at `~/.claude/projects/c--Users-Owner-zayautomations/memory/` on each machine — **git does NOT track it by default.** The repo's `.claude/memory/` folder is the shared mirror.

**Before `git commit`** (if memory changed this session):
```bash
npm run memory:push      # local ~/.claude/... -> .claude/memory/ (repo)
```

**After `git pull`** (on whichever machine you just switched to):
```bash
npm run memory:pull      # .claude/memory/ (repo) -> local ~/.claude/...
```

**Anytime, to see drift:**
```bash
npm run memory:status
```
Shows `SAME / DIFF / REPO ONLY / GLOBAL ONLY` per file. If everything says `SAME`, you're in sync.

---

## Tracker workflow reminders

- **Daily driver** is `npm run tracker:from-title` — reads Zay's live Twitch title, annotates in-progress days, auto-promotes on day rollover with `~` estimate marker.
- **Manual confirmed arrival** via `npm run tracker:update -- --day N --location "City, ST" --miles M` — this strips the `~` estimate flag.
- **Rest days** are detected from `REST DAY` in the title; the tracker shows a virtual "Day N REST DAY 💤" card appended to the row. Day N-1's card stays visible with its walk clip.
- **Clips** on rest days: `npm run tracker:update -- --day N --clip "https://..."` where N matches the current `inProgressDay`.
- **Never lie about position** — map pin stays on last *confirmed* arrival. Heading-to is shown as a dashed forward line + popup annotation, never by moving the pin.

---

## Before every commit

1. `git status` — sanity check what's changing.
2. If memory was touched this session: `npm run memory:push` first.
3. Commit + push normally.

## After every pull (fresh machine or after pulling from the other one)

1. `git pull origin main`
2. `npm run memory:pull` — hydrate Claude memory on this machine.
3. `npm run memory:status` — confirm `SAME` across the board.
