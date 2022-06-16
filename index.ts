import { ApolloServer, gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

const productTypeDef = gql`
  type Query {
    products: [Product!]!
  }

  type Product {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }
`;

const productGQLModule = {
  Query: {
    products: () => {
      return [
        {
          name: 'Bike',
          description: 'Mountain Bike',
          quantity: 20,
          price: 999.99,
          onSale: true,
        },
      ];
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
