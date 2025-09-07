import { Guild } from "discord.js";
import { logger } from "../utils/logger";

export const onGuildDelete = async (guild: Guild) => {
  try {
    logger.info(`Bot left server: ${guild.name} (ID: ${guild.id})`);
    logger.info(`Server had ${guild.memberCount} members`);
    logger.info(`Owner was: ${guild.ownerId}`);

    const totalGuilds = guild.client.guilds.cache.size;
    logger.info(`Total servers after leaving: ${totalGuilds}`);

    logger.debug(`Left at: ${new Date().toISOString()}`);

  } catch (error) {
    logger.errorWithContext(`Error in guildDelete for ${guild.name}`, error as Error);
  }
};
