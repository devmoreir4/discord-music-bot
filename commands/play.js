const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Reproduz uma música a partir de um link do YouTube.')
        .addStringOption(option =>
            option.setName('link')
                .setDescription('O link da música no YouTube.')
                .setRequired(true)),

    async execute(interaction) {
        const channel = interaction.member.voice.channel;

        if (!channel) {
            return interaction.reply('Você precisa estar em um canal de voz para usar este comando!');
        }

        const link = interaction.options.getString('link');

        if (!ytdl.validateURL(link)) {
            return interaction.reply({ content: 'Link inválido!', ephemeral: true });
        }

        try {
            const existingConnection = getVoiceConnection(channel.guild.id);
            if (existingConnection) {
                return interaction.reply('Já existe uma conexão de voz neste servidor!');
            }

            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            });

            const player = createAudioPlayer();

            const info = await ytdl.getInfo(link);
            const resource = createAudioResource(ytdl(link, { filter: 'audioonly' })); // recurso de áudio

            player.play(resource);

            connection.subscribe(player);

            const embed = new EmbedBuilder()
                .setColor('#D2691E')
                .setDescription(`Tocando **${info.videoDetails.title}** - ${link}`);
                
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erro ao criar a conexão de voz:', error);
            await interaction.reply('Houve um erro ao reproduzir a música.');
        }
    },
};