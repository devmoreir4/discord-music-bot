import { Command } from "../../utils/commandLoader";

const uptime: Command = {
  name: "uptime",
  description: "Mostra o tempo de atividade do bot.",
  execute: async ({ message }) => {
    const uptimeInMs = message.client.uptime || 0;
    const uptimeInSec = Math.floor(uptimeInMs / 1000);
    const hours = Math.floor(uptimeInSec / 3600);
    const minutes = Math.floor((uptimeInSec % 3600) / 60);
    const seconds = uptimeInSec % 60;

    message.reply(`Estou online por **${hours}h ${minutes}m ${seconds}s**.`);
  },
};

export = uptime;
