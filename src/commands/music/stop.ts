import { Command } from '../../utils/commandLoader';
import { subscriptions } from '../../utils/musicManager';

const stop: Command = {
  name: 'stop',
  description: 'Para a reprodução e limpa a fila.',
  execute: async ({ message }) => {
    const guildId = message.guild.id;
    const subscription = subscriptions.get(guildId);
    if (!subscription || subscription.queue.length === 0) {
      return message.reply('Não há música tocando no momento.');
    }
    subscription.queue = [];
    subscription.skip();
    message.reply('Reprodução parada e fila limpa.');
  },
};

export = stop;
