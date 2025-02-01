import { Command } from "../utils/commandLoader";
import { joinChannel } from "../utils/musicManager";
import path from "path";
import fs from "fs";

const MUSIC_DIR = path.join(__dirname, "../../musics");
const ALLOWED_EXTENSIONS = [".mp3", ".webm", ".wav", ".ogg", ".flac", ".aac"];

const play: Command = {
  name: "play",
  description: "Toca uma música da pasta local /musics. Use o nome ou o índice (conforme exibido em !list).",
  execute: async ({ message, args }) => {
    if (!message.member?.voice.channel) {
      return message.reply("Você precisa estar em um canal de voz para usar este comando.");
    }
    if (args.length === 0) {
      return message.reply("Por favor, informe o nome ou o índice da música.");
    }

    const files = fs
      .readdirSync(MUSIC_DIR)
      .filter(file => ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase()));

    let selectedFile: string | undefined;
    let title: string;

    const possibleIndex = parseInt(args[0]);
    if (!isNaN(possibleIndex)) {
      if (possibleIndex < 1 || possibleIndex > files.length) {
        return message.reply("Índice inválido. Use o comando !list para ver os índices disponíveis.");
      }
      
      selectedFile = files[possibleIndex - 1];
      title = path.parse(selectedFile).name;
    } else {
      const musicName = args.join(" ").toLowerCase();
      selectedFile = files.find(file => path.parse(file).name.toLowerCase() === musicName);
      if (!selectedFile) {
        return message.reply("Música não encontrada.");
      }
      title = musicName;
    }

    const filePath = path.join(MUSIC_DIR, selectedFile);

    try {
      const subscription = await joinChannel(message.member);
      subscription.enqueue({ title, filePath });
      message.reply(`A música **${title}** foi adicionada à fila!`);
    } catch (error) {
      console.error(error);
      message.reply("Erro ao conectar ao canal de voz.");
    }
  },
};

export = play;
