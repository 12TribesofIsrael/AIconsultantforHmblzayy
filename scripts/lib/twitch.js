/**
 * Twitch helpers — fetch hmblzayy's stream title and parse Faith Walk
 * data out of it.
 *
 * Note: uses the unofficial Twitch GQL endpoint with the public web
 * client ID. No auth required, but the endpoint is undocumented and
 * could break without notice.
 */

const https = require('https');

const TWITCH_CHANNEL = 'hmblzayy';
const TWITCH_WEB_CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';

// Valid USPS state codes (+ DC). Full spelled-out state names (e.g. "OHIO")
// are longer than 2 chars and pass through normalizeStateCode untouched —
// Nominatim geocodes them fine.
const US_STATES = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]);

// Known data-entry typos in Zay's stream titles → correct USPS code.
// "KC" recurs from ~Day 76 (Phase 2): he types "TOPEKA, KC" / "CARBONDALE, KC"
// for towns that are in Kansas (KS). The whole Phase-2 stretch is in Kansas,
// so this is an unambiguous fix. Revisit when the walk leaves KS.
const STATE_TYPOS = { KC: 'KS' };

// Normalize a captured state token: keep valid USPS codes, fix known typos,
// pass through everything else (incl. full state names) unchanged.
function normalizeStateCode(code) {
  if (!code) return code;
  const up = code.toUpperCase();
  if (up.length === 2 && !US_STATES.has(up) && STATE_TYPOS[up]) return STATE_TYPOS[up];
  return up;
}

// Title-case a "City, ST" string so auto-parsed locations match the
// mixed-case convention used elsewhere (titles arrive ALL-CAPS). Two-letter
// USPS state codes stay capitalized; everything else gets Title Case.
function titleCaseLocation(loc) {
  return loc.split(',').map(part =>
    part.trim().split(/\s+/).map(w => {
      if (US_STATES.has(w.toUpperCase())) return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    }).join(' ')
  ).join(', ');
}

// Fetch live or last-broadcast stream info.
function fetchStreamTitle() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      query: `{
        user(login: "${TWITCH_CHANNEL}") {
          stream { title viewersCount game { name } }
          lastBroadcast { title startedAt }
          broadcastSettings { title }
        }
      }`,
    });

    const options = {
      hostname: 'gql.twitch.tv',
      path: '/gql',
      method: 'POST',
      headers: {
        'Client-ID': TWITCH_WEB_CLIENT_ID,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const user = parsed?.data?.user;
          const stream = user?.stream;
          if (stream) {
            resolve({ title: stream.title, isLive: true, viewers: stream.viewersCount });
          } else {
            const lastTitle = user?.lastBroadcast?.title || user?.broadcastSettings?.title || '';
            resolve({ title: lastTitle, isLive: false, lastStreamDate: user?.lastBroadcast?.startedAt });
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Parse stream title for Faith Walk data.
// Title format examples:
//   "DAY 17 | WALKING 3000 MILES → CALI 🌴 | 22 MILES FROM BEAVER FALLS, PA | FAITH WALK"
//   "DAY 12 | 18 MILES FROM ALTOONA | FAITH WALK"
//   "DAY 14 | LOCATION: TYRONE, PA | 214 MILES COMPLETED"
//   "DAY 29 | 26 MILES FROM LONDON, OHIO | FAITH WALK"  (full state name also ok)
//   "DAY 76 | PHASE 2 of 3 | 28 MILES TOPEKA, KC 📍 | FAITH WALK"  (Phase-2: no
//      FROM/TO preposition; "KC" typo for KS auto-corrected via normalizeStateCode)
//
// Returns: { day, miles?, milesFromNext?, nearLocation?, location? } or null
function parseStreamTitle(title) {
  if (!title) return null;

  const data = {};

  // Day number: "DAY 12"
  const dayMatch = title.match(/DAY\s+(\d+)/i);
  if (dayMatch) data.day = parseInt(dayMatch[1]);

  // Rest day: "REST DAY" / "REST DAY💤" / "RESTDAY"
  if (/REST\s*DAY/i.test(title)) data.restDay = true;

  // Total miles walked: "214 MILES COMPLETED" / "DONE" / "WALKED"
  const milesMatch = title.match(/(\d+(?:\.\d+)?)\s*MILES?\s*(COMPLETED|DONE|WALKED)/i);
  if (milesMatch) data.miles = Math.round(parseFloat(milesMatch[1]));

  // "X MILES FROM/TO CITY[, ST]" — distance remaining to next destination.
  // Greedy capture stops naturally at any char outside [A-Za-z\s] (e.g.
  // pipe separator, emoji, period). Optional state code is appended via
  // a separate group so geocoding doesn't hit a same-named city in the
  // wrong state. CALI is the overall walk goal ("WALKING 3000 MILES TO CALI"
  // branding prefix), never a daily leg destination — iterate through all
  // matches and pick the first non-CALI one (titles often have BOTH the
  // CALI branding prefix AND a real daily-leg segment in the same string).
  const milesFromRegex = /(\d+(?:\.\d+)?)\s*MILES?\s+(?:AWAY\s+FROM|FROM|TO)\s+([A-Z][A-Za-z\s]+?)(,\s*[A-Z]{2,})?\s*(?=\||$|[^A-Za-z\s,])/gi;
  for (const m of title.matchAll(milesFromRegex)) {
    if (m[2].trim().toUpperCase() === 'CALI') continue;
    data.milesFromNext = parseFloat(m[1]);
    data.nearLocation = (m[2].trim() + (m[3] || '')).trim();
    break;
  }

  // Prepositionless format (Phase 2, from ~Day 76):
  //   "28 MILES TOPEKA, KC" — no FROM/TO between the mileage and the city.
  // Only used when the preposition-based match above didn't fire. Skip the
  // CALI branding number ("3000 MILES TO CALI") and the total-miles phrase
  // ("214 MILES COMPLETED"), same as the preposition path.
  if (!data.nearLocation) {
    const bareMilesRegex = /(\d+(?:\.\d+)?)\s*MILES?\s+([A-Z][A-Za-z\s]+?)(,\s*[A-Z]{2,})?\s*(?=\||$|[^A-Za-z\s,])/gi;
    for (const m of title.matchAll(bareMilesRegex)) {
      const city = m[2].trim();
      if (/\bCALI\b/i.test(city)) continue;
      if (/^(COMPLETED|DONE|WALKED)\b/i.test(city)) continue;
      data.milesFromNext = parseFloat(m[1]);
      data.nearLocation = (city + (m[3] || '')).trim();
      break;
    }
  }

  // Bare destination after "DAY N |" — modern post-resume title format,
  //   "DAY 45 | DANVILLE, IN📍" (no "MILES FROM/TO" qualifier).
  // Only used as a fallback when the MILES FROM/TO match didn't fire.
  if (!data.nearLocation) {
    const bareLocMatch = title.match(/DAY\s+\d+\s*\|\s*([A-Z][A-Za-z\s]+,\s*[A-Z]{2,})/i);
    if (bareLocMatch) {
      data.nearLocation = bareLocMatch[1].trim();
    }
  }

  // Explicit "LOCATION: CITY, ST"
  const locationMatch = title.match(/LOCATION[:\s-]+([A-Z][a-zA-Z\s]+,\s*[A-Z]{2})/i);
  if (locationMatch) {
    data.location = locationMatch[1].trim();
  } else if (!data.nearLocation) {
    // Fallback: bare "FROM CITYNAME"
    const fromMatch = title.match(/FROM\s+([A-Z][A-Za-z\s]+?)(,\s*[A-Z]{2,})?\s*(?=\||$|[^A-Za-z\s,])/i);
    if (fromMatch) {
      data.nearLocation = (fromMatch[1].trim() + (fromMatch[2] || '')).trim();
    }
  }

  // Single normalization point for every branch above: if nearLocation ends
  // in a "City, ST" pair, normalize the state token (fixes the "KC"→"KS"
  // Phase-2 typo regardless of which regex captured it).
  if (data.nearLocation) {
    const mm = data.nearLocation.match(/^(.*?),\s*([A-Za-z]{2,})$/);
    if (mm) data.nearLocation = `${mm[1].trim()}, ${normalizeStateCode(mm[2])}`;
    data.nearLocation = titleCaseLocation(data.nearLocation);
  }

  return data.day ? data : null;
}

module.exports = { fetchStreamTitle, parseStreamTitle, TWITCH_CHANNEL };
