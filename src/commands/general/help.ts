import { Command } from "../../utils/commandLoader";
import { EmbedBuilder } from "discord.js";

const help: Command = {
  name: "help",
  description: "Displays the available commands for CapyVibes.",
  execute: async ({ message }) => {
    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("CapyVibes Commands")
      .setDescription("Here is the list of available commands and how to use them:")
      .addFields([
        { name: "!help", value: "Displays this help message.", inline: false },
        { name: "!avatar <user>", value: "Shows the mentioned user's avatar.", inline: false },
        { name: "!ping", value: "Checks the bot's latency.", inline: false },
        { name: "!membercount", value: "Shows the server's member count.", inline: false },
        { name: "!userinfo", value: "Shows information about the user.", inline: false },
        { name: "!uptime", value: "Shows the bot's uptime.", inline: false },
        { name: "!clear <amount>", value: "Deletes messages from the chat.", inline: false },
        { name: "!poll <question> - <option1> - <option2>", value: "Starts a poll.", inline: false },
        { name: "!play <YouTube URL>", value: "Plays a song and adds it to the queue.", inline: false },
        { name: "!search <song name>", value: "Search for music on YouTube.", inline: false },
        { name: "!pause", value: "Pauses the current song.", inline: false },
        { name: "!resume", value: "Resumes the paused song.", inline: false },
        { name: "!skip", value: "Skips to the next song in the queue.", inline: false },
        { name: "!queue", value: "Shows the music queue.", inline: false },
        { name: "!remove <index>", value: "Removes a song from the queue.", inline: false },
        { name: "!stop", value: "Stops playback and clears the queue.", inline: false },
        { name: "!volume <number>", value: "Sets the current song's volume (0 to 100).", inline: false },
        { name: "!roll <number>", value: "Rolls a dice with the specified number of sides.", inline: false },
        { name: "!userinfo <user>", value: "Shows information about a specific user.", inline: false },
        { name: "!setstatus <type> <message>", value: "Changes the bot's status. Types: playing, streaming, listening, watching.", inline: false },
        { name: "!remind <minutes> <message>", value: "Sets a reminder for the user.", inline: false },
      ])
      .setFooter({ text: "Made by @devmoreir4" });

    await message.reply({ embeds: [embed] });
  },
};

export = help;
