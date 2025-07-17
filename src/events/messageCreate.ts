import { Message } from "discord.js";

export function onMessageCreate(message: Message, prefix: string, commands: Map<string, any>) {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  const command = commands.get(commandName || "");

  if (command) {
    try {
      command.execute({ message, args });
    } catch (error) {
      console.error(error);
      message.reply("An error occurred while executing this command.");
    }
  }
}
