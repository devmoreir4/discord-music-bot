import { Command } from "../../utils/commandLoader";
import { ActivityType, Message, EmbedBuilder } from "discord.js";

const setstatus: Command = {
  name: "setstatus",
  description: "Changes the bot's status. Usage: !setstatus <type> <message>",
  execute: async ({ message, args }: { message: Message; args: string[] }) => {
    const requiredRoleName = "admin";
    const memberRoles = message.member?.roles.cache;

    if (!memberRoles || !memberRoles.some((role) => role.name === requiredRoleName)) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Permission Denied")
        .setDescription("You do not have permission to use this command.");
      await message.reply({ embeds: [embed] });
      return;
    }

    const validTypes = ["playing", "streaming", "listening", "watching"];
    const type = args[0]?.toLowerCase();
    const statusMessage = args.slice(1).join(" ");

    if (!type || !statusMessage) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Missing Arguments")
        .setDescription(
          `Please provide the type and status message. Example: \`!setstatus playing Playing a game\`\nValid types: \`playing\`, \`streaming\`, \`listening\`, \`watching\`.`
        );
      await message.reply({ embeds: [embed] });
      return;
    }

    if (!validTypes.includes(type)) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Invalid Type")
        .setDescription(
          `Invalid type. Valid types: \`playing\`, \`streaming\`, \`listening\`, \`watching\`.`
        );
      await message.reply({ embeds: [embed] });
      return;
    }

    try {
      const activityType = ActivityType[type.charAt(0).toUpperCase() + type.slice(1) as keyof typeof ActivityType] || ActivityType.Playing;

      await message.client.user?.setActivity(statusMessage, { type: activityType });
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Status Changed")
        .setDescription(`Bot status changed to "${statusMessage}" as ${type}.`);
      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Erro ao alterar o status do bot:", error);
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Error")
        .setDescription("An error occurred while trying to change the status.");
      await message.reply({ embeds: [embed] });
    }
  },
};

export = setstatus;
