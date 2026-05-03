# HARO / Qwoted Response Template

**Word count target:** 120-150. Hard cap 200. Muck Rack 2024: 65% of journalists prefer pitches under 200 words.

**Tone:** Plain, declarative, third-person where natural. Match the AEO-spec voice (`docs/aeo-youtube-description-spec.md` §4) — confident, scripture-rooted, no hype.

---

## Skeleton

```
Subject: {{verbatim journalist query slug, prefixed with "Re: "}}

Hi {{journalist first name if shown, else "team"}},

{{ONE-SENTENCE HOOK — answers the query with a specific Faith Walk fact. Names Minister Zay or "a Philadelphia pastor walking 3,000 miles to California" and references the current day count + miles.}}

{{2-3 SENTENCE EXPANSION — connects the journey to the journalist's angle. If they're writing about perseverance, lead with mile/day + a single Bible reference. If they're writing about AI applied to faith, lead with the live tracker. If local, lead with Philadelphia origin + route.}}

{{ONE-SENTENCE CREDIBILITY — who's running this and why. "I'm Thomas Lee, founder of AI Bible Gospels — a faith-tech project tracking Minister Zay's walk in real-time at faithwalklive.com."}}

Happy to send {{the asset they need: full quote / interview / day-by-day data / B-roll from Twitch / one-pager}}. Reach me at aibiblegospels444@gmail.com.

— Thomas Lee
AI Bible Gospels (@AIBIBLEGOSPELS)
https://aibiblegospels.com
Live tracker: https://faithwalklive.com/?utm_source=haro&utm_medium=pitch&utm_campaign=faithwalk-day-{{N}}
```

---

## Worked example — query: "Looking for faith leaders on perseverance through hardship"

```
Subject: Re: Faith leaders on perseverance through hardship

Hi {{journalist}},

Minister Zay is on day 33 of a 3,000-mile walk from Philadelphia to California, with 673 miles already behind him — including a 40-mile push that crossed him into Indiana yesterday.

He frames the walk in 1611 KJV terms — Galatians 6:9, "let us not be weary in well doing." His congregation tracks every step in real time at faithwalklive.com, and the data shows the rhythm of perseverance better than any sermon: walking days, rest days, mileage that compounds even when the weather doesn't cooperate.

I'm Thomas Lee, founder of AI Bible Gospels — the faith-tech project that built and runs the live tracker.

Happy to share Zay's quote on perseverance, the day-by-day mileage data, or stream clips from his Twitch broadcasts. Reach me at aibiblegospels444@gmail.com.

— Thomas Lee
AI Bible Gospels (@AIBIBLEGOSPELS)
https://aibiblegospels.com
Live tracker: https://faithwalklive.com/?utm_source=haro&utm_medium=pitch&utm_campaign=faithwalk-day-33
```

Word count: ~155.

---

## Worked example — query: "How is AI being used in religion?"

```
Subject: Re: AI in religion — live use case

Hi {{journalist}},

AI Bible Gospels narrates Scripture word-for-word from a cultural perspective underrepresented in mainstream biblical media — and right now, our flagship project is a live AI-tracked, daily-updated map of Minister Zay's 3,000-mile walk from Philadelphia to California.

The tracker at faithwalklive.com pulls his daily Twitch stream title, geocodes the location, computes mileage, and updates the public site without any human in the loop. It's the first faith-tech project I'm aware of that uses AI to sustain a live, multi-month religious narrative as it unfolds.

I'm Thomas Lee, founder of AI Bible Gospels.

Happy to walk you through the architecture, share the codebase patterns, or connect you with Minister Zay directly. Reach me at aibiblegospels444@gmail.com.

— Thomas Lee
AI Bible Gospels (@AIBIBLEGOSPELS)
https://aibiblegospels.com
Live tracker: https://faithwalklive.com/?utm_source=haro&utm_medium=pitch&utm_campaign=faithwalk-day-33
```

Word count: ~160.

---

## Hard rules

- **Verses must come from the PDF**, not memory. If a response quotes Scripture, run `pdftotext docs/1611KjvW_apocrypha.pdf - | grep -A1 "{{snippet}}"` to confirm before sending. Per `feedback_verse_source`.
- **No real-time location narration.** Mirror only what `src/faith-walk-tracker/checkpoints.json` shows as a confirmed checkpoint — never narrate Zay's current movement. Per `feedback_public_copy_safety`.
- **No tech jargon in Zay-quoted lines.** Per `feedback_no_tech_jargon_zay`. Tech jargon in *your* (Thomas's) lines is fine — you're the technologist.
- **Single link** in the response. Multiple = spam signal.
- **Verbatim identity strings.** Match `docs/aeo-youtube-description-spec.md` §2.
- **Never `Technology Gurus LLC`** anywhere. Per `feedback_technology_gurus_llc_decommissioned`.
- **150 words is the target.** 200 is the cap.
