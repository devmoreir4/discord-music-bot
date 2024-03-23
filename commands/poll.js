const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Cria uma enquete.")
        .addStringOption(option =>
            option.setName('question')
                .setDescription('A pergunta da enquete')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('op1')
                .setDescription('Primeira opção.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('op2')
                .setDescription('Segunda opção.')
                .setRequired(true)),

    async execute(interaction) {
        const question = interaction.options.getString('question');
        const op1 = interaction.options.getString('op1');
        const op2 = interaction.options.getString('op2');

        const embed = {
            color: 0x0099ff,
            title: 'Enquete',
            description: question,
            fields: [
                { name: 'Opção 1:', value: ` 1️⃣ ${op1}`, inline: false },
                { name: 'Opção 2:', value: ` 2️⃣ ${op2}`, inline: false }
            ]
        };

        const reply = await interaction.reply({ embeds: [embed] });
        const pollMessage = await interaction.fetchReply();

        await pollMessage.react('1️⃣');
        await pollMessage.react('2️⃣');

        const filter = (reaction, user) => {
            return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && !user.bot;
        };

        const collector = pollMessage.createReactionCollector({ filter, time: 60000 });

        let votes = {
            '1️⃣': 0,
            '2️⃣': 0
        };

        collector.on('collect', (reaction, user) => {
            votes[reaction.emoji.name]++;
        });

        collector.on('end', collected => {
            interaction.followUp(`Votos encerrados! Resultados da enquete "${question}":
            Opção 1 (${op1}): ${votes['1️⃣']} votos
            Opção 2 (${op2}): ${votes['2️⃣']} votos`);
        });
    }
};
