import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayer,
  AudioPlayerStatus,
  VoiceConnection,
  entersState,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import { Collection, GuildMember, Snowflake } from "discord.js";
import ytdl from "@distube/ytdl-core";
import { config } from "../config/env";
import { logger } from "./logger";

export interface Track {
  title: string;
  url: string;
}

export class MusicSubscription {
  public readonly guildId: Snowflake;
  public readonly voiceConnection: VoiceConnection;
  public readonly audioPlayer: AudioPlayer = createAudioPlayer();
  public queue: Track[] = [];
  public volume: number = config.DEFAULT_VOLUME;
  private disconnectTimeout: NodeJS.Timeout | null = null;

  constructor(voiceConnection: VoiceConnection, guildId: Snowflake) {
    this.voiceConnection = voiceConnection;
    this.guildId = guildId;

    this.voiceConnection.subscribe(this.audioPlayer);

    this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
      this.queue.shift();
      if (this.queue.length > 0) {
        this.playNext();
      } else {
        this.scheduleDisconnect();
      }
    });

    this.audioPlayer.on("error", error => {
      logger.errorWithContext(`Audio error in guild ${guildId}`, error);
      this.queue.shift();
      if (this.queue.length > 0) {
        this.playNext();
      } else {
        this.scheduleDisconnect();
      }
    });
  }

  public playNext() {
    this.clearDisconnectTimeout();

    if (this.queue.length === 0) return;
    const track = this.queue[0];

    const stream = ytdl(track.url, {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25,
    });
    const resource = createAudioResource(stream, { inlineVolume: true });
    resource.volume?.setVolume(this.volume);
    this.audioPlayer.play(resource);
  }

  public enqueue(track: Track): boolean {
    this.clearDisconnectTimeout();

    if (this.queue.length >= config.MAX_QUEUE_SIZE) {
      logger.warn(`Queue full in guild ${this.guildId}, cannot add: ${track.title}`);
      return false;
    }

    this.queue.push(track);
    logger.musicEvent('Track enqueued', `${track.title} (Queue: ${this.queue.length}/${config.MAX_QUEUE_SIZE})`);

    if (this.audioPlayer.state.status === AudioPlayerStatus.Idle) {
      this.playNext();
    }
    return true;
  }

  public skip() {
    this.audioPlayer.stop();
  }

  public scheduleDisconnect(timeout?: number) {
    if (this.disconnectTimeout) return;

    const disconnectTime = timeout || config.DISCONNECT_TIMEOUT;

    logger.debug(`Scheduling disconnect in ${disconnectTime}ms for guild ${this.guildId}`);

    this.disconnectTimeout = setTimeout(() => {
      // Always disconnect when timeout is reached, regardless of audio state

      this.audioPlayer.stop();

      this.queue = [];

      this.voiceConnection.destroy();

      subscriptions.delete(this.guildId);

      logger.info(`Bot disconnected from voice channel in guild ${this.guildId} - queue cleared`);
    }, disconnectTime);
  }

  public clearDisconnectTimeout() {
    if (this.disconnectTimeout) {
      clearTimeout(this.disconnectTimeout);
      this.disconnectTimeout = null;
    }
  }

  public destroy() {
    this.clearDisconnectTimeout();

    this.audioPlayer.stop();

    this.queue = [];

    this.voiceConnection.destroy();

    subscriptions.delete(this.guildId);

    logger.info(`Music subscription destroyed for guild ${this.guildId}`);
  }
}

export const subscriptions = new Collection<Snowflake, MusicSubscription>();

export async function joinChannel(member: GuildMember): Promise<MusicSubscription> {
  const guildId = member.guild.id;

  let subscription = subscriptions.get(guildId);
  if (subscription) {
    try {
      if (subscription.voiceConnection.state.status === VoiceConnectionStatus.Destroyed) {
        subscriptions.delete(guildId);
        subscription = undefined;
      }
    } catch {
      subscriptions.delete(guildId);
      subscription = undefined;
    }
  }

  if (subscription) return subscription;

  if (!member.voice.channelId) {
    throw new Error("You need to be in a voice channel!");
  }

  const connection = joinVoiceChannel({
    channelId: member.voice.channelId,
    guildId: guildId,
    adapterCreator: member.guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false,
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
  } catch (error) {
    connection.destroy();
    throw new Error("Failed to join the voice channel.");
  }

  subscription = new MusicSubscription(connection, guildId);
  subscriptions.set(guildId, subscription);
  return subscription;
}
