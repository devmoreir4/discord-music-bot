import { GuildMember, EmbedBuilder, TextChannel } from "discord.js";

export const onGuildMemberAdd = async (member: GuildMember) => {
  try {
    const welcomeChannel = member.guild.channels.cache.find(
      channel => channel.type === 0 && channel.isTextBased() // 0 = GuildText
    ) as TextChannel;

    if (!welcomeChannel) {
      console.log("No text channel found for welcome message.");
      return;
    }

    const welcomeEmbed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Welcome to the Server!")
      .setDescription(`**${member.user.displayName}** just joined the server!`)
      .addFields([
        {
          name: "👋 Welcome!",
          value: `We're glad to have you here, ${member.user}!`,
          inline: false
        },
        {
          name: "🎵 Music Features",
          value: "Use `!help` to see all available commands and features.",
          inline: false
        },
        {
          name: "📱 Member Count",
          value: `You are member #${member.guild.memberCount}`,
          inline: false
        }
      ])
      .setThumbnail(member.user.displayAvatarURL({ size: 128 }))
      .setTimestamp()
      .setFooter({
        text: "CapyVibes",
        iconURL: member.guild.iconURL() || undefined
      });

    await welcomeChannel.send({ embeds: [welcomeEmbed] });

    console.log(`Welcome message sent for ${member.user.tag} in ${member.guild.name}`);

  } catch (error) {
    console.error("Error sending welcome message:", error);
  }
};
