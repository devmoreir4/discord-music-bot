import { Command } from "../../utils/commandLoader";
import { EmbedBuilder } from "discord.js";

const userinfo: Command = {
  name: "userinfo",
  description: "Shows information about a specific user. Usage: !userinfo @User",
  execute: async ({ message, args }) => {
    const requiredRoleName = "admin";
    const memberRoles = message.member?.roles.cache;

    if (!memberRoles || !memberRoles.some(role => role.name === requiredRoleName)) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Permission Denied")
        .setDescription("You do not have permission to use this command.");
      await message.reply({ embeds: [embed] });
      return;
    }

    const userMention = message.mentions.users.first();

    if (!userMention) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Missing User")
        .setDescription("Please mention a valid user. Usage: `!userinfo @User`");
      await message.reply({ embeds: [embed] });
      return;
    }

    const member = message.guild?.members.cache.get(userMention.id);

    if (!member) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("User Not Found")
        .setDescription("Could not find information about this user.");
      await message.reply({ embeds: [embed] });
      return;
    }

    const roles = member.roles.cache
      .filter(role => role.name !== "@everyone")
      .map(role => role.name)
      .join(", ") || "None";

    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle(`User Info: ${userMention.tag}`)
      .setThumbnail(userMention.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "Username", value: userMention.tag, inline: true },
        { name: "User ID", value: userMention.id, inline: true },
        { name: "Joined Server", value: `<t:${Math.floor(member.joinedTimestamp! / 1000)}:F>`, inline: false },
        { name: "Roles", value: roles, inline: false }
      )
      .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};

export = userinfo;
