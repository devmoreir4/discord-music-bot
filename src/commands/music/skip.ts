import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";

const skip: Command = {
  name: "skip",
  description: "Pula a música atual.",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription) {
      return message.reply("Não há música tocando no momento.");
    }
    subscription.skip();
    message.reply("Música pulada!");
  },
};

export = skip;
