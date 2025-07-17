import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";
import { EmbedBuilder } from "discord.js";

const remove: Command = {
  name: "remove",
  description: "Removes a song from the queue by its index.",
  execute: async ({ message, args }) => {
    if (args.length === 0) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Missing Index")
        .setDescription("Please provide the index of the song to remove.");
      return message.reply({ embeds: [embed] });
    }
    const index = parseInt(args[0]);
    if (isNaN(index)) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Invalid Index")
        .setDescription("Invalid index.");
      return message.reply({ embeds: [embed] });
    }

    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Queue Empty")
        .setDescription("The queue is empty.");
      return message.reply({ embeds: [embed] });
    }
    if (index < 1 || index > subscription.queue.length) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Index Out of Range")
        .setDescription("Index out of queue range.");
      return message.reply({ embeds: [embed] });
    }
    const removed = subscription.queue.splice(index - 1, 1)[0];
    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Song Removed")
      .setDescription(`The song **${removed.title}** was removed from the queue.`);
    message.reply({ embeds: [embed] });
  },
};

export = remove;
