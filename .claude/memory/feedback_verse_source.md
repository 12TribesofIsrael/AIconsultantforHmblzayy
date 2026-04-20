---
name: Verse-of-the-day source
description: Always quote walk-of-the-day verses directly from the in-repo 1611 KJV with Apocrypha PDF, not from memory or web sources
type: feedback
originSessionId: 370e5003-12aa-4896-8a0e-e42adf54f73b
---
When picking a verse for any "verse of the day" / walk-of-the-day post (tracker, faithwalklive.com, social, book, OBS overlay), quote **directly from the 1611 King James Version with Apocrypha** PDF in this repo at `docs/1611KjvW_apocrypha.pdf` (916 pages, public domain, DaVince Tools edition). Use `pdftotext -f <page> -l <page> docs/1611KjvW_apocrypha.pdf -` to extract the exact wording — verse markers come out as `{chapter:verse}`.

**Why:** Brand alignment with AI Bible Gospels (1611 KJV-with-Apocrypha is the source-of-record for that channel) and Faith Walk content. Modern translations and from-memory paraphrases drift from the canonical wording the user trusts. The Apocrypha (Tobit, Judith, Wisdom, Sirach, 1-2 Maccabees, etc.) is in this edition and is fair game — many modern Bibles drop those books.

**How to apply:** Before publishing or recommending any verse, run pdftotext on the relevant page range and copy the text verbatim. Reference page numbers from the PDF table of contents (Sirach starts p.599, Psalms p.309, Matthew p.733, etc.). Do not synthesize from training memory.
