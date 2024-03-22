const { SlashCommandBuilder, EmbedBuilder, MessageEmbed } = require("discord.js")

const exampleEmbed = new EmbedBuilder()
	.setColor("#D2691E")
	.setTitle("Comandos XablauBOT")
    .setDescription('Lista de comandos disponíveis do XablauBOT')
    .setAuthor({ name: 'XablauBOT', iconURL: 'https://media.discordapp.net/ephemeral-attachments/1192665515978657824/1218638896867446885/3d40d2c6ab81847eebcb3021ba0d3803.webp?ex=660864ea&is=65f5efea&hm=1c395687f78fa299a063661c718b7fea4780426703b245374ff8b71c40986a33&=&format=webp' })
    .setThumbnail('https://cdn.pixabay.com/photo/2017/07/24/04/23/technical-support-2533526_1280.png')
	.addFields(
        { name: '/help', value: 'Exibe a lista de comandos disponíveis.', inline: true },
        { name: '/avatar [user]', value: 'Exibe o avatar do usuário mencionado.', inline: true },
        { name: '/ping', value: 'Verifica a latência do bot.', inline: true },
        { name: '/clear [amount]', value: 'Deleta mensagens do chat.', inline: true },
        { name: '/play [link]', value: 'Reproduz uma música a partir de um link do YouTube.', inline: true },
        { name: '/pause', value: 'Em construção.', inline: true },
        { name: '/stop', value: 'Finaliza a reprodução de uma música.', inline: true },
        { name: '/poll [question] [option1] [option2]', value: 'Em construção.', inline: true }
    )
    .setTimestamp()
    .setFooter({ text: 'Made by @devmoreir4'}); // iconURL: '#'

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Exibe os comandos XablauBOT."),

    async execute(interaction) {
        await interaction.reply({ embeds: [exampleEmbed] })
    }
}