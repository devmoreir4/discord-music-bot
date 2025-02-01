import { Command } from "../utils/commandLoader";
import path from "path";
import fs from "fs";
import { EmbedBuilder } from "discord.js";

const MUSIC_DIR = path.join(__dirname, "../../musics");
const ALLOWED_EXTENSIONS = [".mp3", ".webm", ".wav", ".ogg", ".flac", ".aac"];

const list: Command = {
  name: "list",
  description: "Lista os arquivos de música disponíveis na pasta /musics com seus índices.",
  execute: async ({ message }) => {
    if (!fs.existsSync(MUSIC_DIR)) {
      return message.reply("A pasta de músicas não foi encontrada.");
    }

    const files = fs
      .readdirSync(MUSIC_DIR)
      .filter(file => ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase()));

    if (files.length === 0) {
      return message.reply("Não foram encontradas músicas na pasta.");
    }

    const embed = new EmbedBuilder()
      .setColor("#D2691E")
      .setTitle("Músicas Disponíveis")
      .setDescription("Veja os índices para usar com o comando `!play <índice>`:");

    const fields = files.map((file, index) => {
      const fileName = path.parse(file).name;
      return {
        name: `${index + 1}. ${fileName}`,
        value: "\u200B",
        inline: false,
      };
    });

    embed.addFields(fields);
    await message.reply({ embeds: [embed] });
  },
};

export = list;
