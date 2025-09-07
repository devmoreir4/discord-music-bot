import { Command } from "../../utils/commandLoader";
import { joinChannel } from "../../utils/musicManager";
import ytdl from "@distube/ytdl-core";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } from "discord.js";
import yts from "yt-search";
import { logger } from "../../utils/logger";

const search: Command = {
  name: "search",
  description: "Search for music on YouTube. Usage: !search <song name>",
  execute: async ({ message, args }) => {
    if (!message.member?.voice.channel) {
      return message.reply("You need to be in a voice channel to use this command.");
    }

    if (args.length === 0) {
      return message.reply("Please provide a song name to search for. Usage: `!search <song name>`");
    }

    const searchQuery = args.join(" ");

    try {
      const searchResults = await yts(searchQuery);

      if (!searchResults || !searchResults.videos || searchResults.videos.length === 0) {
        return message.reply(`No videos found for: ${searchQuery}`);
      }

      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Search Results")
        .setDescription(`Results for: **${searchQuery}**`)
        .setFooter({ text: "Click a button below to select a song" });

      const limitedResults = searchResults.videos.slice(0, 5);
      limitedResults.forEach((result: any, index: number) => {
        const title = result.title.length > 50 ? result.title.substring(0, 47) + "..." : result.title;

        embed.addFields({
          name: `${index + 1}. ${title}`,
          value: `[YouTube](${result.url})`,
          inline: false
        });
      });

    const rows: ActionRowBuilder<ButtonBuilder>[] = [];
    let currentRow = new ActionRowBuilder<ButtonBuilder>();

      for (let i = 0; i < limitedResults.length; i++) {
        if (currentRow.components.length >= 4) {
          rows.push(currentRow);
          currentRow = new ActionRowBuilder<ButtonBuilder>();
        }

        currentRow.addComponents(
          new ButtonBuilder()
            .setCustomId(`search_${i}`)
            .setLabel(`${i + 1}`)
            .setStyle(ButtonStyle.Secondary)
        );
      }

      currentRow.addComponents(
        new ButtonBuilder()
          .setCustomId("search_cancel")
          .setLabel("Cancel")
          .setStyle(ButtonStyle.Secondary)
      );

      rows.push(currentRow);

      const searchMessage = await message.reply({
        embeds: [embed],
        components: rows
      });

      const collector = searchMessage.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 60000,
        filter: i => i.user.id === message.author.id
      });

      collector.on("collect", async (interaction) => {
        if (interaction.customId === "search_cancel") {
          await interaction.update({
            content: "Search cancelled by user.",
            components: []
          });
          return;
        }

        const selectedIndex = parseInt(interaction.customId.split("_")[1]);
        const selectedResult = limitedResults[selectedIndex];

        if (!selectedResult) {
          await interaction.reply({
            content: "Invalid selection. Please try again.",
            ephemeral: true
          });
          return;
        }

        try {
          if (!ytdl.validateURL(selectedResult.url)) {
            await interaction.reply({
              content: "Invalid YouTube URL. Please try again.",
              ephemeral: true
            });
            return;
          }

          const subscription = await joinChannel(message.member);
          subscription.enqueue({
            title: selectedResult.title,
            url: selectedResult.url
          });

          const successEmbed = new EmbedBuilder()
            .setColor("#f19962")
            .setTitle("Song Added to Queue")
            .setDescription(`**${selectedResult.title}** has been added to the queue!`);

          await interaction.update({
            embeds: [successEmbed],
            components: []
          });

        } catch (error) {
          logger.errorWithContext("Error adding song to queue", error as Error);
          await interaction.reply({
            content: "Error adding song to queue. Please try again.",
            ephemeral: true
          });
        }
      });

      collector.on("end", async (collected) => {
        if (collected.size === 0) {
          await searchMessage.edit({
            content: "No selection made within 1 minute. Search cancelled.",
            components: []
          });
        }
      });

    } catch (error) {
      logger.errorWithContext("Error searching YouTube", error as Error);
      message.reply("An error occurred while searching. Please try again later.");
    }
  },
};

export = search;
