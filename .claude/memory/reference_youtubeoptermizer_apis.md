---
name: youtubeoptermizer repo — API access available
description: Sibling repo at C:\Users\Claude\youtubeoptermizer holds working credentials for YouTube/Meta/X/TikTok/Anthropic; ask before using
type: reference
originSessionId: 871eb9bf-6c1d-4751-ae46-0df4f8e8b73f
---
Sibling workspace: `C:\Users\Claude\youtubeoptermizer`. AI Bible Gospels' YouTube/social toolkit. Has live, working credentials in `.env` and `credentials.json` / `token.json`:

- **YouTube Data API v3** — channel audits, video metadata, captions, transcripts, thumbnail upload, playlist mgmt (full OAuth via `scripts/connect.py`)
- **Meta Graph API** — Facebook Page + Instagram Business (token + `FACEBOOK_PAGE_ID` + `INSTAGRAM_BUSINESS_ID`). Can post, update captions, and likely use Business Discovery to read other public Business/Creator IG accounts (e.g. @ministerzay)
- **X API v2** — `TWITTER_API_KEY/SECRET/ACCESS_TOKEN/SECRET` (separate from this repo's own X creds — that one is the daily walk-poster)
- **TikTok API** — `TIKTOK_CLIENT_KEY/SECRET/ACCESS_TOKEN`
- **Anthropic Claude API** — `ANTHROPIC_API_KEY` (used by `aeo-yt-phase-b.py` for AEO content gen)

Scripts inventory in repo's `README.md`. Common ones: `scripts/full-audit.py`, `scripts/channel-status.py`, `scripts/facebook-post.py`, `scripts/meta-update-posts.py`, `scripts/extract-transcripts.py`, `scripts/check-quota.py`.

When to reach for it from this repo:
- Need to read an IG post caption / engagement / comments → Meta Graph API
- Need YouTube channel/video metadata or transcripts for AI Bible Gospels content → YouTube Data API
- Need to verify an X handle's recent posts beyond what `scripts/x-daily-post.js` covers → X API
- Need TikTok metadata or scheduled post → TikTok API
- Need a Claude API call from a Python pipeline (rather than Node) → Anthropic key

Hard rule for using it: see `feedback_youtubeoptermizer_no_edits.md`.
