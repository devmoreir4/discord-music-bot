import { Command } from "../../utils/commandLoader";

const uptime: Command = {
  name: "uptime",
  description: "Shows the bot's uptime.",
  execute: async ({ message }) => {
    const uptimeInMs = message.client.uptime || 0;
    const uptimeInSec = Math.floor(uptimeInMs / 1000);
    const hours = Math.floor(uptimeInSec / 3600);
    const minutes = Math.floor((uptimeInSec % 3600) / 60);
    const seconds = uptimeInSec % 60;

    await message.reply(`Bot has been online for ${hours}h ${minutes}m ${seconds}s.`);
  },
};

export = uptime;
