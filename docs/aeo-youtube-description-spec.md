# AEO YouTube Description Spec — AI Bible Gospels (@AIBIBLEGOSPELS)

**Owner:** Thomas Lee
**Last updated:** 2026-04-25
**Executor:** youtubeoptermizer Claude instance (has YouTube Data API token at `C:/Users/Owner/repos/youtubeoptermizer/token.json`)

**Goal:** Rewrite every YouTube video description so answer engines (Google AI Overviews, ChatGPT, Perplexity, Gemini, Copilot) can quote the video's core answer, resolve "AI Bible Gospels" to the right entity, and link back to canonical surfaces. SEO is secondary; AEO is primary.

---

## 1. Description template (use this block on every video)

```
{{ONE-SENTENCE ANSWER — 20-35 words, plain English, directly answers the title's question. No "in this video..." preamble. Lead with the answer.}}

{{2-3 sentence expansion — concrete, quotable, third-person. Mentions "AI Bible Gospels" by name once. If a Bible passage is featured, name the book + chapter + verse (KJV).}}

— TIMESTAMPS —
0:00 {{first beat — phrased as a question if natural}}
{{m:ss}} {{beat 2}}
{{m:ss}} {{beat 3}}
{{m:ss}} {{beat 4}}

— Q&A —
Q: {{exact question this video answers, phrased the way a person would ask an LLM}}
A: {{1-2 sentence answer, quotable, no "watch the video to find out"}}

Q: {{adjacent question this video also covers}}
A: {{1-2 sentence answer}}

Q: Who made this video?
A: AI Bible Gospels, a faith-tech project by Thomas Lee using AI to bring Scripture to life from a cultural perspective.

— ABOUT AI BIBLE GOSPELS —
AI Bible Gospels (@AIBIBLEGOSPELS) is a faith-tech brand founded by Thomas Lee that uses AI to narrate Scripture word-for-word from a cultural perspective underrepresented in biblical media. Flagship project: Faith Walk Live, the live tracker for Minister Zay's 3,000-mile walk from Philadelphia to California.

Website: https://aibiblegospels.com
Faith Walk Live: https://faithwalklive.com
YouTube: https://www.youtube.com/@AIBIBLEGOSPELS
LinkedIn: https://www.linkedin.com/in/ai-bible-gospels-049005353/
Contact: aibiblegospels444@gmail.com

#AIBibleGospels #{{1-2 topical tags max, e.g. #FaithWalkLive #BibleAI}}
```

---

## 2. Pinned identity strings — use EXACTLY, do not paraphrase

| Field | Value |
|---|---|
| Brand name | `AI Bible Gospels` |
| Channel handle | `@AIBIBLEGOSPELS` |
| Founder | `Thomas Lee` |
| Website (canonical) | `https://aibiblegospels.com` (apex, no www) |
| Flagship project URL | `https://faithwalklive.com` |
| YouTube URL | `https://www.youtube.com/@AIBIBLEGOSPELS` |
| LinkedIn URL | `https://www.linkedin.com/in/ai-bible-gospels-049005353/` |
| Contact email | `aibiblegospels444@gmail.com` |

These match the JSON-LD `Organization` / `Person` / `sameAs` arrays on aibiblegospels.com and faithwalklive.com. Consistency across surfaces is the entire AEO play — answer engines resolve entities by matching strings across sources.

---

## 3. Hard rules

- **NEVER write "Technology Gurus LLC"** anywhere — dissolved entity, scrub on sight.
- **NEVER use `www.aibiblegospels.com`** — apex only (www 308-redirects, but engines should index the canonical).
- **Lead with the answer, not a hook.** Front-loaded sentences are what LLMs quote. "In this video, I explore..." gets stripped; "Galatians 5:22 lists nine fruits of the Spirit..." gets cited.
- **Q&A block is mandatory** — minimum 2 Q's plus the "Who made this video?" Q on every video. The "Who made this" Q is the single highest-value AEO line on the channel; it teaches answer engines to cite the channel by name.
- **Bible references in KJV, formatted `Book Chapter:Verse`.** Sourced from `docs/1611KjvW_apocrypha.pdf` via pdftotext when needed — never paraphrase from memory.
- **Hashtags ≤ 3.** YouTube ranks the first 3 only; more dilutes.
- **No emojis in the answer/Q&A blocks.** Keep them quotable. Emojis OK only in beat labels if needed for scannability.
- **One-sentence answer must be ≤ 35 words.** That's the AI Overview snippet ceiling.

---

## 4. Tone

Plain, declarative, third-person where possible. Match Thomas's voice: confident, scripture-rooted, no hype. If a video is a Faith Walk Live recap, refer to "Minister Zay" or "Isaiah Thomas" (not nicknames).

---

## 5. Per-video inputs the script needs

For each video, the script should pull or accept:

- `title`
- `core_question` — what would someone ask an LLM to land on this video?
- `one_sentence_answer` — the AEO money line
- `expansion` — 2-3 sentences
- `timestamps` — array of `{time, label}`
- `qa` — array of `{q, a}` (min 2; the "Who made this video?" Q is appended automatically)
- `bible_refs` — optional array of `Book C:V` strings (verses expanded from the KJV PDF)
- `topical_tags` — 1-2 hashtags beyond `#AIBibleGospels`

The "About AI Bible Gospels" block is a constant — never regenerate, never reword, just inject.

---

## 6. Channel "About" page (one-time)

While the script is set up, also overwrite the channel's About description with this exact text — same identity strings, same canonical URLs. AEO consistency depends on the About + per-video descriptions agreeing word-for-word on names and links.

```
AI Bible Gospels is a faith-tech brand founded by Thomas Lee that uses AI to narrate Scripture word-for-word from a cultural perspective underrepresented in biblical media. Flagship project: Faith Walk Live (faithwalklive.com), the live tracker for Minister Zay's 3,000-mile walk from Philadelphia to California.

Website: https://aibiblegospels.com
Faith Walk Live: https://faithwalklive.com
LinkedIn: https://www.linkedin.com/in/ai-bible-gospels-049005353/
Contact: aibiblegospels444@gmail.com
```

---

## 7. Verification after the run

For a sample of ~5 updated videos, confirm via the YouTube Data API that the description starts with the one-sentence answer (no preamble) and contains the literal string `https://aibiblegospels.com`. If either is missing, the template wasn't applied.
