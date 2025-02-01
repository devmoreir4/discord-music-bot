import { Command } from "../../utils/commandLoader";
import { EmbedBuilder } from "discord.js";

const userinfo: Command = {
  name: "userinfo",
  description: "Mostra informações sobre um usuário específico. Uso: !userinfo @Usuario",
  execute: async ({ message, args }) => {
    const requiredRoleName = "admin";
    const memberRoles = message.member?.roles.cache;

    if (!memberRoles || !memberRoles.some(role => role.name === requiredRoleName)) {
      await message.reply("Você não tem permissão para usar este comando.");
      return;
    }

    const userMention = message.mentions.users.first();

    if (!userMention) {
      await message.reply("Por favor, mencione um usuário válido. Uso: `!userinfo @Usuario`");
      return;
    }

    const member = message.guild?.members.cache.get(userMention.id);

    if (!member) {
      await message.reply("Não foi possível encontrar informações sobre este usuário.");
      return;
    }

    const roles = member.roles.cache
      .filter(role => role.name !== "@everyone")
      .map(role => role.name)
      .join(", ") || "Nenhuma";

    const embed = new EmbedBuilder()
      .setColor("#D2691E")
      .setTitle(`Informações sobre ${userMention.tag}`)
      .setThumbnail(userMention.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "Nome de Usuário", value: userMention.tag, inline: true },
        { name: "ID do Usuário", value: userMention.id, inline: true },
        { name: "Entrou no Servidor", value: `<t:${Math.floor(member.joinedTimestamp! / 1000)}:F>`, inline: false },
        { name: "Cargos", value: roles, inline: false }
      )
      .setFooter({ text: `Solicitado por ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};

export = userinfo;
