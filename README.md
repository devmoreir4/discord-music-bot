<h1 align="center">
    <a href="https://github.com/devmoreir4/discord-music-bot">
      <img src="./.github/capyvibes-gh-logo.svg" alt="CapyVibes Logo" width="300">
    </a>
</h1>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <i align="center">A modern Discord bot focused on high-quality music, with a relaxing capybara vibe.</i>
</p>

<p align="center">
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-22.10.2+-green?style=flat-square&logo=node.js" alt="Node.js">
  </a>
  <a href="https://discord.js.org/">
    <img src="https://img.shields.io/badge/Discord.js-14.17.3+-blue?style=flat-square&logo=discord" alt="Discord.js">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.7.2+-blue?style=flat-square&logo=typescript" alt="TypeScript">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License">
  </a>
</p>


<h2 id="features">✨ Features</h2>
<ul>
  <li><strong>YouTube Music Playback:</strong> Play music directly from YouTube links or search by song name.</li>
  <li><strong>Queue Management:</strong> Add, view, remove, and manage songs in the queue.</li>
  <li><strong>Playback Controls:</strong> Play, pause, resume, skip, stop, and adjust volume.</li>
  <li><strong>Utility Commands:</strong> Polls, dice roll, reminders, user info, and more.</li>
  <li><strong>Easy Setup:</strong> Quick to deploy and configure.</li>
</ul>


<h2>📦 Requirements</h2>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a> v22.10.2 or higher.</li>
  <li>
    <a href="https://ffmpeg.org/">FFmpeg</a> (for audio processing).
    <ul>
      <li>Install globally or use the <a href="https://www.npmjs.com/package/ffmpeg-static">ffmpeg-static</a> package.</li>
    </ul>
  </li>
</ul>


<h2 id="getting-started">🚀 Getting Started</h2>

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/devmoreir4/discord-music-bot.git
    cd discord-music-bot
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    -   Copy `.env.example` to `.env` and add your Discord bot token:
        ```env
        DISCORD_TOKEN=your_discord_token_here
        ```
    -   Get your token from the [Discord Developer Portal](https://discord.com/developers/applications).
4.  **Invite the bot to your server:**
    -   In the Developer Portal, go to Installation.
    -   Copy and open the generated URL to invite the bot.
5.  **Run the bot:**
    -   For development (with auto-reload):
        ```bash
        npm run dev:watch
        ```
    -   For development (manual):
        ```bash
        npm run dev
        ```
    -   For production:
        ```bash
        npm run build
        npm start
        ```


<h2>🎧 Usage & Commands</h2>
<h3>Music</h3>

| Command | Function |
| :--- | :--- |
| **`!play`** | Plays a song from a YouTube URL. |
| **`!search`** | Search for music on YouTube by name and choose from results. |
| **`!pause`** | Pauses the currently playing track. |
| **`!resume`**| Resumes playback if the music is paused. |
| **`!skip`** | Skips the current song and immediately starts the next one in the queue. |
| **`!stop`** | Stops the music completely and clears the entire song queue. |
| **`!queue`** | Displays the current list of songs waiting to be played. |
| **`!remove`**| Removes a specific song from the queue by its index number. |
| **`!volume`**| Adjusts the playback volume from 0 to 100. |
| **`!nowplaying`**| Shows information about the currently playing song. |

<h3>Utility Commands</h3>

| Command | Function |
| :--- | :--- |
| **`!help`** | Displays a helpful message with all available commands. |
| **`!ping`** | Checks the bot's response time to see if it's running smoothly. |
| **`!avatar`**| Shows a larger version of a user's profile picture. |
| **`!userinfo`**| Provides detailed information about a server member. |
| **`!membercount`**| Shows the total number of members currently in the server. |
| **`!roll`** | Rolls a virtual dice with a specified number of sides. |
| **`!poll`** | Starts a simple poll with one question and two options. |
| **`!remind`**| Sets a personal reminder. The bot will DM you a message after the set time. |
| **`!clear`** | *(Admin Only)* Deletes a specified number of recent messages from a channel. |
| **`!setstatus`**| *(Admin Only)* Changes the bot's status message. |
| **`!uptime`** | Shows how long the bot has been online without interruption. |


<h2 id="license">📄 License</h2>

This project is licensed under the [MIT License](LICENSE). Contributions are welcome!
