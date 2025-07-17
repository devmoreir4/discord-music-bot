import { Command } from '../../utils/commandLoader';
import { subscriptions } from '../../utils/musicManager';
import { EmbedBuilder } from "discord.js";

const volume: Command = {
  name: 'volume',
  description: "Adjusts the playback volume (0 to 100).",
  execute: async ({ message, args }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("No Music Playing")
        .setDescription("There is no music playing at the moment.");
      return message.reply({ embeds: [embed] });
    }
    if (args.length === 0) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Missing Volume")
        .setDescription("Please provide the volume level (0 to 100).");
      return message.reply({ embeds: [embed] });
    }
    const vol = parseInt(args[0]);
    if (isNaN(vol) || vol < 0 || vol > 100) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Invalid Volume")
        .setDescription("Please provide a valid volume between 0 and 100.");
      return message.reply({ embeds: [embed] });
    }

    const volumeLevel = vol / 100;
    subscription.volume = volumeLevel;

    const resource =
      subscription.audioPlayer.state.status !== 'idle'
        ? subscription.audioPlayer.state.resource
        : null;
    if (resource && resource.volume) {
      resource.volume.setVolume(volumeLevel);
    }
    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Volume Set")
      .setDescription(`Volume set to ${vol}%.`);
    message.reply({ embeds: [embed] });
  },
};

export = volume;
