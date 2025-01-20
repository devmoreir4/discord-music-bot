import { Command } from "../utils/commandLoader";

const memberCount: Command = {
  name: "membercount",
  description: "Exibe o número total de membros do servidor.",
  execute: async ({ message }) => {
    const { guild } = message;

    if (guild) {
      const { name, memberCount } = guild;
      message.reply(`${name} possui **${memberCount}** membros!`);
    } else {
      message.reply("Não consegui obter o número de membros deste servidor.");
    }
  },
};

export = memberCount;
