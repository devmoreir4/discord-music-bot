import { Guild } from "discord.js";

export const onGuildDelete = async (guild: Guild) => {
  try {
    console.log(`Bot left server: ${guild.name} (ID: ${guild.id})`);
    console.log(`Server had ${guild.memberCount} members`);
    console.log(`Owner was: ${guild.ownerId}`);

    const totalGuilds = guild.client.guilds.cache.size;
    console.log(`Total servers after leaving: ${totalGuilds}`);

    console.log(`Left at: ${new Date().toISOString()}`);

  } catch (error) {
    console.error(`Error in guildDelete for ${guild.name}:`, error);
  }
};
