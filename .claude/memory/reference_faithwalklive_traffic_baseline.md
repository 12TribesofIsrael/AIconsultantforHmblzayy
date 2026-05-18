---
name: faithwalklive-traffic-baseline-vercel-analytics-may-2026
description: "Real faithwalklive.com Vercel Analytics numbers as of May 17, 2026 — corrects an earlier mistake where I conflated GH Pages GoatCounter data with faithwalklive Vercel data. Use as anchor for any future \"how is faithwalklive doing\" question."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 2babe7f9-5c32-4711-9382-c180551d9891
---

**Snapshot date:** May 17, 2026 (covers last 30 days, Apr 18 → May 17)
**Source:** Vercel Analytics dashboard, faithwalklive project, Production environment

## Top-line numbers

- **320 visitors / 30 days** = ~28 visitors/day
- **848 pageviews** = 2.6 PV/visitor (healthy engagement)
- **52% bounce rate**

## Top pages (by visitors)

| Page | Visitors |
|------|----------|
| `/` (homepage) | 263 |
| `/map` | 117 |
| `/prayer` | 36 |
| `/why` | 24 |
| `/clips` | 21 |
| `/faq` | 18 |
| `/press` | 14 |

## Top referrers

| Source | Visitors | % |
|--------|----------|---|
| **google.com** | **93** | **29%** |
| facebook.com | 11 | 3.4% |
| l.instagram.com | 10 | 3.1% |
| vercel.com | 8 | 2.5% |
| m.facebook.com | 7 | 2.2% |
| search.brave.com | 4 | 1.2% |
| youtube.com | 4 | 1.2% |
| **(direct / dark social — unattributed)** | **~183** | **~57%** |

## Geo / device

- 91% United States, 3% Canada, 1% Sweden, 1% Ireland, 1% Mexico
- 68% mobile, 32% desktop
- 53% iOS, 23% Windows, 15% Android, 5% Linux, 4% macOS

## What this means

**Google AEO/SEO is the #1 working acquisition channel** at 29% of traffic. The structured-data investment from v2.11-2.16 (NewsArticle, FAQPage, Speakable, BreadcrumbList, WebPage, Event, Person, Organization schemas) is paying off in organic search.

The 57% direct/dark slice is consistent with SparkToro's Zero-Click finding (100% of TT/Discord/WhatsApp clicks land as "direct" with no referrer). Real traffic, just attribution-invisible.

**Mobile + iOS dominance** matches the Twitch/Discord/IG audience pattern.

## How to refresh

Vercel Analytics is dashboard-only on the free tier — no CLI access, no public stats. To pull updated numbers: vercel.com → faithwalklive project → Analytics tab → set range. See also `reference_faithwalklive_analytics.md` for the full dashboard map.

## Don't confuse with

`hmbl-faithwalk.goatcounter.com` tracks **GH Pages legacy URL only** (docs/faith-walk-tracker.html which is now a redirect per v2.18.0). That surface gets ~3-5 visits/day from bookmarks. Do NOT use GoatCounter to assess faithwalklive.com performance — see [[feedback_verify_analytics_surface]] for the mistake I made and the rule it generated.
