const { SlashCommandBuilder, EmbedBuilder, MessageEmbed } = require("discord.js")

const exampleEmbed = new EmbedBuilder()
	.setColor("#D2691E")
	.setTitle("Comandos XablauBOT")
    .setDescription('Lista de comandos disponíveis do XablauBOT')
    .setAuthor({ name: 'XablauBOT', iconURL: 'https://cdn.discordapp.com/ephemeral-attachments/1192665515978657824/1223359799736008764/d368784750c1d7efc28d76871215bc86.webp?ex=66199199&is=66071c99&hm=a784fe10433ccbafd1a080c6633aea7a206af5a4e3b7d65e468271d6586e1d81&' })
    .setThumbnail('https://cdn.pixabay.com/photo/2017/07/24/04/23/technical-support-2533526_1280.png')
	.addFields(
        { name: '/help', value: 'Exibe a lista de comandos disponíveis.', inline: true },
        { name: '/avatar [user]', value: 'Exibe o avatar do usuário mencionado.', inline: true },
        { name: '/ping', value: 'Verifica a latência do bot.', inline: true },
        { name: '/clear [amount]', value: 'Deleta mensagens do chat.', inline: true },
        { name: '/play [link]', value: 'Reproduz uma música a partir de um link do YouTube.', inline: true },
        { name: '/pause', value: 'Pausa a reprodução da música atual.', inline: true },
        { name: '/resume', value: 'Retoma a reprodução da música pausada.', inline: true },
        { name: '/stop', value: 'Finaliza a reprodução de uma música.', inline: true },
        { name: '/poll [question] [option1] [option2]', value: 'Inicia uma enquete.', inline: true },
        { name: '/volume', value: 'under construction.', inline: true },
        { name: '/weather', value: 'under construction.', inline: true }
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