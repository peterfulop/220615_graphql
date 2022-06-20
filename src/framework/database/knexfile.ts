import { join } from 'path';
import { config } from '../../config';
import { loggerFactoryPino } from '../logger/logger-pino';
import { knexConfig } from './knex-config';

module.exports = knexConfig({
  logger: loggerFactoryPino({
    level: 'debug',
    name: 'migration',
    version: '1.0',
  }),
  schemaName:
    process.argv
      .find((a) => a.startsWith('--schema='))
      ?.slice('--schema='.length) || undefined,
  connectionString: config.databaseUrl,
  migrationDirectoryPath: '../../migrations',
  migrationStub: join(__dirname, './migration.ts.stub'),
});
