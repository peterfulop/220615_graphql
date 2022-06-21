import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { db } from './data/data';
import { ApolloServer } from 'apollo-server-fastify';
import { GetCategoryUseCase } from './use-cases/category/get-category.use-case';
import { GetCategoriesUseCase } from './use-cases/category/get-categories.use-case';
import { categoryGQLModuleFactory } from './graphql/category/category.module';
import { TransactionService } from './framework/transaction/transaction-service';
import { CreateCategoryUseCase } from './use-cases/category/create-category.use-case';
import { BASE_TYPE_DEF } from './framework/graphql/base.schema';
import { categoryTypeDef } from './graphql/category/category.schema';
import { DeleteCategoryUseCase } from './use-cases/category/delete-category.use.case';
export interface ApolloInstance {
  server: ApolloServer;
  schema: GraphQLSchema;
}

export type ApolloContext = {
  db: any;
};

export const createApolloServer = ({
  transactionService,
  getCategoryUseCase,
  getCategoriesUseCase,
  createCategoryUseCase,
  deleteCategoryUseCase,
}: {
  transactionService: TransactionService;
  getCategoryUseCase: GetCategoryUseCase;
  getCategoriesUseCase: GetCategoriesUseCase;
  createCategoryUseCase: CreateCategoryUseCase;
  deleteCategoryUseCase: DeleteCategoryUseCase;
}): ApolloInstance => {
  const categoryGQLModule = categoryGQLModuleFactory({
    transactionService,
    getCategoryUseCase,
    getCategoriesUseCase,
    createCategoryUseCase,
    deleteCategoryUseCase,
  });

  const schema = makeExecutableSchema({
    typeDefs: [BASE_TYPE_DEF, categoryTypeDef],
    resolvers: [categoryGQLModule],
  });

  return {
    server: new ApolloServer({
      context: async (): Promise<ApolloContext> => {
        return db as any;
      },
      schema,
    }),
    schema,
  };
};
