import { IResolvers } from 'apollo-server-fastify';
import { TransactionService } from '../../framework/transaction/transaction-service';
import { GetCategoryUseCase } from '../../use-cases/category/get-category.use-case';
import { runInTransactionFactory } from '../../framework/transaction/run-in-transaction';
import {
  MutationAddCategoryArgs,
  QueryCategoryArgs,
} from '../../types/graphql-generated/graphql';
import { ApolloContext } from '../../apollo';
import { GetCategoriesUseCase } from '../../use-cases/category/get-categories.use-case';
import { CreateCategoryUseCase } from '../../use-cases/category/create-category.use-case';

export const categoryGQLModuleFactory = ({
  transactionService,
  getCategoryUseCase,
  getCategoriesUseCase,
  createCategoryUseCase,
}: {
  transactionService: TransactionService;
  getCategoryUseCase: GetCategoryUseCase;
  getCategoriesUseCase: GetCategoriesUseCase;
  createCategoryUseCase: CreateCategoryUseCase;
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
    Mutation: {
      createCategory: transacting(
        async (
          _source,
          args: MutationAddCategoryArgs,
          context: ApolloContext
        ) => await createCategoryUseCase({ args, context })
      ),
    },
  };
};
