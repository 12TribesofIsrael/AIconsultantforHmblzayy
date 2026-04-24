---
name: 4-agent ROI check on new concepts
description: When the user introduces any substantive new direction without prior repo research, ask first then run 4 parallel agents (Reddit, YouTube, X, case-study blogs) answering 5 ROI questions, delivered as 4 separate stitched reports
type: feedback
originSessionId: 914ec957-121e-4464-b2ef-cae3169e5d4f
---
When the user introduces **any substantive new direction** (new tactic, tool, concept, feature, deliverable, content play, product pitch, growth loop, workflow, automation) and we don't already have research on it in this repo:

1. **Ask first:** *"Want me to run the 4-agent ROI check on this?"* — do not auto-fire.
2. If yes, spin up **4 sub-agents in parallel**: Reddit, YouTube, X/Twitter, case-study blogs.
3. Each agent answers the same 5 questions: Is it worth it? What's the realistic outcome (upside + downside)? How complicated/intense is it to execute? Is there a better way to frame what we're trying to accomplish? Is there a simpler alternative that gets the same outcome?
4. **Delivery:** 4 separate reports stitched together — NOT a single synthesized brief. End with a short ship / reframe / skip recommendation. Flag hype-without-data explicitly.

**Why:** The user was burning effort on plays that *sounded* cool before pressure-testing them. Keeping each channel's distinct signal visible (Reddit skeptics vs. YouTube evangelists vs. blog benchmarks) is the whole point — synthesizing too early loses the disagreement, which is where the real decision-grade information lives. Best practices ≠ ROI; default to ROI unless compliance/safety/accessibility is in play.

**How to apply:** On every new concept the user raises that lacks prior research in this repo, pause and ask the gate question before building, researching unilaterally, or pitching. Skip the check only for trivial changes, decisions with clear repo precedent, or when the user says "skip research, just ship." Full spec lives in `CLAUDE.md` → "Research protocol — 4-agent ROI check on new concepts."
