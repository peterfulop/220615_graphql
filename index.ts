import { ApolloServer, gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import { products, categories } from './data/data';
import {
  ApolloContext,
  QueryCategoryArgs,
  QueryCategoryParents,
  QueryProductArgs,
  UnusedQueryParent,
} from './types';

const productTypeDef = gql`
  type Query {
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;

const productGQLModule = {
  Query: {
    products: (
      _parent: UnusedQueryParent,
      _args: QueryProductArgs,
      _context: ApolloContext
    ) => {
      return products;
    },
    product: (
      _parent: UnusedQueryParent,
      args: QueryProductArgs,
      _context: ApolloContext
    ) => {
      const { id } = args;
      return products.find((product) => {
        return product.id === id;
      });
    },
    categories: (
      _parent: QueryCategoryParents,
      _args: QueryCategoryArgs,
      _context: ApolloContext
    ) => {
      return categories;
    },
    category: (
      _parent: UnusedQueryParent,
      args: QueryCategoryArgs,
      _context: ApolloContext
    ) => {
      const { id } = args;
      return categories.find((category) => {
        return category.id === id;
      });
    },
  },
  Category: {
    products: (
      parent: QueryCategoryParents,
      _args: QueryCategoryArgs,
      _context: ApolloContext
    ) => {
      const { id } = parent;
      return products.filter((product) => {
        return product.categoryId === id;
      });
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
