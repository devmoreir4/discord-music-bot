const { Client, Events, GatewayIntentBits, Collection, ActivityType } = require('discord.js')
const { VoiceConnectionManager } = require('@discordjs/voice');
const fs = require("node:fs")
const path = require("node:path")
const dotenv = require('dotenv')

// dotenv
dotenv.config()
const { TOKEN } = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent] });

client.commands = new Collection()

// avatar bot
const avatarPath = './assets/xablau_bot.png';

if (fs.existsSync(avatarPath)) {
    client.once(Events.ClientReady, async () => {
        try {
            await client.user.setAvatar(avatarPath);
        } catch (error) {
            console.error('Error setting avatar:', error);
        }
    });
} else {
    console.error('Avatar file not found.');
}

// import comands
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

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
    client.user.setPresence({ activities: [{ name: '/help' }], status: 'online', afk: false, 
     description: "I'm a versatile bot, but I really like listening to music with my friends..." });
});

client.on(Events.GuildCreate, guild => {
    const channel = guild.systemChannel; // default channel

    if (channel && channel.permissionsFor(guild.me)?.has('SEND_MESSAGES')) {
        channel.send(`Olá! Eu sou XablauBOT! Use /help para ver os comandos!`);
    }
});

// interactions
client.on(Events.InteractionCreate, async interaction =>{
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error("Command not found.")
        return
    }

    try {
        await command.execute(interaction)
    } 
    catch (error) {
        console.error(error)
        await interaction.reply("Ocorreu um erro.")
    }
})

client.on(Events.GuildMemberAdd, member => {
    const guild = member.guild;
    const channel = guild.systemChannel;

    if (channel && channel.permissionsFor(guild.me)?.has('SEND_MESSAGES')) {
        channel.send(`Bem-vindo(a), ${member}! Espero que se sinta em casa!`);
    }
});

client.login(TOKEN)
