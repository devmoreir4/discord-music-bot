import { Command } from '../../utils/commandLoader';
import { subscriptions } from '../../utils/musicManager';

const stop: Command = {
  name: 'stop',
  description: "Stops playback and clears the queue.",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      return message.reply("There is no music playing at the moment.");
    }
    subscription.queue = [];
    subscription.skip();
    message.reply("Music stopped and queue cleared.");
  },
};

export = stop;
