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
      .setTitle("🎵 Music Queue")
      .setDescription(`**${subscription.queue.length}** song(s) in the queue:`);

    const fields = subscription.queue.map((track, index) => {
      const isPlaying = index === 0 ? "▶️ " : "";
      return {
        name: `${isPlaying}${index + 1}. ${track.title}`,
        value: `[YouTube](${track.url})`,
        inline: false,
      };
    });

    embed.addFields(fields);
    await message.reply({ embeds: [embed] });
  },
};

export = queue;
