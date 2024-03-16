const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Cria e gerencia uma conexão de voz no servidor.'),

    async execute(interaction) {
        const channel = interaction.member.voice.channel;

        if (!channel) {
            return interaction.reply('Você precisa estar em um canal de voz para usar este comando!');
        }

        try {
            // Verifica se já existe uma conexão de voz no servidor
            const existingConnection = getVoiceConnection(channel.guild.id);
            if (existingConnection) {
                return interaction.reply('Já existe uma conexão de voz neste servidor!');
            }

            // Cria a conexão de voz
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            // Responde ao usuário que a conexão foi criada com sucesso
            await interaction.reply('Conexão de voz criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar a conexão de voz:', error);
            await interaction.reply('Houve um erro ao criar a conexão de voz.');
        }
    },
};
