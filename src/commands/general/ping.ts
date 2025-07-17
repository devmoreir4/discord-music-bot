import { Command } from "../../utils/commandLoader";
import ms from "ms";
import { EmbedBuilder } from "discord.js";

const ping: Command = {
  name: "ping",
  description: "Responds with Pong and shows latency information!",
  execute: async ({ message }) => {
    const initialEmbed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Pong!");
    const initialReply = await message.reply({ embeds: [initialEmbed] });
    const startTimestamp = Date.now();

    const latency = Date.now() - startTimestamp;
    const apiLatency = Math.round(message.client.ws.ping);
    const lastHeartbeat = ms(
      Date.now() - (message.client.ws.shards.first()?.lastPingTimestamp || 0),
      { long: true }
    );

    const resultEmbed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Pong! 🏓")
      .setDescription(
        `- API Latency: **${apiLatency}ms**\n- Last heartbeat: **${lastHeartbeat}** ago\n- Message latency: **${latency}ms**`
      );
    await initialReply.edit({ embeds: [resultEmbed] });
  },
};

export = ping;
