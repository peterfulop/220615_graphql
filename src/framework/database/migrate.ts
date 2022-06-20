import { join } from 'path';
import Knex from 'knex';
import { config } from '../../config';
import type { Logger } from '../logger/logger';
import {
  handleUnhandledRejections,
  throwToGlobal,
} from '../unhandled-rejection/rejection-handler';
import { loggerFactoryPino } from '../logger/logger-pino';
import { knexConfig } from './knex-config';

export const migrate = async ({
  drop,
  logger,
  schemaName,
  migrationDirectoryPath,
  connectionString,
}: {
  drop: boolean;
  logger: Logger;
  schemaName?: string;
  migrationDirectoryPath: string;
  connectionString: string;
}): Promise<void> => {
  const knex = Knex(
    knexConfig({
      schemaName,
      logger,
      migrationDirectoryPath,
      connectionString,
      migrationStub: '',
    })
  );

  try {
    if (drop) {
      await knex.migrate.rollback({}, true);
    } else {
      await knex.migrate.latest();
    }
    logger.info('Migration successful');
  } finally {
    await knex.destroy();
  }
};

if (!module.parent) {
  const logger = loggerFactoryPino({
    level: 'debug',
    name: 'migration',
    version: '1.0',
  });

  handleUnhandledRejections();

  migrate({
    drop: process.argv.includes('--drop'),
    logger,
    migrationDirectoryPath: join(__dirname, '../../migrations'),
    connectionString: config.databaseUrl,
    ...(config.databaseUseSSL ? { ssl: true } : {}),
  }).catch(throwToGlobal);
}
