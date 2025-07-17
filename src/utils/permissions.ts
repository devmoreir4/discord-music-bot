import { Message, EmbedBuilder } from "discord.js";

export async function checkRolePermission(message: Message, requiredRole: string): Promise<boolean> {
  const memberRoles = message.member?.roles.cache;
  if (!memberRoles || !memberRoles.some(role => role.name === requiredRole)) {
    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Permission Denied")
      .setDescription("You do not have permission to use this command.");
    await message.reply({ embeds: [embed] });
    return false;
  }
  return true;
} 