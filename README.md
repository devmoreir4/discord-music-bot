<h1 align="center">
    <a href="https://github.com/devmoreir4/discord-music-bot">
      <img src="./.github/capyvibes-gh-logo.svg" alt="CapyVibes Logo" width="300">
    </a>
</h1>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#commands">Commands</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.10.2+-green?style=flat-square&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Discord.js-14.17.3+-blue?style=flat-square&logo=discord" alt="Discord.js">
  <img src="https://img.shields.io/badge/TypeScript-5.7.2+-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Docker%20Compose-2.38%2B-blue?style=flat-square&logo=docker" alt="Docker Compose">
  <img src="https://img.shields.io/badge/FFmpeg-5.2.0%2B-red?style=flat-square&logo=ffmpeg" alt="FFmpeg">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License">
</p>

<h2 id="features">Features</h2>

- **YouTube Music Playback**: Play music directly from YouTube.
- **Smart Search**: Find songs by name with interactive search results.
- **Queue Management**: Add, view, remove, and manage songs in the queue.
- **Playback Controls**: Play, pause, resume, skip, stop, and adjust volume.
- **Interactive Commands**: Interactive and informative commands.
- **Real-time Updates**: Live queue display and now playing information.
- **Easy Setup**: Easy deployment with Docker.
- **Logging System**: Smart logs based on environment.

<h2 id="getting-started">Getting Started</h2>

### Prerequisites
- Docker and Docker Compose
- [Discord Bot Token](https://discord.com/developers/applications)

### 1. Clone Repository
```bash
git clone https://github.com/devmoreir4/discord-music-bot.git
cd discord-music-bot
```

### 2. Configure Environment
Create a `.env` file:
```env
DISCORD_TOKEN=your_bot_token
```

### 3. Run with Docker
```bash
# Start the bot
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the bot
docker-compose down
```

### 4. Invite Bot to Server
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your bot → OAuth2 → URL Generator
3. Select scopes: `bot`
4. Select permissions: `Send Messages`, `Connect`, `Speak`, `Use Voice Activity`
5. Copy URL and invite bot to your server


<h2 id="commands">Commands</h2>

### Music Commands
- **`!play <url>`** - Play a YouTube video
- **`!search <query>`** - Search for music on YouTube
- **`!pause`** - Pause the current song
- **`!resume`** - Resume the paused song
- **`!skip`** - Skip to the next song in queue
- **`!stop`** - Stop playback and clear the queue
- **`!queue`** - Show the current music queue
- **`!volume <0-100>`** - Set the playback volume
- **`!nowplaying`** - Show information about the current song

### Utility Commands
- **`!help`** - Display all available commands
- **`!ping`** - Check the bot's response time
- **`!userinfo [@user]`** - Get detailed information about a user
- **`!membercount`** - Show the server's member count
- **`!uptime`** - Display the bot's uptime
- **`!roll <sides>`** - Roll a dice with specified number of sides
- **`!remind <minutes> <message>`** - Set a personal reminder
- **`!clear <amount>`** - Delete messages from the channel (Admin)
- **`!setstatus <type> <message>`** - Change the bot's activity status (Admin)


## Configuration

### Environment Variables
```env
# Required
DISCORD_TOKEN=your_bot_token

# Optional
BOT_PREFIX=!                    # Command prefix
BOT_ACTIVITY=!help              # Bot activity text
BOT_ACTIVITY_TYPE=Playing       # Activity type (Playing/Listening/Watching/Streaming)
MAX_QUEUE_SIZE=30               # Maximum songs in queue
DEFAULT_VOLUME=0.5              # Default volume (0.0-1.0)
DISCONNECT_TIMEOUT=30000        # Auto-disconnect timeout (ms)
NODE_ENV=production             # Environment (development/production)
```

## Development

### Local Development
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run with auto-reload
npm run dev:watch

# Build for production
npm run build
```

<h2 id="license">License</h2>

This project is licensed under the [MIT License](LICENSE).
