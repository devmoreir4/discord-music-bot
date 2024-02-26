const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

const exampleEmbed = new EmbedBuilder()
	.setColor("#006400")
	.setTitle("Comandos Disponíveis do XablauBOT")
	.addFields(
        { name: '/help', value: 'Exibe a lista de comandos disponíveis.', inline: true },
        { name: '/avatar', value: 'Exibe o avatar do usuário mencionado.', inline: true },
        { name: '/ping', value: 'Verifica a latência do bot.', inline: true },
        { name: '/play [link]', value: 'Em construção.', inline: true },
        { name: '/pause', value: 'Em construção.', inline: true },
        { name: '/stop', value: 'Em construção.', inline: true },
        { name: '/joke', value: 'Em construção.', inline: true },
        { name: '/vote [pergunta] [op1] [op2]', value: 'Em construção.', inline: true },
        { name: '/news', value: 'Em construção.', inline: true },
        { name: '/weather', value: 'Em construção.', inline: true },
        { name: '/clear [qtde]', value: 'Deleta mensagens do chat.', inline: true }
    );

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Exibe os comandos XablauBOT."),

    async execute(interaction) {
        await interaction.reply({ embeds: [exampleEmbed] })
    }
}