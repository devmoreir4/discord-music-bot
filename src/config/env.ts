import dotenv from "dotenv";

dotenv.config();

export const config = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || "",

  PREFIX: process.env.BOT_PREFIX || "!",
  ACTIVITY: process.env.BOT_ACTIVITY || "!help",
  ACTIVITY_TYPE: process.env.BOT_ACTIVITY_TYPE || "Playing",

  MAX_QUEUE_SIZE: parseInt(process.env.MAX_QUEUE_SIZE || "50"),
  DEFAULT_VOLUME: parseFloat(process.env.DEFAULT_VOLUME || "0.5"),
  DISCONNECT_TIMEOUT: parseInt(process.env.DISCONNECT_TIMEOUT || "5000"),

  NODE_ENV: process.env.NODE_ENV || "development",

  validate() {
    if (!this.DISCORD_TOKEN) {
      throw new Error("DISCORD_TOKEN is required");
    }

    if (this.MAX_QUEUE_SIZE < 1 || this.MAX_QUEUE_SIZE > 100) {
      throw new Error("MAX_QUEUE_SIZE must be between 1 and 100");
    }

    if (this.DEFAULT_VOLUME < 0 || this.DEFAULT_VOLUME > 1) {
      throw new Error("DEFAULT_VOLUME must be between 0 and 1");
    }

    const validActivityTypes = ["Playing", "Listening", "Watching", "Streaming"];
    if (!validActivityTypes.includes(this.ACTIVITY_TYPE)) {
      throw new Error(`BOT_ACTIVITY_TYPE must be one of: ${validActivityTypes.join(", ")}`);
    }
  }
};
