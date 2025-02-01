const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "poll",
  description: "Inicia uma enquete.",
  async execute({ message, args }) {
    if (args.length < 3) {
      return message.reply("Você precisa fornecer uma pergunta e duas opções para a enquete. Exemplo: `!poll <pergunta> - <opção1> - <opção2>`");
    }

    const pollData = args.join(" ").split(" - ");

    if (pollData.length !== 3) {
      return message.reply("A sintaxe correta é: `!poll <pergunta> - <opção1> - <opção2>`");
    }

    const question = pollData[0].trim();
    const op1 = pollData[1].trim();
    const op2 = pollData[2].trim();

    const embed = new EmbedBuilder()
      .setColor(0xD2691E)
      .setTitle("Enquete")
      .setDescription(question)
      .addFields(
        { name: "Opção 1:", value: `1️⃣ ${op1}`, inline: false },
        { name: "Opção 2:", value: `2️⃣ ${op2}`, inline: false }
      );

    const pollMessage = await message.channel.send({ embeds: [embed] });

    await pollMessage.react("1️⃣");
    await pollMessage.react("2️⃣");

    setTimeout(async () => {
      const updatedPollMessage = await pollMessage.fetch();
      const reactions = updatedPollMessage.reactions.cache;

      let countOption1 = 0;
      let countOption2 = 0;

      if (reactions.has("1️⃣")) {
        countOption1 = reactions.get("1️⃣").count - 1;
      }
      if (reactions.has("2️⃣")) {
        countOption2 = reactions.get("2️⃣").count - 1;
      }

      let winner;
      if (countOption1 > countOption2) {
        winner = `${op1} (${countOption1} votos)`;
      } else if (countOption1 < countOption2) {
        winner = `${op2} (${countOption2} votos)`;
      } else {
        winner = "Empate";
      }

      const resultEmbed = new EmbedBuilder()
        .setColor(0xD2691E)
        .setTitle("Resultado da Enquete")
        .setDescription(
          `**Opção 1:** ${op1}\n**Opção 2:** ${op2}\n\n**Vencedor:** ${winner}`
        );

      updatedPollMessage.edit({ embeds: [resultEmbed] }).catch(console.error);
    }, 10000); // 10 segs
  },
};
