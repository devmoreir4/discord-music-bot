import { Command } from "../../utils/commandLoader";
import { EmbedBuilder } from "discord.js";

const roll: Command = {
  name: "roll",
  description: "Rolls a dice with a specified number of sides. Usage: !roll <number of sides>",
  execute: async ({ message, args }) => {
    const sides = parseInt(args[0], 10);

    if (isNaN(sides) || sides <= 0) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Invalid Sides")
        .setDescription("Please provide a valid number of sides for the dice. Usage: `!roll <number of sides>`");
      await message.reply({ embeds: [embed] });
      return;
    }

    const result = Math.floor(Math.random() * sides) + 1;
    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Dice Roll 🎲")
      .setDescription(`${message.author} rolled a **${sides}**-sided dice and got **${result}**!`);
    await message.channel.send({ embeds: [embed] });
  },
};

export = roll;
