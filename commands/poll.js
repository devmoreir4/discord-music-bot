const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Inicia uma enquete.")
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
            color: 0xD2691E,
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

        setTimeout(async () => {
            const updatedPollMessage = await pollMessage.fetch();
            const reactions = updatedPollMessage.reactions.cache;

            let countOption1 = 0;
            let countOption2 = 0;

            if (reactions.has('1️⃣')) {
                countOption1 = reactions.get('1️⃣').count - 1;
            }
            if (reactions.has('2️⃣')) {
                countOption2 = reactions.get('2️⃣').count - 1;
            }

            let winner;
            if (countOption1 > countOption2) {
                winner = `${op1} (${countOption1} votos)`;
            } else if (countOption1 < countOption2) {
                winner = `${op2} (${countOption2} votos)`;
            } else {
                winner = 'Empate';
            }

            const resultEmbed = {
                color: 0xD2691E,
                title: 'Resultado da Enquete',
                description: `**Opção 1:** ${op1}\n**Opção 2:** ${op2}\n\n**Vencedor:** ${winner}`
            };

            interaction.editReply({ embeds: [resultEmbed] }).catch(console.error);
        }, 10000);
    }
};