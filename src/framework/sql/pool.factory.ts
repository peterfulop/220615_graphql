import type { PoolConfig } from 'pg';
import { Pool } from 'pg';
import { config } from '../../config';

export const poolFactory = (connectionConfig?: string): Pool => {
  const poolConfig: PoolConfig = {
    connectionString: connectionConfig ?? config.databaseUrl,
    ...(config.databaseUseSSL ? { ssl: true } : {}),
  };
  return new Pool(poolConfig);
};
