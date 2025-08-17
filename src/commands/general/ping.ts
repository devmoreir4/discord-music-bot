import { Command } from "../../utils/commandLoader";
import ms from "ms";

const ping: Command = {
  name: "ping",
  description: "Responds with Pong and shows latency information!",
  execute: async ({ message }) => {
    const startTimestamp = Date.now();
    const initialReply = await message.reply("Pong!");

    const latency = Date.now() - startTimestamp;
    const apiLatency = Math.round(message.client.ws.ping);
    const lastHeartbeat = ms(
      Date.now() - (message.client.ws.shards.first()?.lastPingTimestamp || 0),
      { long: true }
    );

    await initialReply.edit(`Pong! API Latency: ${apiLatency}ms | Last heartbeat: ${lastHeartbeat} ago | Message latency: ${latency}ms`);
  },
};

export = ping;
