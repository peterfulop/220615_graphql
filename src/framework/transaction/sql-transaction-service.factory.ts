import { Pool } from 'pg';
import { sqlTransactionServiceFactory } from './sql-transaction-service';
import type { TransactionService } from './transaction-service';

export const createSQLTransactionServiceForTest = (): TransactionService =>
  sqlTransactionServiceFactory({ pool: new Pool() });
