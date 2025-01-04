import fs from "fs";
import path from "path";
import { Collection } from "discord.js";

export interface Command {
  name: string;
  description?: string;
  execute: (args: {
    message: any;
    args: string[];
  }) => void | Promise<void>;
}

export function loadCommands(commandsDir: string): Collection<string, Command> {
  const commands = new Collection<string, Command>();
  const files = fs.readdirSync(commandsDir).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  files.forEach(async (file) => {
    const command = await import(path.join(commandsDir, file));
    commands.set(command.name, command);
  });

  return commands;
}
