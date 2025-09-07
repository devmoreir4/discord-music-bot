import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";
import { EmbedBuilder } from "discord.js";

const queue: Command = {
  name: "queue",
  description: "Lists the songs in the current queue.",
  execute: async ({ message }) => {
    const subscription = subscriptions.get(message.guildId!);

    if (!subscription) {
      return message.reply("There is no active music session at the moment.");
    }

    if (subscription.queue.length === 0) {
      return message.reply("The queue is empty.");
    }

    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Music Queue")
      .setDescription(`**${subscription.queue.length}** song(s) in the queue`)
      .addFields(
        { name: "Volume", value: `${Math.round(subscription.volume * 100)}%`, inline: true },
        { name: "Limit", value: `${subscription.queue.length}/50`, inline: true }
      );

    const fields = subscription.queue.slice(0, 10).map((track, index) => {
      return {
        name: `${index + 1}. ${track.title.length > 50 ? track.title.substring(0, 50) + '...' : track.title}`,
        value: `[YouTube](${track.url})`,
        inline: false,
      };
    });

    embed.addFields(fields);

    if (subscription.queue.length > 10) {
      embed.setFooter({ text: `And ${subscription.queue.length - 10} more song(s)...` });
    }

    await message.reply({ embeds: [embed] });
  },
};

export = queue;
