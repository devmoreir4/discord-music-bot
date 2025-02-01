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

export interface Track {
  title: string;
  filePath: string;
}

export class MusicSubscription {
  public readonly voiceConnection: VoiceConnection;
  public readonly audioPlayer: AudioPlayer = createAudioPlayer();
  public queue: Track[] = [];
  public volume: number = 1;

  constructor(voiceConnection: VoiceConnection) {
    this.voiceConnection = voiceConnection;

    this.voiceConnection.subscribe(this.audioPlayer);

    this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
      this.queue.shift();
      if (this.queue.length > 0) {
        this.playNext();
      }
    });

    this.audioPlayer.on("error", error => {
      console.error(`Erro no áudio: ${error.message}`);
      this.queue.shift();
      if (this.queue.length > 0) {
        this.playNext();
      }
    });
  }

  public playNext() {
    if (this.queue.length === 0) return;
    const track = this.queue[0];

    const resource = createAudioResource(track.filePath, { inlineVolume: true });
    resource.volume?.setVolume(this.volume);
    this.audioPlayer.play(resource);
  }

  public enqueue(track: Track) {
    this.queue.push(track);
    if (this.audioPlayer.state.status === AudioPlayerStatus.Idle) {
      this.playNext();
    }
  }

  public skip() {
    this.audioPlayer.stop();
  }
}

export const subscriptions = new Collection<Snowflake, MusicSubscription>();

export async function joinChannel(member: GuildMember): Promise<MusicSubscription> {
  const guildId = member.guild.id;

  let subscription = subscriptions.get(guildId);
  if (subscription) return subscription;

  if (!member.voice.channelId) {
    throw new Error("Você precisa estar em um canal de voz!");
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
    throw new Error("Falha ao entrar no canal de voz.");
  }

  subscription = new MusicSubscription(connection);
  subscriptions.set(guildId, subscription);
  return subscription;
}

