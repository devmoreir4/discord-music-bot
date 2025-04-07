# 🤖 BeatKeeper Discord App

**BeatKeeper** is a Discord application focused on playing music from a local library while also offering various extra commands for server management and fun features.

## ✨ Features

- **Local Music Playback:** Play music files stored locally in various formats.
- **Queue Management:** View, add, remove, and manage the music queue.
- **Playback Controls:** Commands for play, pause, resume, skip, stop, and volume adjustment.
- **Extra Commands:** Additional functionalities for server administration and interactivity.

## 🚀 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v20.17.0 or higher.
- **FFmpeg:** Required for audio processing and transcoding.
  - You can install FFmpeg globally or use the [ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static) package.

### Installation Steps

1. **Clone the Repository:**

```bash
git clone https://github.com/devmoreir4/discord-music-app.git
cd discord-music-app
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

Note: You can get your token from the [discord developer portal](https://discord.com/developers/applications).

4. **Add Your Music Library:**

Place your audio files (mp3, webm, wav, etc.) into the /musics folder.

5. **Compile and Start the App:**

- For development, you can run:

  ```bash
  npm run dev
  ```

- To compile and run the app:
  ```bash
  npm run build
  npm start
  ```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## 📝 License

This project is licensed under the [MIT License](LICENSE).
