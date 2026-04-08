/**
 * HMBL Faith Walk — Twitch Chatbot
 *
 * Custom commands for hmblzayy's Twitch chat:
 *   !progress  — Current day, miles, location
 *   !route     — Link to the live Faith Walk tracker
 *   !shop      — Link to HMBL store
 *   !support   — How to support the walk
 *   !socials   — All social media links
 *   !pray      — Random prayer/blessing message
 *   !milestone — Next milestone info
 *   !stats     — Walk statistics
 *
 * Usage:
 *   node scripts/twitch-chatbot.js
 *
 * Requires:
 *   TWITCH_BOT_TOKEN in .env (OAuth token for the bot account)
 *   Get one at: https://twitchapps.com/tmi/
 */

const tls = require('tls');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const CHANNEL = 'hmblzayy';
const BOT_USERNAME = process.env.TWITCH_BOT_USERNAME || 'hmbl_automations';
const BOT_TOKEN = process.env.TWITCH_BOT_TOKEN || '';
const CHECKPOINTS_PATH = path.join(__dirname, '..', 'src', 'faith-walk-tracker', 'checkpoints.json');
const TRACKER_URL = 'https://12tribesofisrael.github.io/AIconsultantforHmblzayy/docs/faith-walk-tracker.html';
const TOTAL_MILES = 3000;

// ==========================================
// LOAD CHECKPOINT DATA
// ==========================================

function getCheckpoints() {
  return JSON.parse(fs.readFileSync(CHECKPOINTS_PATH, 'utf8'));
}

function getCurrentCheckpoint() {
  const checkpoints = getCheckpoints();
  return checkpoints[checkpoints.length - 1];
}

// ==========================================
// STATE MILESTONES
// ==========================================

const STATE_MILESTONES = [
  { state: 'Pennsylvania', miles: 0, emoji: '🏠' },
  { state: 'Ohio', miles: 350, emoji: '🌾' },
  { state: 'Indiana', miles: 550, emoji: '🏎' },
  { state: 'Illinois', miles: 750, emoji: '🌆' },
  { state: 'Missouri', miles: 1000, emoji: '🌊' },
  { state: 'Kansas', miles: 1250, emoji: '🌻' },
  { state: 'Colorado', miles: 1500, emoji: '🏔' },
  { state: 'New Mexico', miles: 1900, emoji: '🌵' },
  { state: 'Arizona', miles: 2200, emoji: '🏜' },
  { state: 'California', miles: 2700, emoji: '🌴' },
];

// ==========================================
// PRAYER MESSAGES
// ==========================================

const PRAYERS = [
  "Lord, protect Zay's every step on this walk. Cover him with Your grace 🙏🏾",
  "All Praises to The Most High — this Faith Walk is a testament to His power 🙏🏾",
  "May God bless every mile, every prayer, every person touched by this journey 🙏🏾",
  "The walk is physical, but the mission is spiritual. Keep praying y'all 🙏🏾",
  "3,000 miles of faith. Every step is a prayer. God is good 🙏🏾",
  "Father, give Zay strength for every hill, every storm, every mile ahead 🙏🏾",
  "This walk proves that faith without works is dead. Keep going King 🙏🏾",
  "May the road rise to meet him and the wind be at his back 🙏🏾",
  "He that walks with God always reaches his destination 🙏🏾",
  "Every mile is a prayer. Every step is a blessing. Stay Humble Stay Hungry 🙏🏾",
];

// ==========================================
// COMMAND HANDLERS
// ==========================================

const commands = {
  '!progress': () => {
    const cp = getCurrentCheckpoint();
    const pct = ((cp.miles / TOTAL_MILES) * 100).toFixed(1);
    return `📍 Day ${cp.day} — ${cp.location} | ${cp.miles}/${TOTAL_MILES} miles (${pct}%) | ${TOTAL_MILES - cp.miles} miles to go! 🚶🏾‍♂️🌴`;
  },

  '!route': () => {
    return `🗺 Watch the Faith Walk progress LIVE: ${TRACKER_URL} 🙏🏾`;
  },

  '!shop': () => {
    return `🛒 Shop HMBL — Stay Humble Stay Hungry: https://stayhumblestayhungryclothing.com | Free shipping over $100! 🔥`;
  },

  '!support': () => {
    return `🙏🏾 Support the Faith Walk: Follow @hmblzay on IG | Shop at stayhumblestayhungryclothing.com | Subscribe here on Twitch | Share the stream! Every bit helps 💯`;
  },

  '!socials': () => {
    return `📱 IG: @hmblzay @ministerzay | TikTok: @ministerzay | X: @minister_zay | Shop: stayhumblestayhungryclothing.com | Twitch: hmblzayy 🔥`;
  },

  '!pray': () => {
    return PRAYERS[Math.floor(Math.random() * PRAYERS.length)];
  },

  '!milestone': () => {
    const cp = getCurrentCheckpoint();
    const nextMilestone = STATE_MILESTONES.find(m => m.miles > cp.miles);
    if (nextMilestone) {
      const milesTo = nextMilestone.miles - cp.miles;
      return `${nextMilestone.emoji} Next state: ${nextMilestone.state} — ${milesTo} miles away! Currently at ${cp.miles} miles. Keep going! 🚶🏾‍♂️`;
    }
    return `🌴 Almost to California! The finish line is close! 🔥🙏🏾`;
  },

  '!stats': () => {
    const checkpoints = getCheckpoints();
    const cp = checkpoints[checkpoints.length - 1];
    const avgMiles = (cp.miles / cp.day).toFixed(1);
    const daysRemaining = Math.ceil((TOTAL_MILES - cp.miles) / avgMiles);
    const states = new Set(checkpoints.map(c => c.location.split(', ')[1])).size;
    return `📊 Day ${cp.day} | ${cp.miles} miles | ${avgMiles} mi/day avg | ${states} states | ~${daysRemaining} days remaining | ${((cp.miles/TOTAL_MILES)*100).toFixed(1)}% complete 🚶🏾‍♂️`;
  },

  '!faith': () => {
    return `✝ Matthew 6:33 — "But seek first his kingdom and his righteousness, and all these things will be given to you as well." 🙏🏾`;
  },

  '!hmbl': () => {
    return `HMBL — Stay Humble Stay Hungry 🔥 4 stores: Willow Grove, Fashion District, Morristown, Palisades Center | Shop: stayhumblestayhungryclothing.com 🛒`;
  },
};

// Cooldown tracking (prevent spam)
const cooldowns = {};
const COOLDOWN_MS = 10000; // 10 seconds between same command

function isOnCooldown(cmd) {
  const now = Date.now();
  if (cooldowns[cmd] && now - cooldowns[cmd] < COOLDOWN_MS) return true;
  cooldowns[cmd] = now;
  return false;
}

// ==========================================
// IRC CONNECTION
// ==========================================

function connect() {
  console.log('=== HMBL Faith Walk — Twitch Chatbot ===\n');

  const useAnonymous = !BOT_TOKEN;

  if (useAnonymous) {
    console.log('⚠  No TWITCH_BOT_TOKEN found in .env');
    console.log('   Running in READ-ONLY mode (can monitor but not send messages)');
    console.log('   To enable responses, add TWITCH_BOT_TOKEN to .env');
    console.log('   Get one at: https://twitchapps.com/tmi/\n');
  }

  const socket = tls.connect(6697, 'irc.chat.twitch.tv', () => {
    if (useAnonymous) {
      socket.write('NICK justinfan12345\r\n');
    } else {
      socket.write(`PASS oauth:${BOT_TOKEN}\r\n`);
      socket.write(`NICK ${BOT_USERNAME}\r\n`);
    }
    socket.write(`JOIN #${CHANNEL}\r\n`);
    console.log(`Connected to #${CHANNEL} chat ${useAnonymous ? '(read-only)' : '(interactive)'}\n`);
    console.log('Available commands:');
    Object.keys(commands).forEach(cmd => console.log(`  ${cmd}`));
    console.log('\nListening...\n');
  });

  socket.on('data', (data) => {
    const messages = data.toString().split('\r\n');

    messages.forEach(msg => {
      // Respond to PING
      if (msg.startsWith('PING')) {
        socket.write('PONG :tmi.twitch.tv\r\n');
        return;
      }

      // Parse chat messages
      const chatMatch = msg.match(/:(\w+)!\w+@\w+\.tmi\.twitch\.tv PRIVMSG #(\w+) :(.+)/);
      if (!chatMatch) return;

      const user = chatMatch[1];
      const message = chatMatch[3].trim();

      // Log all chat
      const time = new Date().toLocaleTimeString();
      console.log(`[${time}] ${user}: ${message}`);

      // Check for commands
      const cmd = message.toLowerCase().split(' ')[0];
      if (commands[cmd] && !isOnCooldown(cmd)) {
        const response = commands[cmd]();
        console.log(`  → BOT: ${response}`);

        if (!useAnonymous) {
          socket.write(`PRIVMSG #${CHANNEL} :${response}\r\n`);
        }
      }
    });
  });

  socket.on('error', (err) => {
    console.error('Connection error:', err.message);
    console.log('Reconnecting in 5 seconds...');
    setTimeout(connect, 5000);
  });

  socket.on('close', () => {
    console.log('Disconnected. Reconnecting in 5 seconds...');
    setTimeout(connect, 5000);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down chatbot...');
    socket.end();
    process.exit(0);
  });
}

connect();
