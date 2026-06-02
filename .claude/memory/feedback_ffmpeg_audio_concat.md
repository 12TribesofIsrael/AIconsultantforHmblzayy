---
name: feedback_ffmpeg_audio_concat
description: FFmpeg concat fails silently when mixing video-only and video+audio segments — always add silent audio to lavfi color cards
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 80a7ef83-8594-4e0d-b292-82c168ed87d9
---

When building multi-segment videos via `ffmpeg -f concat`, ALL segments must have the same stream types. If title cards are generated from `lavfi color=` source without an audio input, they are video-only — the concat will either fail or produce a video with no audio in those sections.

**Fix:** Always add a silent stereo audio track to lavfi color cards:
```bash
ffmpeg -y -f lavfi -i "color=black:size=1920x1080:rate=30,..." \
       -f lavfi -i "aevalsrc=0:c=stereo:s=44100" -t "$duration" \
       -c:v libx264 -c:a aac -b:a 128k -shortest \
       out.mp4
```

**Why:** Discovered when the Day-34 anchor video (Jun 2, 2026) uploaded with silent title card sections. Had to delete from YouTube and re-upload after fix.

**How to apply:** Any time building a concat video that mixes lavfi-generated cards with real footage clips — always add `aevalsrc=0` to the cards first.
