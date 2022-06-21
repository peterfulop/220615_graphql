import { runInContext } from '../cls-hooked/run-in-context';
import type { AsyncUseCase } from '../use-case/use-case';
import type { TransactionService } from './transaction-service';

export const transactedUseCaseFactory =
  <TInput, TOutput>({
    useCase,
    transactionService,
  }: {
    useCase: AsyncUseCase<TInput, TOutput>;
    transactionService: TransactionService;
  }): AsyncUseCase<TInput, TOutput> =>
  async (input: TInput): ReturnType<typeof useCase> =>
    runInContext(async () => {
      const transaction = await transactionService.begin();
      try {
        const output = await useCase(input);
        await transaction.commit();
        return output;
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    });
