# Day 39 — pending clip re-attach

**Status:** parked. Detached from the Day 34 (Apr 28, strike-day) record on May 3, 2026 because the public `/clips` archive was rendering them with Day 34 metadata ("Day 34 · Apr 28 · Lewisville · Indiana Welcomed Him") — wrong attribution and a violation of the `feedback_now_card_logic` rule (no in-progress days on public surfaces).

Re-attach tomorrow morning once `tracker:from-title` archives Day 39 to its own walking checkpoint (when Zay's Day 40 stream title posts).

## One-line re-attach command

```bash
node scripts/update-tracker.js --day 39 \
  --clips "https://www.twitch.tv/hmblzayy/clip/InspiringCrepuscularChickenOMGScoots-DFhNRIhPJ7z1VWrc,https://www.twitch.tv/hmblzayy/clip/TenuousZealousPonyWutFace-lIumwXODWl7x4FWO,https://www.twitch.tv/hmblzayy/clip/TawdrySpoopyTitanItsBoshyTime--PhK1Xq2iH44dDzR" \
  --clips-title "Indiana welcomed him"
```

After re-attach, delete this file.

## Underlying gap (v2.15.x patch candidate)

The clips were attached to Day 34 because `update-tracker.js` matches by `cp.day === N` and the only walking record at the time was Day 34 (Day 39 was annotated as `inProgressDay: 39` on Day 34, not its own entry). The rollover logic in `update-tracker.js` only auto-promotes a separate `inProgressClip` field — it does NOT migrate `clip`/`clips`/`clipsTitle` from the in-progress source to the new day. Two real fixes worth bundling:

1. When `--day N` is passed and `cp.inProgressDay === N` exists on a different record, attach to a `inProgressClips` / `inProgressClipsTitle` field on that record instead of `clips`.
2. Teach the rollover (in `update-tracker.js` new-day mode) to promote `inProgressClips` / `inProgressClipsTitle` to `clips` / `clipsTitle` on the new entry, mirroring the existing `inProgressClip` → `clip` flow.

That makes this class of bug structurally impossible.
