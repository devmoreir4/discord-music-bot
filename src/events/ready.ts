import { Client } from "discord.js";
import { initializeBot } from "../config/config";

export async function onReady(client: Client) {
  console.log(`Bot está online como ${client.user?.tag}`);
  await initializeBot(client);
}
