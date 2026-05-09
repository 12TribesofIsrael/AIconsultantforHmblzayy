---
name: persistent-profile login over .env credentials
description: For login-walled sites (IG, FB, Twitch, etc.) when using the browser skill, recommend one-time interactive login that persists in the Playwright profile — not stored creds
type: feedback
originSessionId: 871eb9bf-6c1d-4751-ae46-0df4f8e8b73f
---
When the browser skill (`~/.claude/skills/browser/`) hits a login wall on Instagram, Twitch, YouTube Studio, TikTok, X, Discord, or any other social platform, the right pattern is **one-time interactive login that persists in the Chromium profile** — NOT storing credentials in `.env` and scripting the login form.

**Why:**
- The browser skill uses a persistent profile at `~/.meta-playwright-profile/` (Windows: `C:\Users\Deskt\.meta-playwright-profile`). Cookies/sessions persist between runs and across repos — one Windows user, one profile, every repo benefits.
- Scripted logins are fragile: Instagram, Twitch, TikTok aggressively flag automated logins, trigger 2FA challenges every attempt, or shadow-ban / lock the account. Plaintext passwords in `.env` are also a security liability.
- Interactive login handles 2FA naturally — the user just enters their code on the same device they always use.

**How to apply:**
- When hitting a login wall, propose: "I'll launch the browser skill with a `goto` → `wait_for_user` action; you sign in once (handle 2FA normally), I screenshot to confirm, and we're done." Do NOT propose adding `IG_USERNAME`/`IG_PASSWORD` to `.env`.
- The login persists per-Windows-user (not per-repo), so a single sitting covers every repo that uses the browser skill — `AIconsultantforHmblzayy`, `faithwalklivecom`, `youtubeoptermizer`, `faithwalkbook`, etc. Don't re-ask the user to log in on each repo.
- Canonical user-level documentation goes in `~/.claude/CLAUDE.md` (which Claude Code merges into every project session) so future Claude instances in any repo see the rule. Per-repo `CLAUDE.md` doesn't need to repeat it.
- Site list to walk through (default unless user trims): Instagram, Facebook, YouTube/Google, Twitch, TikTok, X/Twitter, Discord. Add LinkedIn / Shopify admin / Vercel dashboard / Skool only if the user mentions them.
- After login, verify by re-running whatever scrape originally hit the wall (e.g., for IG, re-pull the post that triggered the workflow — caption should now surface).

**Status as of session-end 2026-05-09:** Login flow recommended in conversation but Thomas hadn't completed the interactive walk-through yet. Pick up here on resume — see LAST_SESSION.md "open threads."
