import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { db } from './data/data';
import { ApolloServer } from 'apollo-server-fastify';
import { DB } from './types/types';
import { productTypeDef } from './graphql/product.schema';
import { productGQLModule } from './graphql/product.module';
export interface ApolloInstance {
  server: ApolloServer;
  schema: GraphQLSchema;
}

export type ApolloContext = {
  db: DB;
};

export const createAPolloServer = (): ApolloInstance => {
  const schema = makeExecutableSchema({
    typeDefs: [productTypeDef],
    resolvers: [productGQLModule],
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
