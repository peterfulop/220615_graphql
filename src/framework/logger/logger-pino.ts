import { Writable } from 'stream';
import pino from 'pino';
import { toPgDateString } from '../database/to-pg-date-string';
import type { Logger } from './logger';

class ConsoleStream extends Writable {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  _write(chunk: string, _encoding: string, done: () => void): void {
    console.log(chunk.toString());
    done();
  }
}

export const loggerFactoryPino = ({
  level,
  name,
  version,
}: {
  level: string;
  name: string;
  version: string;
}): Logger => {
  return pino(
    {
      name,
      level,
      timestamp: () => `,"time":"${toPgDateString(new Date())}"`,
      messageKey: 'msg',
      prettyPrint: process.env.PRETTY_PRINT === 'true',
      redact: ['req.headers.authorization'],
    },
    new ConsoleStream()
  ).child({ version });
};
