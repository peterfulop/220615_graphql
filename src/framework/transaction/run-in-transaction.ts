/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { runInContext } from '../cls-hooked/run-in-context';
import type { TransactionService } from './transaction-service';

export const runInTransactionFactory =
  ({ transactionService }: { transactionService: TransactionService }) =>
  <TFunc extends (...args: any[]) => Promise<any>>(fn: TFunc): TFunc => {
    const handler = async (...args: any[]): Promise<any> =>
      runInContext(async () => {
        const transaction = await transactionService.begin();
        try {
          const result = await fn(...args);
          await transaction.commit();
          return result;
        } catch (error) {
          await transaction.rollback();
          throw error;
        }
      });
    return handler as never;
  };
