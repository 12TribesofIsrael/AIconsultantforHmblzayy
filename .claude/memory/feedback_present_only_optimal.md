---
name: Present only the optimal path, not menu of options
description: When proposing a fix, present the recommended approach and ship it. Don't list inferior alternatives the user has to dismiss.
type: feedback
originSessionId: 370e5003-12aa-4896-8a0e-e42adf54f73b
---
When proposing how to solve a problem, **present only the path I'd actually take**. Don't enumerate inferior options as a menu the user has to read past, evaluate, and reject. The user is paying me to make the call — surfacing weaker options shifts cognitive load back to them.

**Avoid:**
- "Two ways to fix this: A. weak option, B. better option. I'd recommend B."
- "Options: 1, 2, 3. Going with 2 unless you'd prefer..."
- Numbered/lettered choice lists where I already know which one wins

**Prefer:**
- "Here's the fix: [the optimal path]. Shipping unless you flag a constraint I missed."
- One sentence stating the approach + one sentence on why + ship.

**When the menu IS appropriate:**
- The user explicitly asks for options ("what are my choices?", "give me a couple paths")
- Two options have meaningfully different trade-offs that only the user can weigh (cost vs speed, public-facing vs internal, reversible vs irreversible) — and I genuinely don't know their preference
- The "weak" option contains information the user needs to know exists (e.g. "we could revert, but I'd update instead because...")

If none of those apply: just ship the right thing.

**Why:** The user told me directly on 2026-04-20 — after I presented an A/B for the map popup sync — that A was obviously inferior and they don't want me suggesting non-optimal options going forward. They want decisive recommendations, not collaborative deliberation on choices I've already evaluated.

**How to apply:** Before sending a message that contains "Option A / Option B" or numbered choices, ask: do I already know which one I'd ship? If yes, delete the inferior options and just propose the winner. State trade-offs only if they're load-bearing for the decision.
