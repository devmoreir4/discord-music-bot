import { EmbedBuilder } from "discord.js";
import { Command } from "../../utils/commandLoader";

const memberCount: Command = {
  name: "membercount",
  description: "Shows the total number of members in the server.",
  execute: async ({ message }) => {
    const { guild } = message;

    if (guild) {
      const { name, memberCount } = guild;
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Member Count")
        .setDescription(`${name} has **${memberCount}** members!`);
      await message.reply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Error")
        .setDescription("Could not get the member count for this server.");
      await message.reply({ embeds: [embed] });
    }
  },
};

export = memberCount;
