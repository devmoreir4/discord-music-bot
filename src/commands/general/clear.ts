import { Command } from "../../utils/commandLoader";
import { Role, EmbedBuilder } from "discord.js";
import { checkRolePermission } from "../../utils/permissions";
import { logger } from "../../utils/logger";

const clear: Command = {
  name: "clear",
  description: "Deletes messages from the chat. Usage: !clear <amount>",
  execute: async ({ message, args }) => {
    const requiredRoleName = "admin";
    const hasPermission = await checkRolePermission(message, requiredRoleName);
    if (!hasPermission) return;

    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount <= 0 || amount > 100) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Invalid Amount")
        .setDescription("Please provide a valid amount between 1 and 100. Usage: `!clear <amount>`");
      await message.reply({ embeds: [embed] });
      return;
    }

    try {
      const messages = await message.channel.messages.fetch({ limit: amount });

      const fifteenDaysInMillis = 15 * 24 * 60 * 60 * 1000;
      const deletableMessages = messages.filter(msg => Date.now() - msg.createdTimestamp <= fifteenDaysInMillis);

      if (deletableMessages.size === 0) {
        const embed = new EmbedBuilder()
          .setColor("#f19962")
          .setTitle("No Messages Deleted")
          .setDescription("No messages can be deleted (check the 15-day limit).");
        await message.reply({ embeds: [embed] });
        return;
      }

      await message.channel.bulkDelete(deletableMessages, true);
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Messages Deleted")
        .setDescription(`${deletableMessages.size} messages have been deleted.`);
      await message.channel.send({ embeds: [embed] });
    } catch (error) {
      logger.errorWithContext("Error trying to delete messages", error as Error);
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Error")
        .setDescription("Could not delete the messages.");
      await message.channel.send({ embeds: [embed] });
    }
  },
};

export = clear;
