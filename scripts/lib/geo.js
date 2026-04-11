/**
 * Geo helpers — geocode city names via OpenStreetMap Nominatim, and
 * compute great-circle distance between two lat/lng points.
 */

const https = require('https');

// Geocode using OpenStreetMap Nominatim (free, no API key).
function geocode(location) {
  return new Promise((resolve, reject) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`;
    https.get(url, { headers: { 'User-Agent': 'HMBLFaithWalkTracker/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const results = JSON.parse(data);
          if (results.length > 0) {
            resolve({ lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) });
          } else {
            reject(new Error(`Could not geocode: ${location}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Great-circle distance in miles between two points (haversine).
function haversineMiles(latA, lngA, latB, lngB) {
  const R = 3958.8; // Earth radius in miles
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(latB - latA);
  const dLng = toRad(lngB - lngA);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(latA)) * Math.cos(toRad(latB)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Estimated walking distance with road-vs-straight-line correction factor.
function estimatedRoadMiles(latA, lngA, latB, lngB) {
  return haversineMiles(latA, lngA, latB, lngB) * 1.3;
}

module.exports = { geocode, haversineMiles, estimatedRoadMiles };
