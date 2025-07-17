<h1 align="center">
    <a href="https://github.com/devmoreir4/discord-music-bot/#gh-light-mode-only">
      <img src="./.github/capyvibes_gh_logo.svg" alt="CapyVibes Logo" width="300">
    </a>
</h1>

<p align="center">
  <i align="center">A modern Discord bot focused on high-quality music, with a relaxing capybara vibe.</i>
</p>


## 🚀 Features

- **YouTube Music Playback:** Play music directly from YouTube links.
- **Queue Management:** Add, view, remove, and manage songs in the queue.
- **Playback Controls:** Play, pause, resume, skip, stop, and adjust volume.
- **Fun & Utility Commands:** Polls, dice roll, reminders, user info, and more.
- **Modern Embeds:** All bot responses use beautiful, consistent Discord embeds.
- **Easy Setup:** Quick to deploy and configure.


## 📦 Requirements

- [Node.js](https://nodejs.org/) v20.17.0 or higher
- [FFmpeg](https://ffmpeg.org/) (for audio processing)
  - Install globally or use the [ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static) package


## 🛠️ Installation

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
    -   For development:
        ```bash
        npm run dev
        ```
    -   For production:
        ```bash
        npm run build
        npm start
        ```


## 🎧 Usage & Commands

### Music

-   `!play <YouTube URL>` — Play a song from YouTube
-   `!pause` — Pause the current song
-   `!resume` — Resume playback
-   `!skip` — Skip to the next song
-   `!stop` — Stop playback and clear the queue
-   `!queue` — Show the current music queue
-   `!remove <index>` — Remove a song from the queue
-   `!volume <0-100>` — Set the playback volume

### General & Fun

-   `!help` — Show all commands
-   `!ping` — Show bot latency
-   `!avatar <user>` — Show a user's avatar
-   `!userinfo <user>` — Show user info
-   `!membercount` — Show server member count
-   `!roll <number>` — Roll a dice
-   `!poll <question> - <option1> - <option2>` — Start a poll
-   `!remind <minutes> <message>` — Set a reminder
-   `!clear <amount>` — Delete messages (admin only)
-   `!setstatus <type> <message>` — Change bot status (admin only)
-   `!uptime` — Show bot uptime


## 📄 License

This project is licensed under the [MIT License](LICENSE). Contributions are welcome!
