---
name: AEO is primary intent for AI Bible Gospels content surfaces
description: Across YouTube descriptions, channel About, llms.txt, JSON-LD, and any future content surface — AEO (answer-engine quotability + entity resolution) outranks SEO; identity strings must match verbatim across surfaces
type: project
originSessionId: session-end-2026-04-25
---
On 2026-04-25 Thomas finalized the AEO strategy for AI Bible Gospels: across YouTube video descriptions, the channel About page, `llms.txt` files on aibiblegospels.com + faithwalklive.com, JSON-LD `Organization`/`Person`/`sameAs` arrays, and any future content surface — **AEO is the primary intent, SEO is secondary**.

**Why:** Answer engines (Google AI Overviews, ChatGPT, Perplexity, Gemini, Copilot) resolve entities by matching strings across sources. If "AI Bible Gospels" is written one way on YouTube and another way on the website, the entity doesn't resolve and the channel doesn't get cited. Front-loaded one-sentence answers are what LLMs quote; preamble ("In this video...") gets stripped. The "Who made this video?" Q&A line teaches answer engines to cite the channel by name.

**How to apply:**
- The canonical YouTube spec is `docs/aeo-youtube-description-spec.md` — never re-derive from scratch; read that file.
- Pinned identity strings (must match verbatim across ALL surfaces):
  - Brand: `AI Bible Gospels`
  - Handle: `@AIBIBLEGOSPELS`
  - Founder: `Thomas Lee`
  - Website: `https://aibiblegospels.com` (apex, no www)
  - Flagship: `https://faithwalklive.com`
  - YouTube: `https://www.youtube.com/@AIBIBLEGOSPELS`
  - LinkedIn (personal `/in/`): `https://www.linkedin.com/in/ai-bible-gospels-049005353/`
  - Contact: `aibiblegospels444@gmail.com`
- Before publishing/editing any new content surface (new page on aibiblegospels.com, new sibling repo, press kit, pitch deck), grep for these strings and confirm they appear EXACTLY as written above.
- Hard "never": never write "Technology Gurus LLC" (dissolved); never use `www.aibiblegospels.com` (apex only); ≤3 hashtags; one-sentence answers ≤35 words.
- Cross-repo execution lives in `youtubeoptermizer` (which holds the YouTube Data API token at `token.json`); this repo holds the spec, that repo applies it.
