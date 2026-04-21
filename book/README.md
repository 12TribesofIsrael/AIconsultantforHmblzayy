# book/ — Source Material Only

**The book itself lives in a separate private repo: `../faithwalkbook` (github.com/12TribesofIsrael/faithwalkbook — private).**

This folder contains only the **source-material** that feeds the book — timelines and research mined from *this* consulting repo's git history, checkpoints, and changelog. That material is derived from code and data that already live here, so it stays here and is mirrored downstream into the book repo via:

```bash
npm run book:sync
```

## What's here

- `source-material/deliverables-timeline.md` — Every tool Thomas shipped, v1.0.0 → v2.6.0
- `source-material/faith-walk-timeline.md` — Zay's walk, day by day
- `source-material/strategic-timeline.md` — Relationship/strategic arc through today

## What's NOT here (lives in the private book repo)

- Chapter drafts
- Outline / voice notes / working titles
- Thomas's personal weight journey + daily logs
- Private reflections / intake notes
- Photos and screenshots

## Workflow

1. Walk/build happens → this repo updates (commits, checkpoints, scripts)
2. If the update is "book-worthy", re-mine or append to `source-material/*.md` here
3. Run `npm run book:sync` — mirrors `source-material/` into `../faithwalkbook/source-material/`, commits, pushes
4. Chapter drafting happens in `../faithwalkbook/chapters/` using the synced material as reference
