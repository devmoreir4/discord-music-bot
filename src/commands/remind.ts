import { Command } from "../utils/commandLoader";
import { Message } from "discord.js";

const remind: Command = {
  name: "remind",
  description: "Define um lembrete para o usuário. Uso: !remind <tempo em minutos> <mensagem>",
  execute: async ({ message, args }: { message: Message; args: string[] }) => {
    if (args.length < 2) {
      await message.reply("Por favor, forneça o tempo em minutos e a mensagem do lembrete. Exemplo: `!remind 10 Faça uma pausa!`");
      return;
    }

    const timeArg = args[0];
    const reminderMessage = args.slice(1).join(" ");

    const amount = parseInt(timeArg, 10);

    if (isNaN(amount) || amount <= 0) {
      await message.reply("Por favor, forneça um número válido de minutos. Exemplo: `10` para 10 minutos.");
      return;
    }

    const milliseconds = amount * 60 * 1000;

    await message.reply(`Lembrete configurado! Você será lembrado em ${amount} minuto(s).`);

    setTimeout(async () => {
      await message.author.send(`Lembrete: ${reminderMessage}`);
    }, milliseconds);
  },
};

export = remind;
