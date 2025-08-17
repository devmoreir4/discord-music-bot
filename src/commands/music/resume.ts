import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";

const resume: Command = {
  name: "resume",
  description: "Resumes paused playback.",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      return message.reply("There is no music paused at the moment.");
    }
    subscription.audioPlayer.unpause();
    message.reply("Music resumed.");
  },
};

export = resume;
