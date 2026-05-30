"""Upload Faith Walk content to AI Bible Gospels YouTube channel.

Creates the 'Faith Walk Live — The 3,000-Mile Walk' playlist (or reuses it),
uploads the Day-34 anchor video, and schedules 7 Shorts one per week at 3 PM ET.

Uses credentials from youtubeoptermizer (read-only — no edits to that repo).

Usage:
    python scripts/youtube-content/upload-faithwalk.py           # dry-run
    python scripts/youtube-content/upload-faithwalk.py --live    # upload for real
    python scripts/youtube-content/upload-faithwalk.py --live --anchor-only
    python scripts/youtube-content/upload-faithwalk.py --live --shorts-only
"""
import argparse
import json
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Force UTF-8 output on Windows so emoji in titles don't crash the terminal
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# ── Locate youtubeoptermizer and import its auth-backed client ───────────────

YTO_ROOT = Path(r"C:\Users\Claude\youtubeoptermizer")
sys.path.insert(0, str(YTO_ROOT))

from googleapiclient.http import MediaFileUpload          # noqa: E402  (from google-api-python-client)
from src.youtube.client import YouTubeClient              # noqa: E402

# ── Paths ─────────────────────────────────────────────────────────────────────

REPO_ROOT   = Path(__file__).resolve().parents[2]
SHORTS_DIR  = REPO_ROOT / "assets" / "youtube" / "shorts"
ANCHOR_FILE = REPO_ROOT / "assets" / "youtube" / "day-34-anchor.mp4"
DESC_DIR    = REPO_ROOT / "assets" / "youtube" / "descriptions"
LOG_FILE    = REPO_ROOT / "assets" / "youtube" / "upload-log.json"

PLAYLIST_TITLE = "Faith Walk Live — The 3,000-Mile Walk"

CATEGORY_ID = "22"   # 22 = People & Blogs (better fit than 27=Education for doc content)

TAGS = [
    "Minister Zay", "Humble Zay", "Faith Walk Live", "faithwalklive.com",
    "3000 mile walk", "Philly to California", "AI Bible Gospels",
    "walking documentary", "faith walk", "HMBL",
]

# ── Video metadata ─────────────────────────────────────────────────────────────

def desc(filename: str) -> str:
    """Read a pre-generated description file, strip the header/footer lines."""
    path = DESC_DIR / filename
    if not path.exists():
        return ""
    lines = path.read_text(encoding="utf-8").splitlines()
    # Strip the ─── header block (first 4 lines) and trailing ─── footer
    body = []
    in_body = False
    for line in lines:
        if not in_body:
            if line.startswith("On ") or line.startswith("Day ") or line.startswith("He "):
                in_body = True
                body.append(line)
        elif line.startswith("─"):
            break
        else:
            body.append(line)
    return "\n".join(body).strip()


ANCHOR_META = {
    "file": ANCHOR_FILE,
    "title": "He Was Hit by a Car at Mile 703 — And Kept Walking | Minister Zay's Faith Walk",
    "description": desc("day-34-anchor.txt"),
    "tags": TAGS + ["hit by car", "faith walk incident", "minister zay recovery"],
    "privacy": "public",
    "publish_at": None,   # publish immediately
}

SHORTS_META = [
    {
        "file": SHORTS_DIR / "day-39-short.mp4",
        "title": "He came back to walk after being hit by a car 💪 Day 39 #FaithWalk #Shorts",
        "description": desc("day-39-short.txt"),
        "tags": TAGS + ["Shorts", "comeback"],
        "weeks_out": 1,
    },
    {
        "file": SHORTS_DIR / "day-59-short.mp4",
        "title": "He crossed the Mississippi River on foot 🌊 Day 59 #FaithWalk #Shorts",
        "description": desc("day-59-short.txt"),
        "tags": TAGS + ["Shorts", "Mississippi River"],
        "weeks_out": 2,
    },
    {
        "file": SHORTS_DIR / "day-52-short.mp4",
        "title": "1,000 miles walked. Still going. Day 52 #FaithWalk #Shorts",
        "description": desc("day-52-short.txt"),
        "tags": TAGS + ["Shorts", "1000 miles"],
        "weeks_out": 3,
    },
    {
        "file": SHORTS_DIR / "day-30-short.mp4",
        "title": "1 month. 607 miles. Still walking. Day 30 #FaithWalk #Shorts",
        "description": desc("day-30-short.txt"),
        "tags": TAGS + ["Shorts", "one month"],
        "weeks_out": 4,
    },
    {
        "file": SHORTS_DIR / "day-17-short.mp4",
        "title": "He walked from Philly all the way to Ohio 🦅 Day 17 #FaithWalk #Shorts",
        "description": desc("day-17-short.txt"),
        "tags": TAGS + ["Shorts", "Pennsylvania", "Ohio"],
        "weeks_out": 5,
    },
    {
        "file": SHORTS_DIR / "day-40-short.mp4",
        "title": "Day 40. Indianapolis. 752 miles from Philly 🏙️ #FaithWalk #Shorts",
        "description": desc("day-40-short.txt"),
        "tags": TAGS + ["Shorts", "Indianapolis"],
        "weeks_out": 6,
    },
    {
        "file": SHORTS_DIR / "day-64-short.mp4",
        "title": "1,245 miles walked. He's in Missouri. Day 64 #FaithWalk #Shorts",
        "description": desc("day-64-short.txt"),
        "tags": TAGS + ["Shorts", "Missouri"],
        "weeks_out": 7,
    },
]

# ── Helpers ────────────────────────────────────────────────────────────────────

def schedule_time(weeks_out: int) -> str:
    """Return ISO 8601 UTC for [weeks_out] weeks from now at 3 PM ET (19:00 UTC)."""
    now = datetime.now(timezone.utc)
    drop = now + timedelta(weeks=weeks_out)
    drop = drop.replace(hour=19, minute=0, second=0, microsecond=0)
    return drop.isoformat()


def get_or_create_playlist(yt: YouTubeClient, live: bool) -> str | None:
    """Find existing playlist by title or create it. Returns playlist_id."""
    playlists = yt.list_playlists()
    existing = next((p for p in playlists if p["snippet"]["title"] == PLAYLIST_TITLE), None)
    if existing:
        pid = existing["id"]
        print(f"  ✓ Playlist exists: {pid}")
        return pid
    if not live:
        print(f"  [dry-run] Would create playlist: '{PLAYLIST_TITLE}'")
        return None
    result = yt.create_playlist(
        title=PLAYLIST_TITLE,
        description=(
            "Minister Zay's 3,000-mile walk from Philadelphia to California — "
            "streamed live on Twitch daily. Follow at faithwalklive.com."
        ),
        privacy="public",
    )
    pid = result["id"]
    print(f"  ✓ Created playlist: {pid}")
    return pid


def upload_video(youtube, meta: dict, playlist_id: str | None, yt: YouTubeClient, live: bool) -> str | None:
    """Upload a single video. Returns video_id or None (dry-run)."""
    path = Path(meta["file"])
    size_mb = path.stat().st_size / 1e6 if path.exists() else 0
    publish_at = meta.get("publish_at") or (
        schedule_time(meta["weeks_out"]) if "weeks_out" in meta else None
    )

    privacy = "private" if publish_at else meta.get("privacy", "public")

    print(f"\n  File:     {path.name} ({size_mb:.1f} MB)")
    print(f"  Title:    {meta['title']}")
    print(f"  Privacy:  {privacy}" + (f"  →  public at {publish_at}" if publish_at else "  (public now)"))

    if not path.exists():
        print(f"  ✗ MISSING — render it first. Skipping.")
        return None

    if not live:
        print(f"  [dry-run] Would upload.")
        return None

    body = {
        "snippet": {
            "title": meta["title"],
            "description": meta["description"],
            "tags": meta.get("tags", []),
            "categoryId": CATEGORY_ID,
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": False,
            "madeForKids": False,
        },
    }
    if publish_at:
        body["status"]["publishAt"] = publish_at

    media = MediaFileUpload(str(path), chunksize=4 * 1024 * 1024, resumable=True)
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)
    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            pct = int(status.progress() * 100)
            print(f"  uploading {pct}%...", end="\r")
    video_id = response["id"]
    print(f"  ✓ Uploaded → https://youtu.be/{video_id}")

    if playlist_id:
        yt.add_to_playlist(playlist_id, video_id)
        print(f"  ✓ Added to playlist.")

    return video_id


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--live", action="store_true", help="Actually upload (default: dry-run)")
    ap.add_argument("--anchor-only", action="store_true")
    ap.add_argument("--shorts-only", action="store_true")
    args = ap.parse_args()

    mode = "LIVE" if args.live else "DRY-RUN"
    print(f"\n{'='*60}")
    print(f"  Faith Walk YouTube Uploader — {mode}")
    print(f"  Channel: UCq6hz1xEEd9kL95Kcuof2wQ (AI Bible Gospels)")
    print(f"  Playlist: '{PLAYLIST_TITLE}'")
    print(f"{'='*60}\n")

    yt = YouTubeClient()
    youtube = yt.youtube

    print("[ Playlist ]")
    playlist_id = get_or_create_playlist(yt, args.live)

    log = []

    if not args.shorts_only:
        print("\n[ ANCHOR VIDEO — Day 34 ]")
        vid = upload_video(youtube, ANCHOR_META, playlist_id, yt, args.live)
        if vid:
            log.append({"type": "anchor", "video_id": vid, "title": ANCHOR_META["title"]})

    if not args.anchor_only:
        print("\n[ SHORTS — 7 videos, 1/week ]")
        for i, meta in enumerate(SHORTS_META, 1):
            print(f"\n  Short {i}/7 — week {meta['weeks_out']}:")
            vid = upload_video(youtube, meta, playlist_id, yt, args.live)
            if vid:
                log.append({
                    "type": "short",
                    "video_id": vid,
                    "title": meta["title"],
                    "publish_at": schedule_time(meta["weeks_out"]),
                })

    if log:
        LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
        LOG_FILE.write_text(json.dumps(log, indent=2), encoding="utf-8")
        print(f"\n✓ Upload log saved → {LOG_FILE.relative_to(REPO_ROOT)}")

    if not args.live:
        print(f"\n{'='*60}")
        print("  Dry-run complete. Re-run with --live to upload.")
        print(f"{'='*60}\n")
    else:
        print(f"\n{'='*60}")
        print(f"  ✓ Done. Check YouTube Studio for scheduled drops.")
        print(f"{'='*60}\n")


if __name__ == "__main__":
    main()
