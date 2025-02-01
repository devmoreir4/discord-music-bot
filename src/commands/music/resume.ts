import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";

const resume: Command = {
  name: "resume",
  description: "Retoma a reprodução pausada.",
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription) {
      return message.reply("Não há música pausada no momento.");
    }
    subscription.audioPlayer.unpause();
    message.reply("Música retomada.");
  },
};

export = resume;
