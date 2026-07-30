---
name: feedback_sweep_machine_readable_copy
description: "After any state change (walk finishes, product launches, pause ends), sweep the machine-readable surfaces — llms.txt, JSON-LD, schema constants — not just the visible page copy."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3cf2094a-4b69-4aac-ba8e-6bf14621ca52
  modified: 2026-07-30T17:50:30.905Z
---

When a project's **state** changes — an event finishes, a launch ships, a pause ends — the visible
page copy gets updated because someone *looks* at it. The machine-readable surfaces do not, because
nobody looks at them. Sweep them explicitly and sweep them **first**.

**Why:** they are exactly the surfaces the SEO/AEO work exists to serve, and they fail silently and
indefinitely. Concrete burn (2026-07-30, faithwalklive.com): the Faith Walk finished Jul 27 and the
homepage was pivoted Jul 28 — but three days later `public/llms.txt` still told answer engines the
walk was **paused** and that Zay "intends to finish the walk after recovery." A plain-text file, read
verbatim by the engines the whole effort targets, contradicting the site it describes. In the same
sweep: the root `Person` `sameAs` pointed at a **dead Instagram URL**, and three `Event` JSON-LD
variants each hardcoded their own copy of the start date — one of which contradicted the site's own
day count (Mar 25 start + Day 124 finish on Jul 27 = 125 days, not 124).

**How to apply:**
- **Checklist per state change:** `public/llms.txt`, every JSON-LD block (`layout.tsx` + per-page),
  `sitemap.ts`, `robots.txt`, OG/Twitter metadata, `alternates.canonical`, and any transactional
  email templates. Visible copy is the *last* thing to check, not the first.
- **A dead URL in `sameAs` is worse than no URL** — that field exists to link an entity's profiles
  together, so a 404 breaks the exact thing it is there to do.
- **Never hardcode the same date/fact in more than one schema block.** Export one constant
  (`WALK_START_DATE` in `src/lib/checkpoints.ts` is the pattern) and have every block read it, so
  drift between schema and page is structurally impossible.
- **Sanity-check derived numbers against each other.** Start date + day count + end date must agree;
  when they don't, one of them is wrong and the schema is asserting it confidently.
- Verify live afterward with `curl --ssl-no-revoke` — see [[feedback_live_schema_verification]].
