import { Client, ActivityType } from "discord.js";
import path from "path";
import fs from "fs";
import { config } from "./env";
import { logger } from "../utils/logger";

export async function initializeBot(client: Client) {
  const avatarPath = path.join(__dirname, "../assets/capybara.png");
  const bannerPath = path.join(__dirname, "../assets/banner_capyvibes.png");

  if (fs.existsSync(avatarPath)) {
    try {
      await client.user?.setAvatar(avatarPath);
      logger.info("Avatar initialized successfully!");
    } catch (error) {
      logger.errorWithContext("Error initializing avatar", error as Error);
    }
  } else {
    logger.warn("Avatar file not found.");
  }

  if (fs.existsSync(bannerPath)) {
    try {
      await client.user?.setBanner(bannerPath);
      logger.info("Banner initialized successfully!");
    } catch (error) {
      logger.errorWithContext("Error initializing banner", error as Error);
    }
  } else {
    logger.warn("Banner file not found.");
  }

  try {
    const activityType = config.ACTIVITY_TYPE === "Playing" ? ActivityType.Playing :
                        config.ACTIVITY_TYPE === "Listening" ? ActivityType.Listening :
                        config.ACTIVITY_TYPE === "Watching" ? ActivityType.Watching :
                        config.ACTIVITY_TYPE === "Streaming" ? ActivityType.Streaming :
                        ActivityType.Playing;

    await client.user?.setActivity(config.ACTIVITY, { type: activityType });
    logger.info("Initial description set successfully!");
  } catch (error) {
    logger.errorWithContext("Error setting initial description", error as Error);
  }
}
