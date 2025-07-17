import { Command } from "../../utils/commandLoader";
import { Message, EmbedBuilder } from "discord.js";

const remind: Command = {
  name: "remind",
  description: "Sets a reminder for the user. Usage: !remind <minutes> <message>",
  execute: async ({ message, args }: { message: Message; args: string[] }) => {
    if (args.length < 2) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Missing Arguments")
        .setDescription("Please provide the time in minutes and the reminder message. Example: `!remind 10 Take a break!`");
      await message.reply({ embeds: [embed] });
      return;
    }

    const timeArg = args[0];
    const reminderMessage = args.slice(1).join(" ");

    const amount = parseInt(timeArg, 10);

    if (isNaN(amount) || amount <= 0) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Invalid Time")
        .setDescription("Please provide a valid number of minutes. Example: `10` for 10 minutes.");
      await message.reply({ embeds: [embed] });
      return;
    }

    const milliseconds = amount * 60 * 1000;

    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Reminder Set")
      .setDescription(`Reminder set! You will be reminded in ${amount} minute(s).`);
    await message.reply({ embeds: [embed] });

    setTimeout(async () => {
      await message.author.send(`Reminder: ${reminderMessage}`);
    }, milliseconds);
  },
};

export = remind;
