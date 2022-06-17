import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { productGQLModule } from './graphql/product/product.module';
import { productTypeDef } from './graphql/product/product.schema';
import { db } from './data/data';

const schema = makeExecutableSchema({
  typeDefs: [productTypeDef],
  resolvers: [productGQLModule],
});

const server = new ApolloServer({
  schema,
  context: {
    db,
  },
});

server.listen().then(({ url }) => console.log(`server is ready at ${url}`));
