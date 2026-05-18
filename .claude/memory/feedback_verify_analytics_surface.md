---
name: verify-which-analytics-surface-you-re-reading-from-before-drawing-a-conclusion
description: "Don't conflate GH Pages GoatCounter with faithwalklive Vercel Analytics. They measure totally different URLs and treating one as a proxy for the other produced a 10x wrong baseline that almost derailed a strategy decision."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 2babe7f9-5c32-4711-9382-c180551d9891
---

When asked "how is faithwalklive doing" or "what's our traffic," **explicitly state which analytics surface the number came from before drawing any conclusion.** The project has two completely separate analytics layers tracking two completely separate URLs:

| Surface | What it tracks | Numbers (May 2026) |
|---------|---------------|---------------------|
| **GoatCounter** (`hmbl-faithwalk.goatcounter.com`) | GH Pages legacy URLs only — `docs/faith-walk-tracker.html` + `docs/rv-route-plan.html`. Since v2.18.0 the tracker URL is a meta-refresh redirect, so it captures only legacy-bookmark holdouts. | ~3-5 visits/day |
| **Vercel Analytics** (vercel.com → faithwalklive project) | The actual faithwalklive.com site — homepage + /map + /prayer + /clips + /press + /faq + /why + /updates | ~28 visits/day, Google = #1 referrer |

**Why:** May 17, 2026 I told Thomas "faithwalklive.com is at 3.4 visits/day, traffic is a desert" based on the GoatCounter numbers. That was wrong — GoatCounter wasn't measuring faithwalklive at all. The real Vercel number was **8x higher** with Google driving 29% organic. I burned an entire 4-agent ROI check on the wrong premise before realizing the mistake when Thomas asked me to look at Vercel directly. The verdict (REFRAME on "drive more traffic") was still defensible because the realistic action items don't change, but the urgency and the framing were materially wrong.

**How to apply:** Whenever a session involves a "should we do X" decision and traffic numbers are an input, explicitly call out which dashboard the number came from. If only one dashboard's data is available, name what's NOT measured. If pulling numbers programmatically, name the path being measured in the response. The two-line cost prevents the same 10x baseline error.

Specifically for this project:
- "faithwalklive.com pageviews" → Vercel Analytics ([[reference_faithwalklive_analytics]], [[reference_faithwalklive_traffic_baseline]])
- "GH Pages tracker pageviews" → GoatCounter ([[reference_goatcounter_dashboard]])
- "Twitch viewers" → Twitch GQL
- "YouTube channel" → youtubeoptermizer sibling repo APIs ([[reference_youtubeoptermizer_apis]])

Never let "tracker traffic" remain ambiguous when it could mean either.
