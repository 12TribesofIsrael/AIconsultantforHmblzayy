# Day 30 — Love Wall (pending archival)

**Status:** Vetted clips ready. Day 30 will be archived **tomorrow** when the team updates the Twitch title (we don't hand-roll Day 30 mid-cycle to keep title-driven workflow clean).

**Vetted on:** 2026-04-24 (queried Twitch GQL — `LAST_DAY`, sorted `VIEWS_DESC`)

**Theme:** "One Month In · The Love Wall" — top 3 clips by view count from Day 30 (Springfield, OH arrival).

## The 3 clips

| # | Views | Title | Slug |
|---|------|-------|------|
| 1 | 50 | YOU MIGHT SEE SOME WEIRD THINGS🤣🥷🏽 | `KawaiiRelievedJaguarTBTacoLeft-OX2AJJYXcMm3rXTg` |
| 2 | 28 | W support | `BrightResourcefulGiraffeKAPOW-mAJH78SKnh4o2dcX` |
| 3 | 25 | W Tyler | `PatientBillowingSwallowLitty-jgw76WeSIJQDd2-t` |

## Tomorrow's archive command

Once the Twitch title updates to confirm Day 30 → Springfield, OH (~607 mi total), run:

```bash
node scripts/update-tracker.js \
  --day 30 \
  --location "Springfield, OH" \
  --miles 607 \
  --clips "https://www.twitch.tv/hmblzayy/clip/KawaiiRelievedJaguarTBTacoLeft-OX2AJJYXcMm3rXTg,https://www.twitch.tv/hmblzayy/clip/BrightResourcefulGiraffeKAPOW-mAJH78SKnh4o2dcX,https://www.twitch.tv/hmblzayy/clip/PatientBillowingSwallowLitty-jgw76WeSIJQDd2-t" \
  --clips-title "One Month In · The Love Wall"
```

This:
- Adds Day 30 with the 3 clips as a multi-clip "Love Wall"
- Sets `clipsTitle` so the wall renders with the milestone caption
- Auto-rebuilds tracker HTML, commits, pushes, mirrors to faithwalklive (Vercel redeploys)

## If view counts shift overnight

Re-query before running the archive command — clip view counts move:

```bash
node -e "
const https = require('https');
const postData = JSON.stringify({ query: '{ user(login: \"hmblzayy\") { clips(first: 30, criteria: { period: LAST_DAY, sort: VIEWS_DESC }) { edges { node { slug title createdAt viewCount url } } } } }' });
const req = https.request({ hostname: 'gql.twitch.tv', path: '/gql', method: 'POST', headers: { 'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko', 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) } }, (res) => { let d=''; res.on('data',c=>d+=c); res.on('end',()=>console.log(JSON.stringify(JSON.parse(d).data.user.clips.edges.slice(0,15).map(e=>e.node),null,2))); });
req.write(postData); req.end();
"
```

Pick the new top 3, swap their slugs into the command above.
