import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";
import { EmbedBuilder } from "discord.js";

const queue: Command = {
  name: "queue",
  description: "Lista as músicas na fila atual.",
  execute: async ({ message }) => {
    const subscription = subscriptions.get(message.guildId!);

    if (!subscription) {
      return message.reply("Não há nenhuma sessão de música ativa no momento.");
    }

    if (subscription.queue.length === 0) {
      return message.reply("A fila está vazia.");
    }

    const embed = new EmbedBuilder()
      .setColor("#D2691E")
      .setTitle("🎵 Fila de Músicas")
      .setDescription(`**${subscription.queue.length}** música(s) na fila:`);

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
