---
name: No auto-bot engagement on third-party (Zay's) posts
description: Never propose automated commenting/liking/replying on Zay's or any third-party IG/FB/TT posts. Meta TOS §5b violation, token revocation risk, kills the legit IG Business token automation stack.
type: feedback
originSessionId: 5a8e6a15-7323-481c-a002-83c5a3ec0ad7
---
Never recommend automation that engages with **third-party** (Zay, mods, anyone-not-AIBibleGospels) social posts — auto-comment, auto-reply, auto-like-everything-in-thread. Across IG, FB, TikTok, YouTube.

**Why:**
- **Meta Platform Terms §5b** explicitly forbids automated commenting on third-party content. This is the exact pattern Meta's ML detection was trained on (2023-2024 spam-bot crackdowns).
- **Token revocation kills the whole stack.** AI Bible Gospels' IG Business token was approved 2026-04-27. One automation flag = lose the token = lose every other automation downstream (AEO bulk caption updates, pinned-comment automation, bio rotator, etc.). The collateral damage is asymmetric.
- **Detection signature is screaming.** Same handle replying within 30-60s on every post, with the same link pattern, is a textbook bot signature. Manual rotation can't hide it at scale.
- **Relational cost.** From Zay/circle's view, AI_BIBLE_GOSPELS appearing on every post reads as leeching, not engagement. The pattern *is* the message. Months of relationship-building can flip on one off-tone automation.
- **Technical reality.** IG Graph API doesn't expose real-time webhooks for OTHER accounts. Polling lags 5-15 min — already too slow for "first comment" anyway.

**How to apply:**
- If Thomas asks for an auto-reply / auto-comment / auto-engagement bot on Zay's posts, **steer to the manual play** (push notifications turned on for `@hmblzayy` + `@ministerzay`, human first-comment within 10 seconds, single comment per post + walk away).
- If he wants an automated alternative, the **only legit path** is on his OWN account: ManyChat-style **comment-keyword → auto-DM** (user comments "TRACKER" or "MAP" → bot DMs them the link). This is Meta-approved, user-initiated, policy-clean. Same logic applies for FB Messenger keyword auto-reply.
- Like-everything / reply-to-every-comment behaviors are also out — even done manually, the *pattern* triggers ML detection and looks thirsty to mods.

**Decided:** May 1, 2026 session. Manual first-comment camp confirmed in v2.11.0 playbook stays the canonical play.
