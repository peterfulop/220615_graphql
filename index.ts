import { ApolloServer, gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { products } from './data/data';
import { ApolloContext, QueryProductArgs } from './types';

const productTypeDef = gql`
  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Product {
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
  }
`;

const productGQLModule = {
  Query: {
    products: () => {
      return products;
    },
    product: (
      _parent: any,
      args: QueryProductArgs,
      _context: ApolloContext
    ) => {
      const productId = args.id;
      const product = products.find((product) => {
        return product.id === productId;
      });
      if (!product) return null;
      return product;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs: [productTypeDef],
  resolvers: [productGQLModule],
});

const server = new ApolloServer({
  schema,
});

server.listen().then(({ url }) => console.log(`server is ready at ${url}`));
