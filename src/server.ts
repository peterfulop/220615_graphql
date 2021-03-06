import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import fastify from 'fastify';
import { db } from './data/data';
import { productGQLModule } from './graphql/product.module';
import { productTypeDef } from './graphql/product.schema';

const app = fastify();
const server = new ApolloServer({
  typeDefs: [productTypeDef],
  resolvers: [productGQLModule],
  context: {
    db,
  },
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: app.server })],
});

server
  .listen()
  .then(() =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
