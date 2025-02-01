import { Client } from "discord.js";
import { initializeBot } from "../config/config";

export async function onReady(client: Client) {
  console.log(`🎧 Bot is online as ${client.user?.tag}`);
  console.log(`🌐 Connected to ${client.guilds.cache.size} servers`);
  await initializeBot(client);
}
