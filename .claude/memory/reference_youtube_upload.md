---
name: reference_youtube_upload
description: "YouTube upload tooling for AI Bible Gospels — channel ID, playlist, upload script location"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 80a7ef83-8594-4e0d-b292-82c168ed87d9
---

**Channel:** AI Bible Gospels — `UCq6hz1xEEd9kL95Kcuof2wQ`
**OAuth credentials:** `C:\Users\Claude\youtubeoptermizer\credentials.json` + `token.json` (authed as `aibiblegospels444@gmail.com`)
**Upload script:** `scripts/youtube-content/upload-faithwalk.py` in the consulting repo — imports YouTubeClient via `sys.path.insert(0, str(Path(r"C:\Users\Claude\youtubeoptermizer")))` (read-only borrow)

Usage:
```bash
python scripts/youtube-content/upload-faithwalk.py           # dry-run
python scripts/youtube-content/upload-faithwalk.py --live    # upload
python scripts/youtube-content/upload-faithwalk.py --live --anchor-only
python scripts/youtube-content/upload-faithwalk.py --live --shorts-only
```
