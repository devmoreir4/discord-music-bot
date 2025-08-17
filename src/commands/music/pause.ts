import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";

const pause: Command = {
  name: "pause",
  description: "Pauses the current playback.",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      return message.reply("There is no music playing at the moment.");
    }
    subscription.audioPlayer.pause();
    message.reply("Music paused.");
  },
};

export = pause;
