import { Client, GatewayIntentBits, Events } from "discord.js";
import path from "path";
import { config } from "./config/env";
import { loadCommands } from "./utils/commandLoader";
import { onReady } from "./events/ready";
import { onMessageCreate } from "./events/messageCreate";
import { onGuildMemberAdd } from "./events/guildMemberAdd";
import { onGuildCreate } from "./events/guildCreate";
import { onGuildDelete } from "./events/guildDelete";
import { onVoiceStateUpdate } from "./events/voiceStateUpdate";

config.validate();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

const commands = loadCommands(path.join(__dirname, "commands"));

client.once("clientReady", async () => onReady(client));
client.on("messageCreate", (message) => onMessageCreate(message, config.PREFIX, commands));
client.on(Events.GuildMemberAdd, onGuildMemberAdd);
client.on(Events.GuildCreate, onGuildCreate);
client.on(Events.GuildDelete, onGuildDelete);
client.on(Events.VoiceStateUpdate, onVoiceStateUpdate);

client.login(config.DISCORD_TOKEN);
