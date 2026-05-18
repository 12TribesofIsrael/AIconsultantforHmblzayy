---
name: resend-audience-config-faith-walk-live
description: "Resend Audience ID + Vercel env vars + sender address for the faithwalklive email capture. Set up May 17, 2026 with v2.19.0."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 2babe7f9-5c32-4711-9382-c180551d9891
---

## Faith Walk Live audience

- **Audience ID:** `00ffda58-4b96-4397-97f5-77f5dfef3106`
- **Audience name:** Faith Walk Live (Resend dashboard at resend.com/audiences)
- **Owner:** Thomas (Resend account tied to `aibiblegospels444@`)

## Vercel env vars (faithwalklive project)

| Name | Purpose |
|------|---------|
| `RESEND_API_KEY` | Resend API key with **full access scope** (NOT sending-only — Audiences CRUD requires it) |
| `RESEND_AUDIENCE_ID` | `00ffda58-4b96-4397-97f5-77f5dfef3106` |

Both set in vercel.com → faithwalklive → Settings → Environment Variables across all envs (Production, Preview, Development). If `/api/subscribe` returns `503 "Subscriptions are temporarily offline"`, either var is missing.

## Sender + domain

- **From:** `Faith Walk Live <info@anointed.app>`
- **Domain:** `anointed.app` — verified in Resend with SPF/DKIM/return-path aligned (see `docs/press-outreach-log.md` in the consulting repo for the full DNS table)
- The same domain is used for press-outreach (`docs/press-outreach-log.md`'s `send_press_outreach_resend.py`). Both flows share the verified domain.

## Resend tags applied to every send

- `list=faith-walk-live`
- `type=welcome` (for the initial welcome email; other types may exist later)
- `source=<form-id>` — `home-hero` | `home-footer` | `subscribe-page` | `claude-smoke-test` etc.

Useful for filtering analytics in Resend dashboard.

## Verified working

End-to-end smoke test May 17, 2026:
- `POST /api/subscribe {"email":"bmbaiautomation@gmail.com"}` → `200 {"ok":true}` + welcome email landed
- Duplicate → `200 {"ok":true}` (Resend 409 swallowed for idempotency)
- Invalid format → `400 {"error":"Please enter a valid email address."}`

## Code path

- API route: `../faithwalklivecom/src/app/api/subscribe/route.ts`
- Component: `../faithwalklivecom/src/components/EmailCapture.tsx`
- Wired on: `/` (hero + footer), `/subscribe`

## Related

[[reference_faithwalklive_traffic_baseline]] · [[reference_faithwalklive_analytics]]
