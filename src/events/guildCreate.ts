import { Guild, EmbedBuilder, TextChannel } from "discord.js";

export const onGuildCreate = async (guild: Guild) => {
  try {
    console.log(`Bot joined new server: ${guild.name} (ID: ${guild.id})`);
    console.log(`Server has ${guild.memberCount} members`);
    console.log(`Owner: ${guild.ownerId}`);

    const systemChannel = guild.systemChannel ||
      guild.channels.cache.find(
        channel => channel.type === 0 && channel.isTextBased()
    ) as TextChannel;

    if (systemChannel) {
      const welcomeEmbed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("🎉 CapyVibes")
        .setDescription("Thank you for adding me to your server!")
        .addFields([
          {
            name: "🎵 Music Features",
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
      console.log(`Welcome message sent to ${guild.name}`);
    }

  } catch (error) {
    console.error(`Error in guildCreate for ${guild.name}:`, error);
  }
};
