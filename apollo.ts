import { ApolloServer } from 'apollo-server';
import { productGQLModule } from './graphql/product/product.module';
import { productTypeDef } from './graphql/product/product.schema';
import { db } from './data/data';

const server = new ApolloServer({
  typeDefs: [productTypeDef],
  resolvers: [productGQLModule],
  context: {
    db,
  },
});

server.listen().then(({ url }) => console.log(`server is ready at ${url}`));
