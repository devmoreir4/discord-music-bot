import { Command } from "../../utils/commandLoader";
import { EmbedBuilder } from "discord.js";

const avatar: Command = {
  name: "avatar",
  description: "Shows the mentioned user's avatar. Usage: !avatar @user",
  execute: async ({ message, args }) => {
    if (args.length === 0) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Missing User")
        .setDescription("You must mention a user. Example: `!avatar @user`");
      await message.reply({ embeds: [embed] });
      return;
    }

    const user = message.mentions.users.first();

    if (!user) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Invalid User")
        .setDescription("Mention a valid user. Example: `!avatar @user`");
      await message.reply({ embeds: [embed] });
      return;
    }

    const avatarURL = user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 256,
    });

    await message.reply({
      files: [avatarURL]
    });
  },
};

export = avatar;
