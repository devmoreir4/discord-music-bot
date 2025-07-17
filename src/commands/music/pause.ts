import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";

const pause: Command = {
  name: "pause",
  description: "Pausa a reprodução atual.",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      return message.reply("Não há música tocando no momento.");
    }
    subscription.audioPlayer.pause();
    message.reply("Música pausada.");
  },
};

export = pause;
