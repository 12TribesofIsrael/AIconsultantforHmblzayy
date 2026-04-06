/**
 * Discord Server Scraper for HMBL University
 * Pulls all channels, roles, messages, pins, and media attachments
 *
 * Usage: node scripts/discord-scraper.js
 * Requires: DISCORD_BOT_TOKEN and DISCORD_GUILD_ID in .env
 */

const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;

if (!TOKEN || !GUILD_ID) {
  console.error('Missing DISCORD_BOT_TOKEN or DISCORD_GUILD_ID in .env');
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, '..', 'research', 'discord');
const FOOTAGE_DIR = path.join(__dirname, '..', 'assets', 'footage');

// Ensure directories exist
[OUTPUT_DIR, FOOTAGE_DIR].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const guild = await client.guilds.fetch(GUILD_ID);
  console.log(`Connected to: ${guild.name} (${guild.memberCount} members)`);

  const report = {
    server: {
      name: guild.name,
      id: guild.id,
      memberCount: guild.memberCount,
      description: guild.description,
      createdAt: guild.createdAt.toISOString(),
      icon: guild.iconURL({ size: 512 }),
    },
    channels: [],
    roles: [],
    mediaFiles: [],
  };

  // Fetch roles
  const roles = await guild.roles.fetch();
  report.roles = roles.map(r => ({
    name: r.name,
    color: r.hexColor,
    memberCount: r.members?.size || 0,
    position: r.position,
  })).sort((a, b) => b.position - a.position);

  console.log(`Found ${report.roles.length} roles`);

  // Fetch channels
  const channels = await guild.channels.fetch();
  const textChannels = channels.filter(c => c.type === 0 || c.type === 5); // text + announcement

  for (const [, channel] of textChannels) {
    console.log(`Scanning #${channel.name}...`);

    const channelData = {
      name: channel.name,
      id: channel.id,
      topic: channel.topic,
      category: channel.parent?.name || 'Uncategorized',
      messageCount: 0,
      recentMessages: [],
      pins: [],
      media: [],
    };

    try {
      // Fetch recent messages (last 100)
      const messages = await channel.messages.fetch({ limit: 100 });
      channelData.messageCount = messages.size;

      for (const [, msg] of messages) {
        const msgData = {
          author: msg.author.username,
          content: msg.content?.substring(0, 500),
          timestamp: msg.createdAt.toISOString(),
          attachments: [],
        };

        // Track media attachments
        for (const [, attachment] of msg.attachments) {
          const ext = path.extname(attachment.name).toLowerCase();
          const isVideo = ['.mp4', '.mov', '.avi', '.webm'].includes(ext);
          const isImage = ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);

          const fileInfo = {
            name: attachment.name,
            url: attachment.url,
            size: attachment.size,
            type: isVideo ? 'video' : isImage ? 'image' : 'other',
            channel: channel.name,
          };

          msgData.attachments.push(fileInfo);

          if (isVideo || isImage) {
            report.mediaFiles.push(fileInfo);
          }
        }

        channelData.recentMessages.push(msgData);
      }

      // Fetch pinned messages
      const pins = await channel.messages.fetchPinned();
      channelData.pins = pins.map(p => ({
        author: p.author.username,
        content: p.content?.substring(0, 500),
        timestamp: p.createdAt.toISOString(),
      }));

    } catch (err) {
      channelData.error = `Could not access: ${err.message}`;
    }

    report.channels.push(channelData);
  }

  // Save full report as JSON
  const jsonPath = path.join(OUTPUT_DIR, 'server-data.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(`\nFull report saved to: ${jsonPath}`);

  // Save human-readable summary
  let summary = `# HMBL University — Discord Server Audit\n\n`;
  summary += `## Server Info\n`;
  summary += `- **Name:** ${report.server.name}\n`;
  summary += `- **Members:** ${report.server.memberCount}\n`;
  summary += `- **Created:** ${report.server.createdAt}\n`;
  summary += `- **Description:** ${report.server.description || 'None'}\n\n`;

  summary += `## Roles (${report.roles.length})\n`;
  report.roles.forEach(r => {
    summary += `- ${r.name} (${r.color}) — ${r.memberCount} members\n`;
  });

  summary += `\n## Channels (${report.channels.length})\n`;
  const categories = [...new Set(report.channels.map(c => c.category))];
  categories.forEach(cat => {
    summary += `\n### ${cat}\n`;
    report.channels.filter(c => c.category === cat).forEach(ch => {
      summary += `- **#${ch.name}** — ${ch.topic || 'No topic'} (${ch.messageCount} recent msgs, ${ch.pins.length} pins)\n`;
    });
  });

  summary += `\n## Media Files Found (${report.mediaFiles.length})\n`;
  const videos = report.mediaFiles.filter(f => f.type === 'video');
  const images = report.mediaFiles.filter(f => f.type === 'image');
  summary += `- **Videos:** ${videos.length}\n`;
  summary += `- **Images:** ${images.length}\n\n`;

  if (videos.length > 0) {
    summary += `### Videos\n`;
    videos.forEach(v => {
      const sizeMB = (v.size / 1024 / 1024).toFixed(1);
      summary += `- \`${v.name}\` (${sizeMB} MB) — from #${v.channel}\n`;
    });
  }

  const summaryPath = path.join(OUTPUT_DIR, 'server-audit.md');
  fs.writeFileSync(summaryPath, summary);
  console.log(`Summary saved to: ${summaryPath}`);

  // List video files for download
  if (videos.length > 0) {
    console.log(`\n=== VIDEO FILES FOUND ===`);
    videos.forEach(v => {
      console.log(`  ${v.name} (${(v.size / 1024 / 1024).toFixed(1)} MB) — #${v.channel}`);
    });
    console.log(`\nRun: node scripts/download-footage.js to download all videos`);
  }

  client.destroy();
  console.log('\nDone!');
});

client.login(TOKEN);
