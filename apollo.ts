import { ApolloServer, gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { productGQLModule } from './graphql/product/product.module';
import { productTypeDef } from './graphql/product/product.schema';

const schema = makeExecutableSchema({
  typeDefs: [productTypeDef],
  resolvers: [productGQLModule],
});

const server = new ApolloServer({
  schema,
});

server.listen().then(({ url }) => console.log(`server is ready at ${url}`));
