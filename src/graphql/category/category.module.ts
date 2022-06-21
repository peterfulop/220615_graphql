import { IResolvers } from 'apollo-server-fastify';
import { TransactionService } from '../../framework/transaction/transaction-service';
import { GetCategoryUseCase } from '../../use-cases/category/get-category.use-case';
import { runInTransactionFactory } from '../../framework/transaction/run-in-transaction';
import { QueryCategoryArgs } from '../../types/graphql-generated/graphql';
import { ApolloContext } from '../../apollo';
import { GetCategoriesUseCase } from '../../use-cases/category/get-categories.use-case';

export const categoryGQLModuleFactory = ({
  transactionService,
  getCategoryUseCase,
  getCategoriesUseCase,
}: {
  transactionService: TransactionService;
  getCategoryUseCase: GetCategoryUseCase;
  getCategoriesUseCase: GetCategoriesUseCase;
}): IResolvers => {
  const transacting = runInTransactionFactory({ transactionService });
  return {
    Query: {
      category: transacting(
        async (_source, args: QueryCategoryArgs, context: ApolloContext) =>
          await getCategoryUseCase({ args, context })
      ),
      categories: transacting(
        async (_source, args: QueryCategoryArgs, context: ApolloContext) =>
          await getCategoriesUseCase({ args, context })
      ),
    },
  };
};
