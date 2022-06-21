import { FastifyInstance } from 'fastify';
import { ApolloInstance, createAPolloServer } from './apollo';
import { config } from './config';
import { createFastifyApp } from './framework/fastify/fastify-app';
import { poolFactory } from './framework/sql/pool.factory';
import { createRunFragment } from './framework/database/create-run-fragment';
import { sqlTransactionServiceFactory } from './framework/transaction/sql-transaction-service';
export interface FastifyInstanceWithApolloServer extends FastifyInstance {
  apollo: ApolloInstance;
}

export const createApp = async (): Promise<FastifyInstanceWithApolloServer> => {
  const pool = poolFactory(config.databaseUrl);
  const transactionService = sqlTransactionServiceFactory({ pool });
  const runFragment = createRunFragment(transactionService);

  const apolloServer = createAPolloServer();

  const fastifyApp = createFastifyApp({
    apolloInstance: apolloServer,
  });

  return fastifyApp;
};
