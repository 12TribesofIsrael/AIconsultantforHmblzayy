/**
 * HMBL Faith Walk — Twitch Auto-Clipper
 *
 * Monitors hmblzayy's Twitch stream and automatically:
 * 1. Detects high-engagement moments (chat spikes, donations, milestones)
 * 2. Records clips from the live stream
 * 3. Outputs clips ready for upload to TikTok, IG Reels, YouTube Shorts, X
 *
 * Usage:
 *   node scripts/twitch-clipper.js              # Monitor and clip live stream
 *   node scripts/twitch-clipper.js --vod <id>   # Clip from a past VOD
 *
 * Requires: ffmpeg installed (for video processing)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const CHANNEL = 'hmblzayy';
const CLIPS_DIR = path.join(__dirname, '..', 'output', 'clips');
const CLIP_DURATION = 60; // seconds per clip
const CHAT_SPIKE_THRESHOLD = 15; // messages per 10 seconds = "moment"
const CHECK_INTERVAL = 10000; // check chat activity every 10 seconds

// Ensure output directories exist
['vertical', 'wide', 'square'].forEach(format => {
  fs.mkdirSync(path.join(CLIPS_DIR, format), { recursive: true });
});

// ==========================================
// TWITCH API HELPERS
// ==========================================

const TWITCH_GQL_URL = 'https://gql.twitch.tv/gql';
const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';

function twitchGQL(query) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(query);
    const options = {
      hostname: 'gql.twitch.tv',
      path: '/gql',
      method: 'POST',
      headers: {
        'Client-ID': CLIENT_ID,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function getStreamInfo() {
  const result = await twitchGQL([{
    operationName: 'StreamMetadata',
    variables: { channelLogin: CHANNEL },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: 'a647c2a13599e5991e175155f798ca7f1ecddde73f7f341f39009c14571c11c1'
      }
    }
  }]);

  const user = result[0]?.data?.user;
  const stream = user?.stream;

  return {
    isLive: !!stream,
    title: stream?.title || user?.lastBroadcast?.title || '',
    viewerCount: stream?.viewersCount || 0,
    game: stream?.game?.name || '',
  };
}

async function getStreamPlaybackURL() {
  const result = await twitchGQL({
    operationName: 'PlaybackAccessToken_Template',
    query: `query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {
      streamPlaybackAccessToken(channelName: $login, params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}) @include(if: $isLive) {
        value
        signature
        __typename
      }
    }`,
    variables: {
      isLive: true,
      login: CHANNEL,
      isVod: false,
      vodID: '',
      playerType: 'site',
    },
  });

  const token = result?.data?.streamPlaybackAccessToken;
  if (!token) return null;

  return `https://usher.ttvnw.net/api/channel/hls/${CHANNEL}.m3u8?sig=${token.signature}&token=${encodeURIComponent(token.value)}`;
}

// ==========================================
// CHAT MONITOR (via IRC)
// ==========================================

class ChatMonitor {
  constructor(channel) {
    this.channel = channel;
    this.messageBuffer = [];
    this.moments = [];
    this.ws = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const net = require('net');
      const tls = require('tls');

      this.socket = tls.connect(6697, 'irc.chat.twitch.tv', () => {
        // Anonymous login (no auth needed for reading)
        this.socket.write('NICK justinfan12345\r\n');
        this.socket.write(`JOIN #${this.channel}\r\n`);
        console.log(`  Connected to #${this.channel} chat`);
        resolve();
      });

      this.socket.on('data', (data) => {
        const messages = data.toString().split('\r\n');
        messages.forEach(msg => {
          // Respond to PING
          if (msg.startsWith('PING')) {
            this.socket.write('PONG :tmi.twitch.tv\r\n');
            return;
          }

          // Parse chat messages
          const chatMatch = msg.match(/:(\w+)!\w+@\w+\.tmi\.twitch\.tv PRIVMSG #\w+ :(.+)/);
          if (chatMatch) {
            this.messageBuffer.push({
              user: chatMatch[1],
              message: chatMatch[2],
              timestamp: Date.now(),
            });
          }
        });
      });

      this.socket.on('error', reject);
    });
  }

  // Check for chat spikes (high engagement moments)
  checkForMoments() {
    const now = Date.now();
    const windowMs = 10000; // 10 second window
    const recentMessages = this.messageBuffer.filter(m => now - m.timestamp < windowMs);

    // Clean old messages
    this.messageBuffer = this.messageBuffer.filter(m => now - m.timestamp < 60000);

    if (recentMessages.length >= CHAT_SPIKE_THRESHOLD) {
      // Check for specific triggers
      const messages = recentMessages.map(m => m.message.toLowerCase());
      const hasHype = messages.some(m =>
        m.includes('!') || m.includes('🔥') || m.includes('❤') ||
        m.includes('pray') || m.includes('amen') || m.includes('god') ||
        m.includes('state') || m.includes('milestone') || m.includes('wow')
      );

      if (hasHype) {
        return {
          type: 'chat_spike',
          messageCount: recentMessages.length,
          timestamp: now,
          sampleMessages: recentMessages.slice(0, 5).map(m => `${m.user}: ${m.message}`),
        };
      }
    }

    // Check for donation/sub messages
    const donationMessages = recentMessages.filter(m =>
      m.message.includes('just subscribed') ||
      m.message.includes('donated') ||
      m.message.includes('bits')
    );

    if (donationMessages.length > 0) {
      return {
        type: 'donation',
        messageCount: donationMessages.length,
        timestamp: now,
      };
    }

    return null;
  }

  disconnect() {
    if (this.socket) this.socket.end();
  }
}

// ==========================================
// CLIP RECORDER
// ==========================================

async function recordClip(streamUrl, clipName, duration = CLIP_DURATION) {
  const rawPath = path.join(CLIPS_DIR, `${clipName}_raw.mp4`);

  console.log(`\n  🎬 Recording ${duration}s clip: ${clipName}`);

  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', [
      '-i', streamUrl,
      '-t', String(duration),
      '-c', 'copy',
      '-y',
      rawPath,
    ], { stdio: ['pipe', 'pipe', 'pipe'] });

    ffmpeg.on('close', (code) => {
      if (code === 0 && fs.existsSync(rawPath)) {
        console.log(`  ✓ Raw clip saved: ${rawPath}`);
        resolve(rawPath);
      } else {
        reject(new Error(`ffmpeg exited with code ${code}`));
      }
    });

    ffmpeg.on('error', reject);
  });
}

// ==========================================
// CLIP FORMATTER (multi-platform)
// ==========================================

async function formatClip(rawPath, clipName) {
  const formats = [
    {
      name: 'vertical',
      args: ['-vf', 'crop=ih*9/16:ih,scale=1080:1920', '-c:a', 'aac', '-b:a', '128k'],
      suffix: '_vertical.mp4',
    },
    {
      name: 'wide',
      args: ['-vf', 'scale=1920:1080', '-c:a', 'aac', '-b:a', '128k'],
      suffix: '_wide.mp4',
    },
    {
      name: 'square',
      args: ['-vf', 'crop=ih:ih,scale=1080:1080', '-c:a', 'aac', '-b:a', '128k'],
      suffix: '_square.mp4',
    },
  ];

  const outputs = [];

  for (const format of formats) {
    const outPath = path.join(CLIPS_DIR, format.name, `${clipName}${format.suffix}`);

    try {
      execSync([
        'ffmpeg',
        '-i', rawPath,
        ...format.args,
        '-y', outPath,
      ].join(' '), { stdio: 'pipe' });

      outputs.push({ format: format.name, path: outPath });
      console.log(`  ✓ ${format.name}: ${outPath}`);
    } catch (err) {
      console.log(`  ✗ ${format.name} failed: ${err.message}`);
    }
  }

  // Clean up raw file
  try { fs.unlinkSync(rawPath); } catch (e) {}

  return outputs;
}

// ==========================================
// CAPTION GENERATOR
// ==========================================

function generateCaption(moment, streamTitle) {
  const dayMatch = streamTitle.match(/DAY\s+(\d+)/i);
  const day = dayMatch ? dayMatch[1] : '?';

  const captions = {
    chat_spike: [
      `Day ${day} of the Faith Walk 🙏🏾 The chat went CRAZY 🔥 #faithwalk #hmbl #phillytocali`,
      `Walking 3,000 miles for GOD. Day ${day} 🚶🏾‍♂️🙏🏾 #hmbl #faithwalk #ministerzay`,
      `This moment on Day ${day}... 🔥🙏🏾 Stay Humble Stay Hungry #hmbl #faithwalk`,
    ],
    donation: [
      `The support on Day ${day} is REAL 🙏🏾💯 #faithwalk #hmbl #phillytocali`,
      `Y'all showing love on Day ${day} of the Faith Walk 🙏🏾 #hmbl #stayhumblestayhungry`,
    ],
    default: [
      `Day ${day} — Philly to Cali Faith Walk 🙏🏾🚶🏾‍♂️ 3,000 miles for GOD #hmbl #faithwalk`,
      `Still walking. Still praying. Day ${day} 🙏🏾 #faithwalk #hmbl #ministerzay`,
    ],
  };

  const pool = captions[moment?.type] || captions.default;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ==========================================
// MAIN LOOP
// ==========================================

async function main() {
  console.log('=== HMBL Faith Walk — Twitch Auto-Clipper ===\n');

  // Check if ffmpeg is available
  try {
    execSync('ffmpeg -version', { stdio: 'pipe' });
  } catch {
    console.error('ERROR: ffmpeg is not installed. Install it first:');
    console.error('  winget install ffmpeg');
    console.error('  or: choco install ffmpeg');
    process.exit(1);
  }

  // Check stream status
  console.log('Checking stream status...');
  const streamInfo = await getStreamInfo();

  if (!streamInfo.isLive) {
    console.log(`\n${CHANNEL} is OFFLINE.`);
    console.log(`Last title: ${streamInfo.title}`);
    console.log('\nOptions:');
    console.log('  1. Wait for stream to go live and run again');
    console.log('  2. Use --vod <id> to clip from a past broadcast');
    process.exit(0);
  }

  console.log(`\n🔴 ${CHANNEL} is LIVE!`);
  console.log(`  Title: ${streamInfo.title}`);
  console.log(`  Viewers: ${streamInfo.viewerCount}`);
  console.log(`  Game: ${streamInfo.game || 'N/A'}`);

  // Get stream URL
  console.log('\nGetting stream URL...');
  const streamUrl = await getStreamPlaybackURL();
  if (!streamUrl) {
    console.error('Could not get stream playback URL');
    process.exit(1);
  }
  console.log('  ✓ Stream URL acquired');

  // Connect to chat
  console.log('\nConnecting to chat...');
  const chat = new ChatMonitor(CHANNEL);
  await chat.connect();

  let clipCount = 0;
  const maxClips = 10; // Max clips per session

  console.log(`\nMonitoring for high-engagement moments...`);
  console.log(`  Chat spike threshold: ${CHAT_SPIKE_THRESHOLD} msgs / 10 sec`);
  console.log(`  Clip duration: ${CLIP_DURATION}s`);
  console.log(`  Max clips: ${maxClips}`);
  console.log(`  Output: ${CLIPS_DIR}/\n`);

  // Monitor loop
  const interval = setInterval(async () => {
    const moment = chat.checkForMoments();

    if (moment && clipCount < maxClips) {
      clipCount++;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const clipName = `faithwalk_${timestamp}_${moment.type}`;

      console.log(`\n🔥 MOMENT DETECTED: ${moment.type} (${moment.messageCount} messages)`);
      if (moment.sampleMessages) {
        moment.sampleMessages.forEach(m => console.log(`    ${m}`));
      }

      try {
        // Record clip
        const rawPath = await recordClip(streamUrl, clipName);

        // Format for all platforms
        const outputs = await formatClip(rawPath, clipName);

        // Generate caption
        const caption = generateCaption(moment, streamInfo.title);
        const captionPath = path.join(CLIPS_DIR, `${clipName}_caption.txt`);
        fs.writeFileSync(captionPath, caption);
        console.log(`  📝 Caption: ${caption}`);

        console.log(`\n  ✓ Clip ${clipCount}/${maxClips} complete!`);
        console.log(`    Formats: ${outputs.map(o => o.format).join(', ')}`);

      } catch (err) {
        console.error(`  ✗ Clip failed: ${err.message}`);
        clipCount--; // Don't count failed clips
      }
    }

    if (clipCount >= maxClips) {
      console.log(`\n✓ Reached max clips (${maxClips}). Session complete!`);
      console.log(`  Clips saved to: ${CLIPS_DIR}/`);
      clearInterval(interval);
      chat.disconnect();
    }
  }, CHECK_INTERVAL);

  // Also record a clip every 20 minutes regardless (baseline content)
  const baselineInterval = setInterval(async () => {
    if (clipCount >= maxClips) {
      clearInterval(baselineInterval);
      return;
    }

    clipCount++;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const clipName = `faithwalk_${timestamp}_baseline`;

    console.log(`\n📹 Baseline clip ${clipCount}/${maxClips}...`);

    try {
      const rawPath = await recordClip(streamUrl, clipName, 45);
      const outputs = await formatClip(rawPath, clipName);
      const caption = generateCaption(null, streamInfo.title);
      fs.writeFileSync(path.join(CLIPS_DIR, `${clipName}_caption.txt`), caption);
      console.log(`  📝 Caption: ${caption}`);
    } catch (err) {
      console.error(`  ✗ Baseline clip failed: ${err.message}`);
      clipCount--;
    }
  }, 20 * 60 * 1000); // Every 20 minutes

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\nShutting down clipper...');
    clearInterval(interval);
    clearInterval(baselineInterval);
    chat.disconnect();
    console.log(`Clips saved: ${clipCount}`);
    console.log(`Output: ${CLIPS_DIR}/`);
    process.exit(0);
  });
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
