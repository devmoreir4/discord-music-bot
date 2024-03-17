const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Finaliza a reprodução da música atual.'),

    async execute(interaction) {
        const guildId = interaction.guild.id;
        const connection = getVoiceConnection(guildId);

        if (!connection) {
            return interaction.reply('Não estou conectado a nenhum canal de voz neste servidor.');
        }

        try {
            connection.destroy();
            interaction.reply('Parando a reprodução de música e desconectando do canal de voz.');
        } catch (error) {
            console.error('Erro ao parar a reprodução de música:', error);
            interaction.reply('Houve um erro ao parar a reprodução de música.');
        }
    },
};
