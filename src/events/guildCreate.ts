import { Guild, EmbedBuilder, TextChannel } from "discord.js";
import { logger } from "../utils/logger";

export const onGuildCreate = async (guild: Guild) => {
  try {
    logger.info(`Bot joined new server: ${guild.name} (ID: ${guild.id})`);
    logger.info(`Server has ${guild.memberCount} members`);
    logger.info(`Owner: ${guild.ownerId}`);

    const systemChannel = guild.systemChannel ||
      guild.channels.cache.find(
        channel => channel.type === 0 && channel.isTextBased()
    ) as TextChannel;

    if (systemChannel) {
      const welcomeEmbed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("CapyVibes Bot")
        .setDescription("Thank you for adding me to your server!")
        .addFields([
          {
            name: "Music Features",
            value: "Use `!help` to see all available commands and features.",
            inline: false
          }
        ])
        .setTimestamp()
        .setFooter({
          text: "CapyVibes",
          iconURL: guild.iconURL() || undefined
        });

      await systemChannel.send({ embeds: [welcomeEmbed] });
      logger.info(`Welcome message sent to ${guild.name}`);
    }

  } catch (error) {
    logger.errorWithContext(`Error in guildCreate for ${guild.name}`, error as Error);
  }
};
