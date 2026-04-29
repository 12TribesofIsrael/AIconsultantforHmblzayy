---
name: Anointed Bible Video Maker
description: Thomas's AI video product — paste scripture or any script, get a narrated cinematic video. LIVE at anointed.app since Apr 29, 2026; second flagship under AI Bible Gospels brand.
type: user
originSessionId: 55dd7ad2-f536-4c2e-9a8d-4d236edb01ef
---
**Product name:** Anointed (originally pitched as "Anointed Bible Video Maker")

**Live URL:** https://anointed.app (and www.anointed.app) — Modal-deployed FastAPI app fronted by a Cloudflare Worker reverse-proxy (`anointed-proxy`, see `C:\Users\Claude\ai-bible-gospels\ops\cloudflare-proxy/`). Modal upstream: `https://tribesofisrael--ai-bible-gospels-web.modal.run`. Basic-Auth gated. The Worker is on Cloudflare Free; Modal Custom Domains is paid-plan-gated and Thomas is on Starter, so the Worker handles the custom-domain routing for free.

**What it does:** Two production workflows on a unified web app:
- **Scripture Mode** (`/`) — paste raw KJV scripture; text cleaner strips verse numbers and OCR artifacts → Claude AI generates per-scene image prompts + motion + lighting → FLUX Pro renders images → Kling animates them → JSON2Video assembles with ElevenLabs narration + subtitles. Outputs 16:9 / 1:1 / 9:16. ~$4.50–7.00 per video, 10–20 min render.
- **Custom Script Mode** (`/custom`) — same pipeline, but for any script/concept. Dynamic scene count. Sermons, channel trailers, mission updates, anything written.

Both have aspect-ratio picker, ElevenLabs voice picker, scene preview/edit before rendering, batch fix, stop/retry, render history. Local-only post-production (FFmpeg intro/outro/logo overlay) and YouTube upload are bonus modes.

**Pitch tagline (Thomas's own words):** *"Have you ever wanted to see what the Bible looks like in color? Here's the anointing: pick a Bible verse, pick a script, and generate a video — share with your kids or whomever."*

**Public-page tagline (aibiblegospels.com):** *"A video production platform for ministers and creators. Paste in text — scripture or your own script — and get back a narrated, cinematic video, ready to post."*

**Status (as of 2026-04-29):** ✅ LIVE at anointed.app, production v13. Featured as second flagship on aibiblegospels.com next to Faith Walk Live (commit `9af3fcb` on aibiblegospelscom).

**Strategic significance:**
- This was the **actual "play"** Thomas referenced to Zay in the Apr 19 rest-day stream chat ("I'm working on a play right now that I never thought was possible") — the phrase that triggered Zay's "write a book" shoutout. Zay heard "weight-loss book"; Thomas was actually pitching this.
- Now anchors the AI Bible Gospels brand with Faith Walk Live: AI Bible Gospels = Thomas's faith-tech ministry shipping (1) tools-for-others (Faith Walk Live, built for Zay) and (2) products-for-self (Anointed, Thomas's own commercial asset).

**How to apply:**
- When the user mentions "the play" / "my play" / "the Anointed app" — it's this.
- For aibiblegospels.com content work: Anointed is the second hero. Visit anointed.app + "See videos made with it" → @AIBIBLEGOSPELS YouTube are its primary CTAs on the parent site.
- Distinct from Faith Walk consulting work (tools for Zay) — this is Thomas's own commercial asset.
- Distinct from the book (Zay's ask, weight-loss framing) — book parallels, doesn't replace.
- Source repo: `C:\Users\Claude\ai-bible-gospels` (NOT a sibling of the hblfaithwalk workspace; lives at a different parent dir on the local machine).
