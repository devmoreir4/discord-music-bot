import { Message } from "discord.js";
import { logger } from "../utils/logger";

export function onMessageCreate(message: Message, prefix: string, commands: Map<string, any>) {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  const command = commands.get(commandName || "");

  if (command) {
    try {
      logger.commandExecuted(commandName || 'unknown', message.author.username, message.guild?.name || 'DM');
      command.execute({ message, args });
    } catch (error) {
      logger.errorWithContext(`Command execution error: ${commandName || 'unknown'}`, error as Error);
      message.reply("An error occurred while executing this command.");
    }
  }
}
