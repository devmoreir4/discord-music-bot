import { Command } from "../../utils/commandLoader";
import { joinChannel } from "../../utils/musicManager";
import ytdl from "@distube/ytdl-core";
import { EmbedBuilder } from "discord.js";

const play: Command = {
  name: "play",
  description: "Plays a YouTube song. Usage: !play <YouTube URL>",
  execute: async ({ message, args }) => {
    if (!message.member?.voice.channel) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Voice Channel Required")
        .setDescription("You need to be in a voice channel to use this command.");
      return message.reply({ embeds: [embed] });
    }

    if (args.length === 0) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Missing URL")
        .setDescription("Please provide the YouTube URL of the song you want to play.");
      return message.reply({ embeds: [embed] });
    }

    const url = args[0];

    if (!ytdl.validateURL(url)) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Invalid URL")
        .setDescription("Please provide a valid YouTube URL.");
      return message.reply({ embeds: [embed] });
    }

    try {
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title;

      const subscription = await joinChannel(message.member);
      subscription.enqueue({ title, url });
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Song Added to Queue")
        .setDescription(`**${title}** has been added to the queue!`);
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error processing YouTube URL:", error);
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Error")
        .setDescription("Error processing the YouTube URL. Please check if the link is valid.");
      message.reply({ embeds: [embed] });
    }
  },
};

export = play;
