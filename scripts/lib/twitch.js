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
//
// Returns: { day, miles?, milesFromNext?, nearLocation?, location? } or null
function parseStreamTitle(title) {
  if (!title) return null;

  const data = {};

  // Day number: "DAY 12"
  const dayMatch = title.match(/DAY\s+(\d+)/i);
  if (dayMatch) data.day = parseInt(dayMatch[1]);

  // Total miles walked: "214 MILES COMPLETED" / "DONE" / "WALKED"
  const milesMatch = title.match(/(\d+)\s*MILES?\s*(COMPLETED|DONE|WALKED)/i);
  if (milesMatch) data.miles = parseInt(milesMatch[1]);

  // "X MILES FROM CITY[, ST]" — distance remaining to next destination.
  // Greedy capture stops naturally at any char outside [A-Za-z\s] (e.g.
  // pipe separator, emoji, period). Optional state code is appended via
  // a separate group so geocoding doesn't hit a same-named city in the
  // wrong state.
  const milesFromMatch = title.match(/(\d+)\s*MILES?\s+FROM\s+([A-Z][A-Za-z\s]+?)(,\s*[A-Z]{2})?\s*(?=\||$|[^A-Za-z\s,])/i);
  if (milesFromMatch) {
    data.milesFromNext = parseInt(milesFromMatch[1]);
    data.nearLocation = (milesFromMatch[2].trim() + (milesFromMatch[3] || '')).trim();
  }

  // Explicit "LOCATION: CITY, ST"
  const locationMatch = title.match(/LOCATION[:\s-]+([A-Z][a-zA-Z\s]+,\s*[A-Z]{2})/i);
  if (locationMatch) {
    data.location = locationMatch[1].trim();
  } else if (!data.nearLocation) {
    // Fallback: bare "FROM CITYNAME"
    const fromMatch = title.match(/FROM\s+([A-Z][A-Za-z\s]+?)(,\s*[A-Z]{2})?\s*(?=\||$|[^A-Za-z\s,])/i);
    if (fromMatch) {
      data.nearLocation = (fromMatch[1].trim() + (fromMatch[2] || '')).trim();
    }
  }

  return data.day ? data : null;
}

module.exports = { fetchStreamTitle, parseStreamTitle, TWITCH_CHANNEL };
