import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { productGQLModule } from './graphql/product/product.module';
import { productTypeDef } from './graphql/product/product.schema';
import { products, categories, reviews } from './data/data';
import { Product, Category, Review } from './types';

export type ApolloContext = {
  products: Product[];
  categories: Category[];
  reviews: Review[];
};

const schema = makeExecutableSchema({
  typeDefs: [productTypeDef],
  resolvers: [productGQLModule],
});

const server = new ApolloServer({
  schema,
  context: {
    products,
    categories,
    reviews,
  },
});

server.listen().then(({ url }) => console.log(`server is ready at ${url}`));
