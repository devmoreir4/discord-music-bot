import { Command } from "../../utils/commandLoader";

const roll: Command = {
  name: "roll",
  description: "Rolls a dice with a specified number of sides. Usage: !roll <number of sides>",
  execute: async ({ message, args }) => {
    const sides = parseInt(args[0], 10);

    if (isNaN(sides) || sides <= 0) {
      await message.reply("Please provide a valid number of sides for the dice. Usage: `!roll <number of sides>`");
      return;
    }

    const result = Math.floor(Math.random() * sides) + 1;
    await message.channel.send(`${message.author} rolled a ${sides}-sided dice and got ${result}!`);
  },
};

export = roll;
