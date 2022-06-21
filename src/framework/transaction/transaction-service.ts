import type { PoolClient } from 'pg';
import type { Transaction } from './transaction';

export interface TransactionService {
  begin(): Promise<Transaction>;
  poolClient: PoolClient;
}
