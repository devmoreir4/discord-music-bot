import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import { loadCommands } from "./utils/commandLoader";
import fs from "fs";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const prefix = "!";
const commands = loadCommands(path.join(__dirname, "commands"));

client.once("ready", async () => {
  console.log(`Bot está online como ${client.user?.tag}`);

  const avatarPath = path.join(__dirname, "./assets/avatar.png");

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

  try {
    await client.user?.setActivity("!help", { type: ActivityType.Playing });
    console.log("Descrição do bot inicializada com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar a descrição do bot:", error);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName || !commands.has(commandName)) return;

  const command = commands.get(commandName);

  try {
    await command?.execute({ message, args });
  } catch (error) {
    console.error(error);
    await message.reply("Ocorreu um erro ao executar este comando.");
  }
});

client.login(process.env.DISCORD_TOKEN);
