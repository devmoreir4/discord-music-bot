import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";

const remove: Command = {
  name: "remove",
  description: "Removes a song from the queue by its index.",
  execute: async ({ message, args }) => {
    if (args.length === 0) {
      return message.reply("Please provide the index of the song to remove.");
    }
    const index = parseInt(args[0]);
    if (isNaN(index)) {
      return message.reply("Invalid index.");
    }

    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      return message.reply("The queue is empty.");
    }
    if (index < 1 || index > subscription.queue.length) {
      return message.reply("Index out of range.");
    }
    const removed = subscription.queue.splice(index - 1, 1)[0];
    message.reply(`The song ${removed.title} was removed from the queue.`);
  },
};

export = remove;
