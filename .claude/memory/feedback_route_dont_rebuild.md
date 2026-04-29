---
name: Route to existing community surfaces, don't rebuild them
description: Before building any feature that duplicates an existing user-owned community surface (Discord channel, group chat, mailing list), check if we can route INTO that surface instead. Confirmed Apr 29 on the prayer-wall pivot.
type: feedback
originSessionId: 4e12cfa8-726c-4dbd-8fe0-64166b26b985
---
Before building any feature that mimics or duplicates an existing surface where the user's own community already gathers (HMBL Discord, group chats, mailing lists, Skool, Twitch chat, etc.), default to ROUTING INTO that surface instead of standing up a parallel one on faithwalklive / aibiblegospelscom / any owned property.

**Why:**
- Apr 29, 2026: I had a 4-5h build plan for a custom prayer wall (form + storage + moderation queue + display feed) ready to execute. Thomas's response was "they discord already have a prayer section lerts just point them there lol" — and he was right. We shipped a Discord-routed `/prayer` landing in 9 minutes instead. Saved the build, removed ongoing moderation burden, and routed traffic into Zay's *actual* community rather than a parallel one we'd be hosting.
- Custom-built community surfaces compete with the principal's real one for attention, fragment the audience, and inherit a moderation tax we have to pay during traffic surges (e.g. TMZ-driven news cycles bring trolls).
- An owned URL on our site that bridges to the principal's own community is the right shape: we keep the shareable URL + analytics, they keep the conversation.

**How to apply:**
- When a feature spec includes "submission form," "moderation queue," "wall," "feed," "community page," or any surface where users post to each other, **stop and ask**: does the principal already host this conversation somewhere they own?
- For Zay specifically: HMBL University Discord is the canonical community surface. Default route: `faithwalklive.com/<feature>` → Discord channel via permanent invite, not a custom build.
- The owned URL still matters — keep it as a public-facing shareable destination (SEO, news-comment drops, Vercel Analytics on the click) with a clean explainer + CTA. Don't 301 redirect; render a small landing page.
- This only inverts when the principal explicitly asks for a custom-built version OR there's a hard reason routing won't work (the existing surface is private, gatekept, or the wrong audience).
