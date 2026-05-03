/**
 * X (Twitter) v2 client — OAuth 1.0a User Context for tweet creation.
 *
 * Modeled on scripts/lib/twitch.js: single-purpose module, no SDK,
 * raw HTTPS via axios + Node crypto for HMAC-SHA1 signing. Reads
 * credentials from process.env so this stays unit-testable.
 *
 * Env vars required (all 4):
 *   X_API_KEY            consumer key
 *   X_API_SECRET         consumer secret
 *   X_ACCESS_TOKEN       user access token
 *   X_ACCESS_SECRET      user access token secret
 *
 * Usage:
 *   const x = require('./lib/x-client');
 *   await x.postTweet({ text: 'hello world', dryRun: true });
 *   await x.postThread([{ text: 'first' }, { text: 'reply with link' }]);
 */

const crypto = require('crypto');
const axios = require('axios');

const TWEET_ENDPOINT = 'https://api.twitter.com/2/tweets';

// RFC 3986 percent-encoding — stricter than encodeURIComponent.
// OAuth 1.0a requires this exact set of un-reserved chars.
function rfc3986(str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/\*/g, '%2A')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
}

// Build the OAuth 1.0a Authorization header for a given request.
// JSON-bodied POST — only oauth_* params go in the signature base string.
function buildAuthHeader({ method, url, consumerKey, consumerSecret, accessToken, accessSecret }) {
  const oauthParams = {
    oauth_consumer_key: consumerKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: '1.0',
  };

  // Param string: sorted keys, & joined, both key and value rfc3986-encoded.
  const paramString = Object.keys(oauthParams)
    .sort()
    .map(k => `${rfc3986(k)}=${rfc3986(oauthParams[k])}`)
    .join('&');

  const baseString = [
    method.toUpperCase(),
    rfc3986(url),
    rfc3986(paramString),
  ].join('&');

  const signingKey = `${rfc3986(consumerSecret)}&${rfc3986(accessSecret)}`;
  const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

  oauthParams.oauth_signature = signature;

  // Authorization header format: comma-separated key="value" pairs (quoted).
  const headerParts = Object.keys(oauthParams)
    .sort()
    .map(k => `${rfc3986(k)}="${rfc3986(oauthParams[k])}"`)
    .join(', ');

  return `OAuth ${headerParts}`;
}

function readCreds() {
  const required = ['X_API_KEY', 'X_API_SECRET', 'X_ACCESS_TOKEN', 'X_ACCESS_SECRET'];
  const missing = required.filter(k => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing X credentials in .env: ${missing.join(', ')}`);
  }
  return {
    consumerKey: process.env.X_API_KEY,
    consumerSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
  };
}

// Post a single tweet.
//
// opts:
//   text          required string, ≤280 chars
//   replyToId     optional tweet id to reply to (for threads)
//   dryRun        if true, prints to stdout and returns a stub id; never calls X
//
// Returns: { id, text } on success; throws on API error.
async function postTweet({ text, replyToId, dryRun }) {
  if (!text || typeof text !== 'string') {
    throw new Error('postTweet: text is required');
  }
  if (text.length > 280) {
    throw new Error(`postTweet: text exceeds 280 chars (${text.length})`);
  }

  if (dryRun) {
    console.log('--- DRY RUN — tweet NOT sent ---');
    if (replyToId) console.log(`(reply to ${replyToId})`);
    console.log(text);
    console.log(`--- ${text.length}/280 chars ---`);
    return { id: `dryrun-${Date.now()}`, text };
  }

  const creds = readCreds();
  const authHeader = buildAuthHeader({ method: 'POST', url: TWEET_ENDPOINT, ...creds });

  const body = { text };
  if (replyToId) body.reply = { in_reply_to_tweet_id: replyToId };

  const res = await axios.post(TWEET_ENDPOINT, body, {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
  });

  return { id: res.data.data.id, text: res.data.data.text };
}

// Post a thread — second tweet replies to first, third to second, etc.
//
// tweets: array of { text } objects
// dryRun: passes through
//
// Returns: array of { id, text } in order.
async function postThread(tweets, { dryRun } = {}) {
  if (!Array.isArray(tweets) || tweets.length === 0) {
    throw new Error('postThread: tweets array required');
  }
  const posted = [];
  let replyToId;
  for (const t of tweets) {
    const result = await postTweet({ text: t.text, replyToId, dryRun });
    posted.push(result);
    replyToId = result.id;
  }
  return posted;
}

module.exports = { postTweet, postThread };
