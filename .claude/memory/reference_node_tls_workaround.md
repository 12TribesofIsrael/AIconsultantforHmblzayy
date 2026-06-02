---
name: node-tls-workaround
description: "On this Windows machine (desktop, user Claude/Deskt), Node's bundled CA store rejects Twitch GQL + Nominatim certs — use $env:NODE_OPTIONS='--use-system-ca' before any tracker script"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 2ed48b5a-9e3b-48e2-a9b5-2ab6eabd9462
---

Node 18+ on Windows ships with its own CA store that doesn't trust some intermediate certs the Twitch GQL endpoint (`gql.twitch.tv`) and Nominatim geocoder use. Plain `npm run tracker:from-title` fails with:

```
Error: unable to verify the first certificate; if the root CA is installed locally, try running Node.js with --use-system-ca
```

**Fix — run in PowerShell, not bash:**

```powershell
$env:NODE_OPTIONS='--use-system-ca'; npm run tracker:from-title
```

The env var tells Node to use the Windows system trust store instead of its bundled bundle. Works for every script that hits external HTTPS (tracker:from-title, tracker:update with geocoding, the GQL clip-query one-liner, faithwalk:sync, etc.).

Bash form `NODE_OPTIONS=... npm run ...` does NOT work — it's a PowerShell env-var syntax issue, not a bash issue, but the npm script ultimately needs the env var set when Node spawns. Use PowerShell.

**Permanent fix candidate (not yet wired):** add a `cross-env NODE_OPTIONS=--use-system-ca` prefix to the relevant npm scripts in `package.json` so it's not a per-command thing. Deferred — the workaround works fine session-by-session.
