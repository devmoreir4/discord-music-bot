import { Command } from "../utils/commandLoader";
import { EmbedBuilder } from "discord.js";

const exampleEmbed = new EmbedBuilder()
  .setColor("#D2691E")
  .setTitle("Comandos BeatKeeper")
  .setDescription('Lista de comandos disponíveis do BeatKeeper')
  .setAuthor({
    name: 'BeatKeeper',
    // iconURL: '',
  })
//   .setThumbnail('')
  .addFields(
    { name: '!help', value: 'Exibe a lista de comandos disponíveis.', inline: true },
    { name: '!avatar <user>', value: 'Exibe o avatar do usuário mencionado.', inline: true },
    { name: '!ping', value: 'Verifica a latência do bot.', inline: true },
    { name: '!clear <amount>', value: 'Deleta mensagens do chat.', inline: true },
    { name: '!poll <question> - <option1> - <option2>', value: 'Inicia uma enquete.', inline: true },
    { name: '!play <link>', value: 'Reproduz uma música a partir de um link do YouTube.', inline: true },
    { name: '!pause', value: 'Pausa a reprodução da música atual.', inline: true },
    { name: '!resume', value: 'Retoma a reprodução da música pausada.', inline: true },
    { name: '!stop', value: 'Finaliza a reprodução de uma música.', inline: true },
    { name: '!volume <number>', value: 'Define o volume da música atual.', inline: true }
  )
//   .setTimestamp()
  .setFooter({ text: 'Made by @devmoreir4' });

const help: Command = {
  name: "help",
  description: "Exibe os comandos BeatKeeper.",
  execute: async ({ message }) => {
    await message.reply({ embeds: [exampleEmbed] });
  },
};

export = help;
