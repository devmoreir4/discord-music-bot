import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";
import { EmbedBuilder } from "discord.js";

const resume: Command = {
  name: "resume",
  description: "Resumes paused playback.",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("No Music Paused")
        .setDescription("There is no music paused at the moment.");
      return message.reply({ embeds: [embed] });
    }
    subscription.audioPlayer.unpause();
    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Resumed")
      .setDescription("Music resumed.");
    message.reply({ embeds: [embed] });
  },
};

export = resume;
