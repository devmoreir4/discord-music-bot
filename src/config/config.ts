import { Client, ActivityType } from "discord.js";
import path from "path";
import fs from "fs";

export async function initializeBot(client: Client) {
  const avatarPath = path.join(__dirname, "../assets/capybara.png");

  // avatar
  if (fs.existsSync(avatarPath)) {
    try {
      await client.user?.setAvatar(avatarPath);
      console.log("😎 Avatar initialized successfully!");
    } catch (error) {
      console.error("❌ Error initializing avatar:", error);
    }
  } else {
    console.log("⚠️ Avatar file not found.");
  }

  // activity
  try {
    await client.user?.setActivity("!help", { type: ActivityType.Playing });
    console.log("📌 Initial description set successfully!");
  } catch (error) {
    console.error("❌ Error setting initial description:", error);
  }
}
