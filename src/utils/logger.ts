import { config } from "../config/env";

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

class Logger {
  private getLogLevel(): LogLevel {
    if (config.NODE_ENV === 'development') {
      return LogLevel.DEBUG;
    } else if (config.NODE_ENV === 'production') {
      return LogLevel.INFO;
    }
    return LogLevel.INFO;
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.getLogLevel();
  }

  private formatMessage(level: string, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}]`;

    if (config.NODE_ENV === 'development') {
      return `${prefix} ${message} ${args.length > 0 ? JSON.stringify(args, null, 2) : ''}`;
    }

    return `${prefix} ${message}`;
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage('ERROR', message, ...args));
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage('WARN', message, ...args));
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage('INFO', message, ...args));
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.formatMessage('DEBUG', message, ...args));
    }
  }

  // Bot-specific logging methods
  botStart(guildCount: number): void {
    this.info(`Bot is online and connected to ${guildCount} servers`);
  }

  commandExecuted(command: string, user: string, guild: string): void {
    this.debug(`Command executed: ${command} by ${user} in ${guild}`);
  }

  musicEvent(event: string, details: string): void {
    this.debug(`Music event: ${event} - ${details}`);
  }

  errorWithContext(context: string, error: Error): void {
    this.error(`${context}: ${error.message}`, error.stack);
  }
}

export const logger = new Logger();
