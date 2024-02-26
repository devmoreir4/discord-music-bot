const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Deleta mensagens do chat.")
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('O total de mensagens a serem deletadas')
                .setRequired(true)),

    async execute(interaction) {
        if (!interaction.inCachedGuild() || !interaction.isCommand()) return;

        const amount = interaction.options.getInteger('quantidade');
        
        if (amount <= 0 || amount > 100) {
            return interaction.reply('Informe uma quantidade entre 1 e 100.');
        }

        await interaction.deferReply({ ephemeral: true });

        interaction.channel.bulkDelete(amount, true)
            .then(deletedMessages => {
                interaction.editReply(`Foram deletadas ${deletedMessages.size} mensagens.`);
            })
            .catch(error => {
                console.error('Erro ao tentar deletar mensagens:', error);
                interaction.editReply('Não foi possível deletar as mensagens.');
            });
    }
};
