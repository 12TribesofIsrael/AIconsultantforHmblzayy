---
name: node-tls-workaround
description: "Running tracker scripts on Windows: CA trust + npm-wrapper quirks differ PER MACHINE. Deskt(Node22+) needs --use-system-ca; Owner(Node20) must run `node scripts/...` directly with NODE_EXTRA_CA_CERTS already set."
metadata: 
  node_type: memory
  type: reference
  originSessionId: 2ed48b5a-9e3b-48e2-a9b5-2ab6eabd9462
---

Tracker scripts hit external HTTPS (Twitch GQL `gql.twitch.tv`, Nominatim geocoder, faithwalklive push). Node's bundled CA store / Norton MITM interact differently on each of Thomas's machines — **the right invocation is machine-specific**:

**Deskt machine (user Claude/Deskt, Node 22+):**
- Plain `npm run tracker:from-title` fails with `unable to verify the first certificate; ... try running Node.js with --use-system-ca`.
- Fix (PowerShell): `$env:NODE_OPTIONS='--use-system-ca'; npm run tracker:from-title`
- `--use-system-ca` points Node at the Windows trust store. Bash `NODE_OPTIONS=... npm run` form doesn't take; use PowerShell.

**Owner machine (user Owner, Node v20.17.0) — confirmed 2026-05-31:**
- `--use-system-ca` is **NOT supported** on Node 20 — both `$env:NODE_OPTIONS='--use-system-ca'` ("not allowed in NODE_OPTIONS") and `node --use-system-ca` ("bad option") error out. Do NOT use it here.
- CA trust is already handled: USER env var `NODE_EXTRA_CA_CERTS=C:\Users\Owner\.claude\norton-root.pem` is set permanently (per global CLAUDE.md), so **plain `node scripts/<x>.js` just works** for the Twitch/Nominatim/sync calls.
- `npm run tracker:from-title` (and other npm-script wrappers) fail here with `Could not determine Node.js install directory` — an npm-on-Windows wrapper issue, not a cert issue. **Run the script directly instead:** `node scripts/tracker-from-title.js`, `node scripts/update-tracker.js --day N --clip "..."`, etc.
- Twitch GQL note: `sort:CREATED_AT_DESC` intermittently returns `server error` — use `sort:VIEWS_DESC` (also per CLAUDE.md). PowerShell mangles inline `node -e "...JSON with quotes..."`; write a tiny temp .js file instead (and delete it before running tracker scripts — the git-sync step aborts on untracked files).

**Permanent fix candidate (not wired):** add `cross-env NODE_OPTIONS=--use-system-ca` to npm scripts for Deskt, but that would break Owner (Node 20 rejects the flag). A machine-detecting prefix or a Node upgrade on Owner would be the real fix. Deferred. See [[memory-index-crossmachine-drift]].
