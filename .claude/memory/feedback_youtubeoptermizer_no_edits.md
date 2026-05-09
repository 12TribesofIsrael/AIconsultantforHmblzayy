---
name: youtubeoptermizer repo — read-only, ask before any API call
description: Never edit/commit/push to youtubeoptermizer; always ask Thomas explicitly before invoking any of its APIs or running its scripts
type: feedback
originSessionId: 871eb9bf-6c1d-4751-ae46-0df4f8e8b73f
---
The sibling repo at `C:\Users\Claude\youtubeoptermizer` is **read-only context** from this consulting repo. Two hard rules:

1. **Never edit, commit, or push there.** A separate Claude instance (the youtubeoptermizer Claude) owns that workspace. Crossing the line risks merge collisions, accidental scope drift, and breaking that instance's plan-of-record. Same pattern as `feedback_book_repo_no_edits` for `../faithwalkbook`.

2. **Always ask Thomas explicitly before invoking any API or running any script from that repo.** Reading files for context (README, .env.example, script source to see what's possible) is fine. Actually *running* anything — `python scripts/foo.py`, calling Meta Graph, hitting YouTube Data API, posting via X creds, etc. — requires a fresh ask each time. Don't piggyback on a prior approval ("you let me use Meta last week, so…"); each new use needs its own ack.

**Why:** Thomas wants the call surface explicit. APIs there have real-world side effects (post to FB Page, update IG captions, delete YouTube videos), and YouTube/Meta have quota limits. He'll approve readily, but the explicit ask is the gate. Reading the README to *know* "Meta Graph could solve this" is encouraged; pulling the trigger without asking is not.

**How to apply:** When this repo's task hits a wall that an API in youtubeoptermizer could clear (e.g. IG caption behind login wall → Meta Graph; YouTube transcript needed → YouTube Data API), state the option to Thomas in plain language, name the script or endpoint, and wait for his explicit "go." Default-deny on calls; default-allow on reading.

Inventory of what's available: `reference_youtubeoptermizer_apis.md`.
