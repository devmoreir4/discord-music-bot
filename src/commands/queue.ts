import { Command } from "../utils/commandLoader";
import { subscriptions } from "../utils/musicManager";

const queue: Command = {
  name: "queue",
  description: "Exibe a fila de músicas.",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      return message.reply("A fila está vazia.");
    }
    const queueList = subscription.queue
      .map((track, index) => `${index + 1}. ${track.title}`)
      .join("\n");
    message.reply(`**Fila de Músicas:**\n${queueList}`);
  },
};

export = queue;
