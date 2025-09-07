import { VoiceState, VoiceChannel } from "discord.js";
import { subscriptions } from "../utils/musicManager";
import { logger } from "../utils/logger";
import { config } from "../config/env";

export const onVoiceStateUpdate = async (oldState: VoiceState, newState: VoiceState) => {
  try {
    const guildId = oldState.guild.id;
    const subscription = subscriptions.get(guildId);

    if (oldState.member?.id === oldState.client.user?.id) {
      if (oldState.channelId && !newState.channelId) {
        logger.info(`Bot was manually disconnected from voice channel in ${oldState.guild.name}`);

        if (subscription) {
          subscription.destroy();
        }
        return;
      } else if (!oldState.channelId && newState.channelId) {
        logger.info(`Bot was reconnected to voice channel in ${oldState.guild.name}`);
        // Note: New subscription will be created when user runs a music command
        return;
      }
    }

    if (!oldState.channelId && !newState.channelId) return;
    if (!subscription) return;

    const botVoiceState = oldState.guild.members.me?.voice;
    if (!botVoiceState?.channelId) return;

    const botChannel = botVoiceState.channel as VoiceChannel;
    if (!botChannel) return;

    const membersInChannel = botChannel.members.filter(member => !member.user.bot);
    const memberCount = membersInChannel.size;

    logger.debug(`Voice state update in ${oldState.guild.name}: ${memberCount} human members in voice channel`);

    if (memberCount === 0) {
      logger.info(`Bot is alone in voice channel in ${oldState.guild.name}, scheduling disconnect`);

      subscription.clearDisconnectTimeout();
      subscription.scheduleDisconnect(config.ALONE_DISCONNECT_TIMEOUT);
      logger.debug(`Disconnect scheduled for ${config.ALONE_DISCONNECT_TIMEOUT}ms in guild ${guildId}`);
    } else {
      subscription.clearDisconnectTimeout();
      logger.debug(`Members present in voice channel, clearing disconnect timeout`);
    }

  } catch (error) {
    logger.errorWithContext("Error in voiceStateUpdate", error as Error);
  }
};
