import { Client, GatewayIntentBits, Events } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import { loadCommands } from "./utils/commandLoader";
import { onReady } from "./events/ready";
import { onMessageCreate } from "./events/messageCreate";
import { onGuildMemberAdd } from "./events/guildMemberAdd";
import { onGuildCreate } from "./events/guildCreate";
import { onGuildDelete } from "./events/guildDelete";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

const prefix = "!";
const commands = loadCommands(path.join(__dirname, "commands"));

// events
client.once("ready", async () => onReady(client));
client.on("messageCreate", (message) => onMessageCreate(message, prefix, commands));
client.on(Events.GuildMemberAdd, onGuildMemberAdd);
client.on(Events.GuildCreate, onGuildCreate);
client.on(Events.GuildDelete, onGuildDelete);

client.login(process.env.DISCORD_TOKEN);
