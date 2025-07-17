import { Command } from '../../utils/commandLoader';
import { subscriptions } from '../../utils/musicManager';
import { EmbedBuilder } from "discord.js";

const stop: Command = {
  name: 'stop',
  description: "Stops playback and clears the queue.",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("No Music Playing")
        .setDescription("There is no music playing at the moment.");
      return message.reply({ embeds: [embed] });
    }
    subscription.queue = [];
    subscription.skip();
    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Stopped")
      .setDescription("Playback stopped and queue cleared.");
    message.reply({ embeds: [embed] });
  },
};

export = stop;
