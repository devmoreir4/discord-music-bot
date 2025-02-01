import { Command } from "../../utils/commandLoader";
import ms from "ms";

const ping: Command = {
  name: "ping",
  description: "Responde com Pong e mostra informações de latência!",
  execute: async ({ message }) => {
    const initialReply = await message.reply("Pong!");
    const startTimestamp = Date.now();

    const latency = Date.now() - startTimestamp;

    const apiLatency = Math.round(message.client.ws.ping);

    const lastHeartbeat = ms(
      Date.now() - (message.client.ws.shards.first()?.lastPingTimestamp || 0),
      { long: true }
    );

    await initialReply.edit(
      `Pong! 🏓\n\n- Latência da API: **${apiLatency}ms**\n- Último heartbeat: **${lastHeartbeat}** atrás\n- Latência da mensagem: **${latency}ms**`
    );
  },
};

export = ping;
