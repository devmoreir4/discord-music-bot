const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "poll",
  description: "Starts a poll.",
  async execute({ message, args }) {
    if (args.length < 3) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Missing Arguments")
        .setDescription("You need to provide a question and two options for the poll. Example: `!poll <question> - <option1> - <option2>`");
      return message.reply({ embeds: [embed] });
    }

    const pollData = args.join(" ").split(" - ");

    if (pollData.length !== 3) {
      const embed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Invalid Syntax")
        .setDescription("Correct syntax: `!poll <question> - <option1> - <option2>`");
      return message.reply({ embeds: [embed] });
    }

    const question = pollData[0].trim();
    const op1 = pollData[1].trim();
    const op2 = pollData[2].trim();

    const embed = new EmbedBuilder()
      .setColor("#f19962")
      .setTitle("Poll")
      .setDescription(question)
      .addFields(
        { name: "Option 1:", value: `1️⃣ ${op1}`, inline: false },
        { name: "Option 2:", value: `2️⃣ ${op2}`, inline: false }
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
        winner = `${op1} (${countOption1} votes)`;
      } else if (countOption1 < countOption2) {
        winner = `${op2} (${countOption2} votes)`;
      } else {
        winner = "Tie";
      }

      const resultEmbed = new EmbedBuilder()
        .setColor("#f19962")
        .setTitle("Poll Result")
        .setDescription(
          `**Option 1:** ${op1}\n**Option 2:** ${op2}\n\n**Winner:** ${winner}`
        );

      updatedPollMessage.edit({ embeds: [resultEmbed] }).catch(console.error);
    }, 10000); // 10 segs
  },
};
