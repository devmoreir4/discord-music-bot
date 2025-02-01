import fs from "fs";
import path from "path";
import { Collection } from "discord.js";

export interface Command {
  name: string;
  description?: string;
  execute: (args: { message: any; args: string[] }) => void | Promise<void>;
}

export function loadCommands(commandsDir: string): Collection<string, Command> {
  const commands = new Collection<string, Command>();

  const readCommands = (dir: string) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const absolutePath = path.join(dir, file);
      if (fs.statSync(absolutePath).isDirectory()) {
        readCommands(absolutePath);
      } else if (file.endsWith(".ts") || file.endsWith(".js")) {
        const command = require(absolutePath) as Command;
        commands.set(command.name, command);
      }
    }
  };

  readCommands(commandsDir);
  return commands;
}
