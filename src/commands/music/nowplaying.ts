import { Command } from "../../utils/commandLoader";
import { EmbedBuilder } from "discord.js";
import { subscriptions } from "../../utils/musicManager";
import { AudioPlayerStatus } from "@discordjs/voice";

const nowplaying: Command = {
  name: "nowplaying",
  description: "Shows information about the currently playing song",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);

    if (!subscription || subscription.queue.length === 0) {
      return message.reply("There is no music currently playing.");
    }

    const currentSong = subscription.queue[0];
    const isPlaying = subscription.audioPlayer.state.status === AudioPlayerStatus.Playing;

    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Now Playing")
      .setDescription(`**${currentSong.title}**`)
            .addFields(
        {
          name: "URL",
          value: `[YouTube](${currentSong.url})`,
          inline: true
        },
        {
          name: "Status",
          value: isPlaying ? "Playing" : "Paused",
          inline: true
        }
      )
      .setFooter({ text: `Queue: ${subscription.queue.length} songs remaining` })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};

export = nowplaying;
