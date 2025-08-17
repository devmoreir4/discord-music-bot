import { Command } from '../../utils/commandLoader';
import { subscriptions } from '../../utils/musicManager';

const volume: Command = {
  name: 'volume',
  description: "Adjusts the playback volume (0 to 100).",
  execute: async ({ message, args }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      return message.reply("There is no music playing at the moment.");
    }
    if (args.length === 0) {
      return message.reply("Please provide the volume level (0 to 100).");
    }
    const vol = parseInt(args[0]);
    if (isNaN(vol) || vol < 0 || vol > 100) {
      return message.reply("Please provide a valid volume between 0 and 100.");
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
    message.reply(`Volume set to ${vol}%.`);
  },
};

export = volume;
