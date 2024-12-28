import { Command } from "../utils/commandLoader";
import { EmbedBuilder } from "discord.js";

const exampleEmbed = new EmbedBuilder()
  .setColor("#D2691E")
  .setTitle("Comandos BeatKeeper")
  // .setDescription('Lista de comandos disponíveis do BeatKeeper')
  .setAuthor({
    name: 'BeatKeeper',
    // iconURL: '',
  })
  // .setThumbnail('')
  .addFields(
    { name: '!help', value: 'Exibe a lista de comandos disponíveis.', inline: false },
    { name: '!avatar <user>', value: 'Exibe o avatar do usuário mencionado.', inline: false },
    { name: '!ping', value: 'Verifica a latência do bot.', inline: false },
    { name: '!clear <amount>', value: 'Deleta mensagens do chat.', inline: false },
    { name: '!poll <question> - <option1> - <option2>', value: 'Inicia uma enquete.', inline: false },
    { name: '!play <link>', value: 'Reproduz uma música a partir de um link do YouTube.', inline: false },
    { name: '!pause', value: 'Pausa a reprodução da música atual.', inline: false },
    { name: '!resume', value: 'Retoma a reprodução da música pausada.', inline: false },
    { name: '!stop', value: 'Finaliza a reprodução de uma música.', inline: false },
    { name: '!volume <number>', value: 'Define o volume da música atual.', inline: false },
    { name: '!roll <number>', value: 'Rola um dado com um número especificado de lados.', inline: false },
    { name: '!userinfo <user>', value: 'Exibe informações sobre um usuário específico.', inline: false },
    { name: '!setstatus <type> <message>', value: 'Muda o status do bot. Tipos: "playing", "streaming", "listening", "watching".', inline: false },
    { name: '!remind <minutes> <message>', value: 'Define um lembrete para o usuário.', inline: false }
  )
  .setFooter({ text: 'Made by @devmoreir4' });

const help: Command = {
  name: "help",
  description: "Exibe os comandos BeatKeeper.",
  execute: async ({ message }) => {
    await message.reply({ embeds: [exampleEmbed] });
  },
};

export = help;
