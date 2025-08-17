import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";

const skip: Command = {
  name: "skip",
  description: "Skips the current song.",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      return message.reply("There is no music playing at the moment.");
    }
    subscription.skip();
    message.reply("Song skipped!");
  },
};

export = skip;
