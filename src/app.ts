import { FastifyInstance } from 'fastify';
import { ApolloInstance, createAPolloServer } from './apollo';
import { createFastifyApp } from './framework/fastify/fastify-app';

export interface FastifyInstanceWithApolloServer extends FastifyInstance {
  apollo: ApolloInstance;
}

export const createApp = async (): Promise<FastifyInstanceWithApolloServer> => {
  const apolloServer = createAPolloServer();

  const fastifyApp = createFastifyApp({
    apolloInstance: apolloServer,
  });

  return fastifyApp;
};
