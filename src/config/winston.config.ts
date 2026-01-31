import * as winston from 'winston';
import 'winston-daily-rotate-file';

const isProduction = process.env.NODE_ENV === 'prod';

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
    const ctx = typeof context === 'string' ? context : 'Application';
    const msg = typeof message === 'string' ? message : JSON.stringify(message);
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${String(timestamp)} [${ctx}] ${String(level)}: ${msg}${metaStr}`;
  }),
);

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

export const winstonConfig: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: isProduction ? 'info' : 'debug',
      format: consoleFormat,
    }),

    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'app-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
      format: fileFormat,
    }),

    new winston.transports.DailyRotateFile({
      dirname: 'logs',
      filename: 'error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d',
      level: 'error',
      format: fileFormat,
    }),
  ],
};
