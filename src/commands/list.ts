import { Command } from "../utils/commandLoader";
import path from "path";
import fs from "fs";

const MUSIC_DIR = path.join(__dirname, "../../musics");
const ALLOWED_EXTENSIONS = [".mp3", ".webm", ".wav", ".ogg", ".flac", ".aac"];

const list: Command = {
  name: "list",
  description: "Lista os arquivos de música disponíveis na pasta /musics.",
  execute: async ({ message }) => {
    if (!fs.existsSync(MUSIC_DIR)) {
      return message.reply("A pasta de músicas não foi encontrada.");
    }

    const files = fs.readdirSync(MUSIC_DIR).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ALLOWED_EXTENSIONS.includes(ext);
    });

    if (files.length === 0) {
      return message.reply("Não foram encontradas músicas na pasta.");
    }

    const fileList = files
      .map(file => path.parse(file).name)
      .join("\n");

    message.reply(`**Músicas Disponíveis:**\n${fileList}`);
  },
};

export = list;
