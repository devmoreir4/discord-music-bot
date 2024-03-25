const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pausa a reprodução da música atual.'),

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

        player.pause();

        const embed = new EmbedBuilder()
            .setColor('#D2691E')
            .setDescription('Música pausada.');

        await interaction.reply({ embeds: [embed] });
    },
};
