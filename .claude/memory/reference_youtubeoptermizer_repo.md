---
name: youtubeoptermizer repo — Thomas's social API stack
description: Production-ready API plumbing at C:/Users/Claude/youtubeoptermizer for YouTube/IG Business/FB Page/X — leverage before building new automations.
type: reference
originSessionId: 5a8e6a15-7323-481c-a002-83c5a3ec0ad7
---
Thomas's social-API workshop lives at `C:/Users/Claude/youtubeoptermizer` (GitHub: `12TribesofIsrael/youtubeoptermizer`). Before proposing any new IG/FB/YT/X automation, **check what's already wired here** — most of the auth/API plumbing already exists.

## Production-ready APIs

| Surface | Status | Token / Library |
|---|---|---|
| **YouTube Data API v3** | ✅ Production | OAuth 2.0, full read-write — list/update/delete videos, playlists, analytics, thumbnails |
| **Instagram Business** | ✅ Production (approved 2026-04-27) | `IG_BUSINESS_TOKEN`, `INSTAGRAM_BUSINESS_ID`, `graph.instagram.com/v22.0` — captions, pinned comments, bio. Caption updates require `comment_enabled=true`. |
| **Facebook Page** | ✅ Production | `META_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID`, `graph.facebook.com` — page posting, captions |
| **Twitter/X** | Partial | `twitter-post.py` + `src/social/twitter.py` exist; verify token state before relying |
| **TikTok** | ⏳ App review pending | Multiple `tiktok-prod-*-check.json` artifacts in repo — not production-ready |

## Existing automation already running

The AEO bulk-update scripts (`aeo-bulk-update.py`, `aeo-fb-bulk-update.py`, `aeo-ig-bulk-update.py`) **already inject `Faith Walk Live: faithwalklive.com` into every IG/FB/YT caption** on the @AIBIBLEGOSPELS account. Passive distribution layer running today. Don't duplicate.

`aeo-ig-pin-comment.py` exists for pinned-comment automation on IG.

## Web app

`app.py` is a FastAPI dashboard with routes in `src/routes/` — `analytics.py`, `audit.py`, `dashboard.py`, `playlists.py`, `settings.py`, `social.py`, `tools.py`, `videos.py`. Social posting endpoints at `/api/social/post` for FB/Twitter.

## When to use this repo

- Need to push something to IG/FB/YT — extend an existing script, don't write a new auth flow
- Need to verify what's published / pull analytics — use existing client modules
- Adding a new automation that touches @AIBIBLEGOSPELS surfaces — host it here, not in the consulting repo

## When NOT to use

- Anything that engages with Zay's accounts or any third-party — see `feedback_no_third_party_auto_engagement.md`
- TikTok posting — wait for app-review approval

## Brand identity rules locked in this repo

`CLAUDE.md` carries strict character-depiction rules (melanated Black/African American figures with wool-textured hair for all biblical characters; explicit negative prompts to override AI defaults) and brand-color/font rules. Apply when generating any visual content from this repo's pipeline.
