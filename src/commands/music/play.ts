import { Command } from "../../utils/commandLoader";
import { joinChannel } from "../../utils/musicManager";
import ytdl from "@distube/ytdl-core";

const play: Command = {
  name: "play",
  description: "Toca uma música do YouTube. Use: !play <URL do YouTube>",
  execute: async ({ message, args }) => {
    if (!message.member?.voice.channel) {
      return message.reply("Você precisa estar em um canal de voz para usar este comando.");
    }

    if (args.length === 0) {
      return message.reply("Por favor, informe a URL do YouTube da música que deseja tocar.");
    }

    const url = args[0];

    if (!ytdl.validateURL(url)) {
      return message.reply("Por favor, forneça uma URL válida do YouTube.");
    }

    try {
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title;

      const subscription = await joinChannel(message.member);
      subscription.enqueue({ title, url });
      message.reply(`🎵 **${title}** foi adicionada à fila!`);
    } catch (error) {
      console.error("Erro ao processar URL do YouTube:", error);
      message.reply("Erro ao processar a URL do YouTube. Verifique se o link é válido.");
    }
  },
};

export = play;
