import { Command } from "../../utils/commandLoader";
import { EmbedBuilder } from "discord.js";

const help: Command = {
  name: "help",
  description: "Exibe os comandos disponíveis do VibeBot.",
  execute: async ({ message }) => {
    const embed = new EmbedBuilder()
      .setColor("#D2691E")
      .setTitle("Comandos VibeBot")
      .setAuthor({
        name: "VibeBot",
      })
      .setDescription("Aqui está a lista de comandos disponíveis e como usá-los:")
      .addFields([
        { name: "!help", value: "Exibe esta mensagem de ajuda.", inline: false },
        { name: "!avatar <user>", value: "Exibe o avatar do usuário mencionado.", inline: false },
        { name: "!ping", value: "Verifica a latência do bot.", inline: false },
        { name: "!membercount", value: "Exibe a quantidade de membros do servidor.", inline: false },
        { name: "!userinfo", value: "Exibe informações sobre o usuário.", inline: false },
        { name: "!uptime", value: "Exibe o tempo de atividade do bot.", inline: false },
        { name: "!clear <amount>", value: "Deleta mensagens do chat.", inline: false },
        { name: "!poll <question> - <option1> - <option2>", value: "Inicia uma enquete.", inline: false },
        { name: "!play <name or index>", value: "Reproduz uma música e adiciona ela na fila.", inline: false },
        { name: "!pause", value: "Pausa a reprodução da música atual.", inline: false },
        { name: "!resume", value: "Retoma a reprodução da música pausada.", inline: false },
        { name: "!skip", value: "Pula para a próxima música na fila.", inline: false },
        { name: "!queue", value: "Exibe a fila de músicas.", inline: false },
        { name: "!remove <index>", value: "Remove uma música da fila.", inline: false },
        { name: "!stop", value: "Finaliza a reprodução e limpa a fila.", inline: false },
        { name: "!volume <number>", value: "Define o volume da música atual (0 a 100).", inline: false },
        { name: "!roll <number>", value: "Rola um dado com o número de lados especificado.", inline: false },
        { name: "!userinfo <user>", value: "Exibe informações sobre um usuário específico.", inline: false },
        { name: "!setstatus <type> <message>", value: "Altera o status do bot. Tipos: playing, streaming, listening, watching.", inline: false },
        { name: "!remind <minutes> <message>", value: "Define um lembrete para o usuário.", inline: false },
      ])
      .setFooter({ text: "Made by @devmoreir4" });

    await message.reply({ embeds: [embed] });
  },
};

export = help;
