import { Command } from "../../utils/commandLoader";
import { joinChannel } from "../../utils/musicManager";
import ytdl from "@distube/ytdl-core";
import { EmbedBuilder } from "discord.js";
import { logger } from "../../utils/logger";

const play: Command = {
  name: "play",
  description: "Plays a YouTube song. Usage: !play <YouTube URL>",
  execute: async ({ message, args }) => {
    if (!message.member?.voice.channel) {
      return message.reply("You need to be in a voice channel to use this command.");
    }

    if (args.length === 0) {
      return message.reply("Please provide the YouTube URL of the song you want to play.");
    }

    const url = args[0];

    if (!ytdl.validateURL(url)) {
      return message.reply("Please provide a valid YouTube URL.");
    }

    try {
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title;

      const subscription = await joinChannel(message.member);
      const success = subscription.enqueue({ title, url });

      if (!success) {
        return message.reply("The queue is full! Remove some songs before adding more.");
      }

      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Song Added to Queue")
        .setDescription(`**${title}** has been added to the queue!`)
        .addFields(
          { name: "Queue Position", value: `${subscription.queue.length}`, inline: true },
          { name: "Volume", value: `${Math.round(subscription.volume * 100)}%`, inline: true }
        );
      message.reply({ embeds: [embed] });
    } catch (error) {
      logger.errorWithContext("Error processing YouTube URL", error as Error);
      message.reply("Error processing the YouTube URL. Please check if the link is valid.");
    }
  },
};

export = play;
