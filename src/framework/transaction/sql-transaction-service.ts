import type { Pool, PoolClient } from 'pg';
import { getContext } from '../cls-hooked/run-in-context';
import { SQLTransaction } from './sql-transaction';
import type { TransactionService } from './transaction-service';

export const POOL_CLIENT_KEY = 'poolClient';
export const sqlTransactionServiceFactory = ({
  pool,
}: {
  pool: Pool;
}): TransactionService => ({
  begin: async () => {
    const poolClient = await pool.connect();
    await poolClient.query('BEGIN');
    getContext().set(POOL_CLIENT_KEY, poolClient);
    return new SQLTransaction(poolClient);
  },
  get poolClient(): PoolClient {
    const poolClient = getContext().get(POOL_CLIENT_KEY) as
      | PoolClient
      | undefined;
    if (!poolClient) {
      throw new Error(
        'PoolClient was not set (no "transactionService.begin()" call was issued before SQL repo usage)'
      );
    }

    return poolClient;
  },
});
