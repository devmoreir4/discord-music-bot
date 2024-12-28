import { Command } from "../utils/commandLoader";
import { ActivityType, Message } from "discord.js";

const setstatus: Command = {
  name: "setstatus",
  description: "Muda o status do bot. Uso: !setstatus <tipo> <mensagem>",
  execute: async ({ message, args }: { message: Message; args: string[] }) => {
    const requiredRoleName = "admin";
    const memberRoles = message.member?.roles.cache;

    if (!memberRoles || !memberRoles.some((role) => role.name === requiredRoleName)) {
      await message.reply("Você não tem permissão para usar este comando.");
      return;
    }

    const validTypes = ["playing", "streaming", "listening", "watching"];
    const type = args[0]?.toLowerCase();
    const statusMessage = args.slice(1).join(" ");

    if (!type || !statusMessage) {
      await message.reply(
        `Por favor, forneça o tipo e a mensagem do status. Exemplo: \`!setstatus playing Jogando um jogo\`\nOs tipos válidos são: \`playing\`, \`streaming\`, \`listening\`, \`watching\`.`
      );
      return;
    }

    if (!validTypes.includes(type)) {
      await message.reply(
        `Tipo inválido. Os tipos válidos são: \`playing\`, \`streaming\`, \`listening\`, \`watching\`.`
      );
      return;
    }

    try {
      const activityType = ActivityType[type.charAt(0).toUpperCase() + type.slice(1) as keyof typeof ActivityType] || ActivityType.Playing;

      await message.client.user?.setActivity(statusMessage, { type: activityType });
      await message.reply(`Status do bot alterado para "${statusMessage}" como ${type}.`);
    } catch (error) {
      console.error("Erro ao alterar o status do bot:", error);
      await message.reply("Ocorreu um erro ao tentar alterar o status.");
    }
  },
};

export = setstatus;
