---
name: Historical CHANGELOGs are frozen records — don't rewrite
description: When fixing a drift bug, update the live code but leave past CHANGELOG entries alone — they record what shipped at that version
type: feedback
originSessionId: 2f1f691c-5f59-4e1c-a2d8-7d212f513feb
---
When fixing a value that drifted between code locations (e.g., steps-per-mile constant, a config default, a rendered string), update the live code path but leave prior CHANGELOG / release-notes entries untouched — even if the number they cite is now "wrong."

**Why:** A CHANGELOG entry is a historical record of what shipped at that version. Rewriting it to match current reality silently falsifies history, makes past versions unreproducible, and erases the evidence trail of a drift bug. Example from this session: faithwalklive CHANGELOG had "Steps calculation added sitewide (2,000 steps per mile)" under v0.2.0 — that was accurate for what shipped; today's fix bumps the live code to 2,200, but v0.2.0 genuinely used 2,000.

**How to apply:** When a bugfix touches a value that's also mentioned in prior CHANGELOG entries, only update the live code + the NEW changelog entry describing the fix. Leave old entries as-is. Same logic applies to dated release notes, migration guides, and any other historical doc. Only rewrite past entries when they contain a factual error about what shipped — not when the current value has since changed.
