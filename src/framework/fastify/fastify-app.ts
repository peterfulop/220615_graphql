import fastify from 'fastify';
import { ApolloInstance } from '../../apollo';
import { FastifyInstanceWithApolloServer } from '../../app';

type FastifyAppFactoryArgs = {
  apolloInstance: ApolloInstance;
};

export const createFastifyApp = ({
  apolloInstance,
}: FastifyAppFactoryArgs): FastifyInstanceWithApolloServer => {
  const app = fastify({ logger: true });
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.register(apolloInstance.server.createHandler({ path: '/api/graphql' }));

  return { ...app, apollo: apolloInstance };
};
