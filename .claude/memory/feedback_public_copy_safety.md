---
name: Public-facing copy stays location-neutral
description: On faithwalklive.com (and any other Zay-facing public surface), keep helper/explainer copy neutral — identify UI markers, don't narrate his current location or real-time movement.
type: feedback
originSessionId: 370e5003-12aa-4896-8a0e-e42adf54f73b
---
When writing helper text, legends, tooltips, or any explainer copy for **public-facing** Faith Walk surfaces (faithwalklive.com homepage, /map, /clips, OBS overlay, social embeds, etc.), keep the language **location-neutral and label-only**. Identify what UI markers mean — don't narrate where Zay is, what he's doing, or how recently he was somewhere.

**Avoid phrases like:**
- "Zay is walking right now"
- "the spot he actually arrived at"
- "currently in [city]"
- "live position"
- Anything that pairs his name + a verb of motion + a city name in one sentence

**Prefer phrases like:**
- "NOW marks the latest checkpoint card"
- "The day in the header is the current day on the walk"
- "Latest position" or just the marker label itself

**Why:** The underlying data (city, miles, stream) is already public — but copy that *narrates* real-time movement makes the page friendlier to someone scanning aggregators or search results for his current physical position. Same protective posture as the existing tracker-timing rule (only update end-of-night/morning, never mid-day). The data layer can't be hidden while running a live tracker, but the *prose layer* can stay neutral. Caught this when the verbose "new viewer" explainer on /map was reviewed and the user flagged it as too revealing of intent.

**How to apply:** Before shipping any public-facing copy on faithwalklive or its peers, read it as if you were a stranger looking for Zay. If a single sentence pairs his name + a present-tense motion verb + a recognizable place, rewrite. Use neutral marker labels. The neutral version still gives new viewers the disambiguation they need (which "Day N" matches which UI element) without amplifying real-time-tracking signal.
