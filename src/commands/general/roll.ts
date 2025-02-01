import { Command } from "../../utils/commandLoader";

const roll: Command = {
  name: "roll",
  description: "Rola um dado com um número especificado de lados. Uso: !roll <número de lados>",
  execute: async ({ message, args }) => {
    const sides = parseInt(args[0], 10);

    if (isNaN(sides) || sides <= 0) {
      await message.reply("Por favor, forneça um número válido de lados para o dado. Uso: `!roll <número de lados>`");
      return;
    }

    const result = Math.floor(Math.random() * sides) + 1;

    await message.channel.send(
      `🎲 ${message.author} lançou um dado de **${sides}** lados e obteve **${result}**!`
    );
  },
};

export = roll;
