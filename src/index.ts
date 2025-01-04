import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import { loadCommands } from "./utils/commandLoader";
import { onReady } from "./events/ready";
import { onMessageCreate } from "./events/messageCreate";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = "!";
const commands = loadCommands(path.join(__dirname, "commands"));

// events
client.once("ready", async () => onReady(client));
client.on("messageCreate", (message) => onMessageCreate(message, prefix, commands));

client.login(process.env.DISCORD_TOKEN);
