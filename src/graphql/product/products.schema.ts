import { gql } from 'apollo-server';

export const productTypeDef = gql`
  extend type Query {
    products: [Category]
    product(id: ID!): Category
  }

  type Mutation {
    createProduct(options: CreateProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
    updateProduct(id: ID!, options: UpdateProductInput!): Product
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
    category: Category
    reviews: [Review!]!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input CreateProductInput {
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
    categoryId: String!
  }

  input UpdateProductInput {
    name: String!
    description: String!
    quantity: Int!
    image: String!
    price: Float!
    onSale: Boolean!
    categoryId: String!
  }
`;
