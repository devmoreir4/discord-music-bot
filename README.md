# BeatKeeper Discord App

BeatKeeper is a Discord app focused on playing music from a local library, while also offering additional features and extra commands for server management and fun.

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v20.17.0 or higher.
- [npm](https://www.npmjs.com/) (usually comes with Node.js).
- **FFmpeg:** Required for audio processing and transcoding.  
  - You can install FFmpeg globally or use the [ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static) package.

### Installation Steps

1. **Clone the Repository:**

```bash
git clone https://github.com/devmoreir4/discord-bot.git
cd BeatKeeper
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Configure Environment Variables:**

Rename the .env.example file to .env and add your Discord token:
```bash
DISCORD_TOKEN=your_discord_token_here
```

NOTE: You can get your token from the [discord developer portal](https://discord.com/developers/applications).
<br>

4. **Add Your Music Library:**

Place your audio files (mp3, webm, wav, etc.) into the /musics folder.

5. **Compile and Start the App:**

For development, you can run:

```bash
npm run dev
```

To compile and run the app:

```bash
npm run build
npm start
```

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.