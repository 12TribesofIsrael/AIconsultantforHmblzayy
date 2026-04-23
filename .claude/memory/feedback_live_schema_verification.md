---
name: Live schema verification technique
description: WebFetch strips script tags; use curl --ssl-no-revoke + grep to verify JSON-LD / Speakable / any <script> content on live sites
type: feedback
originSessionId: 35712c6b-7c63-43de-af50-b94506edbe4a
---
When verifying live JSON-LD structured data, Speakable schema, or anything else that lives inside a `<script>` tag on a deployed Next.js (or any HTML) site, **WebFetch will not see it** — its markdown converter strips script tags. The model you're proxying through will claim "I cannot find any JSON-LD" even when the schema is fully live.

**Correct verification flow:**
```bash
curl -sS --ssl-no-revoke -o /tmp/page.html -w "%{http_code}\n" https://example.com/faq
grep -o 'application/ld+json[^<]*</script>' /tmp/page.html
grep -o 'SpeakableSpecification[^}]*' /tmp/page.html
```

**Why:**
- **Why the curl flag:** On Windows, `curl` uses schannel and fails with `CRYPT_E_NO_REVOCATION_CHECK (0x80092012)` on many valid HTTPS sites. `--ssl-no-revoke` skips the revocation check and is safe for verification/read-only fetches.
- **Why grep over read:** Next.js/Vercel HTML output is one giant minified line; ripgrep against a pattern is cleaner than `Read`-ing a 100KB file.
- **Why it matters:** past incident — told the user "FAQ JSON-LD missing" based on WebFetch; it was actually live. Nearly shipped a duplicate schema fix.

**How to apply:** Use this whenever auditing AEO/SEO surfaces on faithwalklive.com, aibiblegospels.com, or any other Vercel/Next deployment we own. For authenticated or JS-rendered pages (YouTube About, LinkedIn), curl won't help either — those need user eyeballs.
