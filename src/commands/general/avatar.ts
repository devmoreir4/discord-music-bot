import { Command } from "../../utils/commandLoader";

const avatar: Command = {
  name: "avatar",
  description: "Exibe o avatar do usuário mencionado. Uso: !avatar @usuário",
  execute: async ({ message, args }) => {
    if (args.length === 0) {
      await message.reply("Você deve mencionar um usuário. Exemplo: `!avatar @usuário`");
      return;
    }

    const user = message.mentions.users.first();

    if (!user) {
      await message.reply("Mencione um usuário válido. Exemplo: `!avatar @usuário`");
      return;
    }

    const avatarURL = user.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 256,
    });

    await message.reply({
      files: [avatarURL]
    });
  },
};

export = avatar;
