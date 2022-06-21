import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { db } from './data/data';
import { ApolloServer } from 'apollo-server-fastify';
import { GetCategoryUseCase } from './use-cases/category/get-category.use-case';
import { GetCategoriesUseCase } from './use-cases/category/get-categories.use-case';
import { categoryGQLModuleFactory } from './graphql/category/category.module';
import { TransactionService } from './framework/transaction/transaction-service';
import { productTypeDef } from './graphql/product.schema';
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
}: {
  transactionService: TransactionService;
  getCategoryUseCase: GetCategoryUseCase;
  getCategoriesUseCase: GetCategoriesUseCase;
}): ApolloInstance => {
  const categoryGQLModule = categoryGQLModuleFactory({
    transactionService,
    getCategoryUseCase,
    getCategoriesUseCase,
  });

  const schema = makeExecutableSchema({
    typeDefs: [productTypeDef],
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
