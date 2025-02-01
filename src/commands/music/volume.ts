import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";

const volume: Command = {
  name: "volume",
  description: "Ajusta o volume da reprodução (0 a 100).",
  execute: async ({ message, args }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription) {
      return message.reply("Não há música tocando no momento.");
    }
    if (args.length === 0) {
      return message.reply("Por favor, informe o nível de volume (0 a 100).");
    }
    const vol = parseInt(args[0]);
    if (isNaN(vol) || vol < 0 || vol > 100) {
      return message.reply("Informe um volume válido entre 0 e 100.");
    }

    const volumeLevel = vol / 100;
    subscription.volume = volumeLevel;
    
    const resource = subscription.audioPlayer.state.status !== "idle"
      ? subscription.audioPlayer.state.resource
      : null;
    if (resource && resource.volume) {
      resource.volume.setVolume(volumeLevel);
    }
    message.reply(`Volume ajustado para ${vol}%.`);
  },
};

export = volume;
