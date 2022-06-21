import type { QueryResult } from 'pg';
import type { SQLFragment } from 'zapatos/db';
import type { TransactionService } from '../transaction/transaction-service';

export type RunFragment = <
  TRunResult = QueryResult['rows'],
  TConstraint = never
>(
  sqlFragment: SQLFragment<TRunResult, TConstraint>
) => Promise<TRunResult>;

export const createRunFragment =
  (sqlTransactionService: TransactionService): RunFragment =>
  async (sqlFragment) =>
    sqlFragment.run(sqlTransactionService.poolClient);
