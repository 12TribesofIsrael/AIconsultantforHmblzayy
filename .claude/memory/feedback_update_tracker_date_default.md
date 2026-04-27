---
name: update-tracker.js dates default to today
description: When promoting a day with update-tracker.js, the date field defaults to today — but the day usually happened yesterday. Always verify and fix.
type: feedback
originSessionId: 06707caa-bc90-46a2-a67c-ea7dece7ea62
---
When you run `node scripts/update-tracker.js --day N --location ... --miles ...`, the script writes `date: <today>` for the new checkpoint. But you almost always run this AFTER the day completed, so Day N actually happened *yesterday* (or earlier). The clip timestamp is the source of truth.

**Why:** This already caused date drift on Days 5–10 + 16 (fixed in v2.4.0) and again on Day 31 in this session — the day was Apr 25 but the script wrote Apr 26. CHANGELOGs are frozen, so the fix lives in checkpoints.json only.

**How to apply:** After any `update-tracker.js --day N` run, check the new checkpoint's `date` field against the clip's `createdAt` (UTC). If they don't match, edit `src/faith-walk-tracker/checkpoints.json` directly to correct the date before rebuild + push. The Twitch GQL clip query (see CLAUDE.md "Date / clip cross-reference" section) is the canonical date check.

If a day is being promoted retroactively (yesterday's arrival, not today's), pass the correct date via the script if it accepts one — otherwise edit JSON immediately after.
