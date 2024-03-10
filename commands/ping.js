const { SlashCommandBuilder } = require("discord.js");
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde com 'Pong'!"),

    async execute(interaction) {
        const initialReply = await interaction.reply("Pong!");
        const startTimestamp = Date.now();

        const pingMessage = await interaction.editReply("Ping?");
        const latency = Date.now() - startTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);
        const lastHeartbeat = ms(Date.now() - interaction.client.ws.shards.first().lastPingTimestamp, { long: true });

        await pingMessage.edit(`Pong! API latency is ${apiLatency}ms. Last heartbeat calculated ${lastHeartbeat} ago. Interaction latency is ${latency}ms.`);
    }
};
