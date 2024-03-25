const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Retoma a reprodução da música pausada.'),

    async execute(interaction) {
        const guildId = interaction.guildId;
        const connection = getVoiceConnection(guildId);

        if (!connection) {
            return interaction.reply('Não há nenhuma conexão de voz ativa neste servidor.');
        }

        if (!connection.joinConfig.channelId === interaction.member.voice.channelId) {
            return interaction.reply('Você não pode usar este comando agora.');
        }

        const player = connection.state.subscription.player;

        player.unpause();

        const embed = new EmbedBuilder()
            .setColor('#D2691E')
            .setDescription('Música retomada.');

        await interaction.reply({ embeds: [embed] });
    },
};
