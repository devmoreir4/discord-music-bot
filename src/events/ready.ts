import { Client } from "discord.js";
import { initializeBot } from "../config/config";
import { logger } from "../utils/logger";

export async function onReady(client: Client) {
  logger.botStart(client.guilds.cache.size);
  logger.info(`Bot is online as ${client.user?.tag}`);
  await initializeBot(client);
}
