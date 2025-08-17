import { Command } from "../../utils/commandLoader";

const memberCount: Command = {
  name: "membercount",
  description: "Shows the total number of members in the server.",
  execute: async ({ message }) => {
    const { guild } = message;

    if (guild) {
      const { name, memberCount } = guild;
      await message.reply(`${name} has ${memberCount} members!`);
    } else {
      await message.reply("Could not get the member count for this server.");
    }
  },
};

export = memberCount;
