import { Command } from "../utils/commandLoader";
import { joinChannel } from "../utils/musicManager";
import path from "path";
import fs from "fs";

const MUSIC_DIR = path.join(__dirname, "../../musics");

const play: Command = {
  name: "play",
  description: "Toca uma música da pasta local /musics.",
  execute: async ({ message, args }) => {
    if (!message.member?.voice.channel) {
      return message.reply("Você precisa estar em um canal de voz para usar este comando.");
    }
    if (args.length === 0) {
      return message.reply("Por favor, informe o nome da música.");
    }

    const musicName = args.join(" ");
    const files = fs.readdirSync(MUSIC_DIR);
    const file = files.find((f) => path.parse(f).name.toLowerCase() === musicName.toLowerCase());
    if (!file) {
      return message.reply("Música não encontrada.");
    }
    const filePath = path.join(MUSIC_DIR, file);

    try {
      const subscription = await joinChannel(message.member);
      subscription.enqueue({ title: musicName, filePath });
      message.reply(`A música **${musicName}** foi adicionada à fila!`);
    } catch (error) {
      console.error(error);
      message.reply("Erro ao conectar ao canal de voz.");
    }
  },
};

export = play;
