---
name: Manual-but-assisted helper > full automation for short-window tone-sensitive content
description: For 7-to-14-day cadence tasks where each day's content reflects what entered the public record (recovery cycles, breaking news follow-ups, post-launch updates), build a 30-second helper script — not a cron-scheduled agent. Boilerplate auto-entries during sensitive moments read pageview-farmy.
type: feedback
originSessionId: c2c6c7b5-6590-4750-8837-8caa2cfbc2e3
---
When a recurring daily task has a **short window (≤14 days)** AND **the content depends on what entered the public record that day** (news beat, IG update, event milestone), build a helper script that handles the boring parts (date, file edit, git commit/push) but leaves the body to the human. Don't schedule a fully autonomous agent.

**Why:** Confirmed Apr 30, 2026 — Thomas explicitly chose manual-but-assisted over auto-cron for the daily Apr 28 incident recovery-entry append on `/updates/april-28-incident`, after I recommended that approach. The reasoning was generalizable:

1. **Tone is everything during sensitive cycles.** A boilerplate auto-entry like "Day 36 · No new public information today" reads cold during a recovery / news cycle. A human-curated 1-line entry reactive to that day's actual public record carries the trust signal that converts.
2. **The window is short (~7 days for news-event search demand).** Per the case-study blogs agent, automation overhead doesn't pay back over that horizon.
3. **News changes the script.** New IG update, local news beat, return announcement — the human catches it in real time; the agent boilerplate-fills.
4. **Failure-mode comparison.** Manual: maybe miss 1-2 days, easy to backfill. Automated: could publish something tone-deaf during a sensitive moment, harder to retract once cached/indexed.

**How to apply:**
- For task X with daily cadence over a short window: ship `npm run X:append` (or equivalent) that handles date computation, file edit, git commit/push, idempotency check (`--force` to overwrite, `--dry-run` to preview). 30 seconds of human time per run, zero boilerplate risk.
- Reference implementation: `scripts/recovery-append.js` + `npm run recovery:append` (commit `5ce15d5`).
- Recurring agents (`/schedule`) are still the right default for things like weekly Vercel Analytics pulls, monthly cleanup PRs, "remove once X" follow-ups — anywhere the action is mechanical and tone-insensitive.
- **Inflection point:** if the cadence extends past ~14 days OR the daily content is truly mechanical (e.g., "post checkpoint mileage from JSON"), reconsider auto-cron. But default to manual-assisted on first ship; promote to auto only if the human consistently runs it the same way for 2+ weeks.
