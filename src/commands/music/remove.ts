import { Command } from "../../utils/commandLoader";
import { subscriptions } from "../../utils/musicManager";

const remove: Command = {
  name: "remove",
  description: "Remove uma música da fila pelo índice.",
  execute: async ({ message, args }) => {
    if (args.length === 0) {
      return message.reply("Forneça o índice da música para remover.");
    }
    const index = parseInt(args[0]);
    if (isNaN(index)) {
      return message.reply("Índice inválido.");
    }

    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      return message.reply("A fila está vazia.");
    }
    if (index < 1 || index > subscription.queue.length) {
      return message.reply("Índice fora do alcance da fila.");
    }
    const removed = subscription.queue.splice(index - 1, 1)[0];
    message.reply(`A música **${removed.title}** foi removida da fila.`);
  },
};

export = remove;
