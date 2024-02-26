const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')

// import comands
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else  {
        console.log(`This command ${filePath} is missing "data" or "execute"`)
    } 
}

// bot login
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
});

client.on(Events.GuildCreate, guild => {
    const channel = guild.systemChannel; // canal de texto padrao

    if (channel && channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
        channel.send(`Olá! Eu sou XablauBOT e cheguei pra somar! /help para ver os comandos!`);
    }
});

client.login(TOKEN)

// Listener de interações
client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
        console.error("Command not found")
        return
    }
    try {
        await command.execute(interaction)
    } 
    catch (error) {
        console.error(error)
        await interaction.reply("An error has occurred")
    }
})

// random message reactions