/**
 * Custom logger configuration for suppressing Firebase warnings
 * and providing better development experience
 */

interface LogLevel {
  ERROR: 0;
  WARN: 1;
  INFO: 2;
  DEBUG: 3;
}

const LOG_LEVELS: LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

class Logger {
  private currentLevel: number = __DEV__ ? LOG_LEVELS.DEBUG : LOG_LEVELS.ERROR;
  private suppressedPatterns: string[] = [
    '@firebase/firestore',
    'WebChannelConnection',
    'RPC',
    'stream',
    'transport errored'
  ];

  constructor() {
    this.setupFirebaseWarningSuppress();
  }

  private setupFirebaseWarningSuppress() {
    if (__DEV__) {
      const originalWarn = console.warn;
      const originalError = console.error;

      console.warn = (...args: any[]) => {
        const message = args.join(' ');
        if (this.shouldSuppressMessage(message)) {
          return;
        }
        originalWarn.apply(console, args);
      };

      console.error = (...args: any[]) => {
        const message = args.join(' ');
        if (this.shouldSuppressMessage(message)) {
          return;
        }
        originalError.apply(console, args);
      };
    }
  }

  private shouldSuppressMessage(message: string): boolean {
    return this.suppressedPatterns.some(pattern => 
      message.toLowerCase().includes(pattern.toLowerCase())
    );
  }

  error(message: string, ...args: any[]) {
    if (this.currentLevel >= LOG_LEVELS.ERROR) {
      console.error('🔴', message, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.currentLevel >= LOG_LEVELS.WARN) {
      console.warn('🟡', message, ...args);
    }
  }

  info(message: string, ...args: any[]) {
    if (this.currentLevel >= LOG_LEVELS.INFO) {
      console.info('🔵', message, ...args);
    }
  }

  debug(message: string, ...args: any[]) {
    if (this.currentLevel >= LOG_LEVELS.DEBUG) {
      console.log('🟢', message, ...args);
    }
  }

  firebase(message: string, ...args: any[]) {
    if (__DEV__) {
      console.log('🔥', message, ...args);
    }
  }
}

export const logger = new Logger();
export default logger;
