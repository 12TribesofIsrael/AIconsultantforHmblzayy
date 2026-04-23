# ZayAutomations

AI automation consulting project for Minister Zay (Isaiah Thomas) — founder of HMBL / Stay Humble Stay Hungry Clothing.

**Flagship deliverable:** [Faith Walk Live](https://faithwalklive.com) — live companion site for the 3,000-mile Philly → Cali Faith Walk.
**Builder:** [AI Bible Gospels](https://aibiblegospels.com) · [@AIBIBLEGOSPELS on YouTube](https://www.youtube.com/@AIBIBLEGOSPELS)

## What This Is
Research, automations, and content tools built to support the HMBL brand and movement.

## Structure
- `research/` — Social media research and client profiles
- `assets/` — Media assets for video/content production
- `scripts/` — Automation and build scripts
- `src/` — Source code for automation features
- `docs/` — Proposals and documentation

## First Deliverable
Looping intro video — Minister Zay walking state to state with music behind it.

## Daily tracker workflow

The Faith Walk tracker has **two states per day**: *in-progress* (Zay is walking toward a city, dashed line) and *confirmed* (Zay arrived, solid line). Both states auto-sync to [faithwalklive.com](https://faithwalklive.com) via the sibling repo.

**Timing rule:** only update in the morning (start of walk) or end of night. Never mid-day — the in-progress display shows planned destination only (which Zay announces publicly), never his real-time position.

### 1. Morning — set in-progress from the Twitch title

When Zay goes live, his stream title announces the day and destination, e.g.:

```
DAY 29 | WALKING 3000 MILES -> CALI 🌴 | 26 MILES FROM LONDON, OHIO | FAITH WALK
```

Run:

```bash
npm run tracker:from-title
```

This reads the live title, archives the previous day if needed, and marks today's destination as in-progress (dashed line). It's idempotent — safe to re-run. Supported title formats:

- `DAY N | X MILES FROM CITY, ST` — destination + remaining miles (state code **or** full state name)
- `DAY N | X MILES TO CITY` — same, alternate preposition
- `DAY N | LOCATION: CITY, ST | Y MILES COMPLETED` — explicit location + total miles
- `DAY N | REST DAY` — marks the day as rest, no movement

### 2. End of night — archive with confirmed arrival

Once Zay arrives, lock it in with the real miles walked and a clip:

```bash
npm run tracker:update -- --day 29 --location "London, OH" --miles 28 --clip "https://www.twitch.tv/hmblzayy/clip/..."
```

This clears the estimate flag, drops the solid line, and syncs to faithwalklive.com. Pick the highest-view faith-aligned clip from `https://www.twitch.tv/hmblzayy/clips` for that date — or backfill later with `--clip` only.

### 3. Watch mode (optional)

```bash
npm run tracker:watch
```

Runs `tracker:from-title` every 30 minutes. Useful if you want the tracker to catch title changes during a long day without re-running by hand.

### If the title parser rejects a title

The script logs `Title incomplete: day=X restDay=... dest=... miles=...` when it can't extract enough to act. Common causes:

- Title uses a format not in the list above (add an example + regex in [scripts/lib/twitch.js](scripts/lib/twitch.js))
- Day number missing (the parser requires `DAY N`)
- Manual fallback: `npm run tracker:update -- --day N --location "City, ST" --miles X` (confirmed) bypasses the parser entirely.
