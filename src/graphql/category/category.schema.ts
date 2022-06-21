import { gql } from 'apollo-server';

export const categoryTypeDef = gql`
  extend type Query {
    categories: [Category]
    category(id: ID!): Category
  }

  type Mutation {
    createCategory(options: CreateCategoryInput!): Category
    deleteCategory(id: ID!): Boolean
    updateCategory(id: ID!, options: UpdateCategoryInput!): Category
  }

  type Category {
    id: ID!
    name: String!
  }

  input CreateCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String!
  }
`;
