import fastify, { FastifyInstance } from 'fastify';
import { ApolloInstance } from '../../apollo';
import { addFastifyLoggerHooks } from './fastify-logger';

type FastifyAppFactoryArgs = {
  apolloInstance: ApolloInstance;
};
export interface FastifyInstanceWithApolloServer extends FastifyInstance {
  apollo: ApolloInstance;
}

export const createFastifyApp = ({
  apolloInstance,
}: FastifyAppFactoryArgs): FastifyInstanceWithApolloServer => {
  const app = fastify();
  addFastifyLoggerHooks(app);
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.register(apolloInstance.server.createHandler({ path: '/api/graphql' }));

  return { ...app, apollo: apolloInstance };
};
