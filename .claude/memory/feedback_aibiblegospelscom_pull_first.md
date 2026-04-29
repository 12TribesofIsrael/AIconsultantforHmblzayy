---
name: aibiblegospelscom — pull before editing
description: The aibiblegospels.com sibling repo gets pushed from multiple machines (laptop + desktop). Always `git fetch && git pull --ff-only` before starting edits to avoid push rejection mid-session.
type: feedback
originSessionId: 78873a64-228e-49f3-8cd9-924beb67d254
---
**Rule:** Before editing `c:\Users\Claude\hblfaithwalk\aibiblegospelscom`, always run `git fetch origin && git pull --ff-only` first. Do not assume the local clone matches origin/main.

**Why:** On 2026-04-29 a same-day Anointed-flagship push was rejected because origin/main had 4 commits the local machine had never seen — LLC scrub (`df9a44f`), contact-email swap to aibiblegospels444@gmail.com (`2f68ad1`), Privacy + Terms footer links (`0c9db40`), Privacy/Terms pages moved onto canonical site for TikTok app review (`85d3f13`). The local working copy was based on the original scaffold (`b34847b`), so my drafted edits ran on stale assumptions (e.g. I had drafted my own LLC-scrub edit, which was already in remote). Recovery cost: `git reset --hard HEAD~1`, `git pull --ff-only`, re-read post-pull state, re-apply only the new section on top, rebuild, recommit, push. Avoidable with a single pull at session start.

**How to apply:**
- This is specific to `aibiblegospelscom`. The consulting tracker (`AIconsultantforHmblzayy`) is single-machine source-of-truth; faithwalklivecom is auto-pushed by tracker scripts. Only `aibiblegospelscom` is human-edited from multiple machines without a sync wrapper.
- If a push gets rejected, do NOT use `--force`. Reset, pull --ff-only, re-apply edits on the post-pull state. Conflicts on a fresh apply are easier than merge-resolution on a tangled tree.
- This rule may extend to the Anointed source repo (`C:\Users\Claude\ai-bible-gospels`) too — its CLAUDE.md doesn't disclose multi-machine editing, but Modal deploys + Cloudflare Worker config suggest cross-machine work. When editing there, pull first as a default.
