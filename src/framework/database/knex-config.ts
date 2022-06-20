import type { Knex } from 'knex';
import type { Logger } from '../logger/logger';

export const knexConfig = ({
  schemaName,
  logger,
  connectionString,
  migrationDirectoryPath,
  migrationStub,
}: {
  schemaName?: string;
  logger: Logger;
  connectionString: string;
  migrationDirectoryPath: string;
  migrationStub: string;
}): Knex.Config => {
  return {
    client: 'pg',
    connection: connectionString,
    pool: { min: 0, max: 7 },
    migrations: {
      tableName: 'knex_migrations',
      stub: migrationStub,
      directory: migrationDirectoryPath,
      schemaName: schemaName,
    },
    log: {
      warn: (msg) => logger.warn(msg),
      error: (msg) => logger.error(msg),
      debug: (msg) => logger.debug(msg),
      deprecate: (msg) => logger.warn(msg),
    },
  };
};
