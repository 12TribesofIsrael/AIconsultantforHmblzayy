---
name: memory-index-crossmachine-drift
description: "MEMORY.md gets clobbered when two machines run session-end on different days — each memory:push overwrites the index with that machine's local view, silently dropping entries the other machine added"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a128621f-c638-4c35-ae49-34478e072c02
---

`scripts/memory-sync.js push` copies the entire contents of the machine-local `~/.claude/projects/.../memory/` directory into the repo's `.claude/memory/`, including MEMORY.md. If Machine A added an entry to MEMORY.md and pushed, then Machine B runs session-end without first pulling the latest central backup into its local memory dir, Machine B's session-end pushes a MEMORY.md missing A's entry. Git won't auto-merge cleanly because both touched the index.

**Pattern observed (2026-05-26, twice in one day):**
- Morning desktop session-end pushed `feedback_tracker_geocode_plausibility` line into MEMORY.md.
- Laptop session-end same day pushed a MEMORY.md missing that line (laptop's local was stale).
- Evening desktop session pulled → conflict on MEMORY.md → had to manually re-merge by taking ours + adding back laptop's new `feedback_tracker_multiday_catchup` line + the desktop's new `feedback_tracker_inprogress_dedup` line.

**Why:** central backup (`claude-memory-backup` repo) is the source of truth for cross-machine memory state, but session-end currently pushes machine-local without first pulling central. The two-way sync only happens via explicit `memory:pull` (which the user rarely runs day-to-day).

**How to apply:**
- When `git pull --rebase` after a memory commit hits a conflict on `.claude/memory/MEMORY.md`, the resolution is almost always: take ours (the local additions), then manually scan the incoming-side diff for any entry lines the other machine added that we don't have, and merge them in. The conflict markers `<<<<<<< HEAD` / `>>>>>>>` show both sides clearly.
- Memory files themselves (the `feedback_*.md`, `project_*.md`, etc.) typically don't conflict because they're per-file and `memory:push` is additive at the file level (it adds/updates, never deletes). It's only MEMORY.md (the index) that conflicts.
- After resolving, verify no MEMORY.md entries point to nonexistent files (`for line in $(grep -oE '\([a-z_]+\.md\)' MEMORY.md); do test -f .claude/memory/${line#(} || echo "MISSING $line"; done` style check).

**Eventual hardening (deferred):** make `scripts/memory-sync.js push` merge MEMORY.md additively (read existing repo MEMORY.md, append any missing lines from local, dedupe by filename in the link, preserve order) instead of straight-copy. That kills this class of conflict entirely.

See also `[[memory-sync]]` for the underlying tool's design.
