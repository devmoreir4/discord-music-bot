import { Command } from "../utils/commandLoader";
import { Role } from "discord.js";

const clear: Command = {
  name: "clear",
  description: "Deleta mensagens do chat. Uso: !clear <quantidade>",
  execute: async ({ message, args }) => {
    const requiredRoleName = "admin";
    const memberRoles = message.member?.roles.cache;

    if (!memberRoles || !memberRoles.some((role: Role) => role.name === requiredRoleName)) {
      await message.reply({
        content: "Você não tem permissão para usar este comando.",
        ephemeral: true,
      });
      return;
    }

    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount <= 0 || amount > 100) {
      await message.reply({
        content: "Informe uma quantidade válida entre 1 e 100. Uso: `!clear <quantidade>`",
        ephemeral: true,
      });
      return;
    }

    try {
      const messages = await message.channel.messages.fetch({ limit: amount });

      const fifteenDaysInMillis = 15 * 24 * 60 * 60 * 1000; // 15 dias em milissegundos
      const deletableMessages = messages.filter(msg => Date.now() - msg.createdTimestamp <= fifteenDaysInMillis);

      if (deletableMessages.size === 0) {
        await message.reply({
          content: "Nenhuma mensagem pode ser deletada (verifique o limite de 15 dias).",
          ephemeral: true,
        });
        return;
      }

      await message.channel.bulkDelete(deletableMessages, true);
      await message.channel.send(`Foram deletadas ${deletableMessages.size} mensagens.`);
    } catch (error) {
      console.error("Erro ao tentar deletar mensagens:", error);
      await message.channel.send("Não foi possível deletar as mensagens.");
    }
  },
};

export = clear;
