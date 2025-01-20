import { Client, ActivityType } from "discord.js";
import path from "path";
import fs from "fs";

export async function initializeBot(client: Client) {
  const avatarPath = path.join(__dirname, "../assets/avatar.png");

  // avatar
  if (fs.existsSync(avatarPath)) {
    try {
      await client.user?.setAvatar(avatarPath);
      console.log("Avatar do bot inicializado com sucesso!");
    } catch (error) {
      console.error("Erro ao inicializar o avatar do bot:", error);
    }
  } else {
    console.log("O arquivo de avatar não foi encontrado.");
  }

  // activity
  try {
    await client.user?.setActivity("!help", { type: ActivityType.Playing });
    console.log("Descrição do bot inicializada com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar a descrição do bot:", error);
  }
}
