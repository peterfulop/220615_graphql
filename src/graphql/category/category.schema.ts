import { gql } from 'apollo-server';

export const categoryTypeDef = gql`
  extends type Query {
    categories: [Category!]
    category(id: ID!): Category
  }

  type Mutation {
    createCategory(options: AddCategoryInput!): Category
    deleteCategory(id: ID!): Boolean
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category
  }

  type Category {
    id: ID!
    name: String!
  }

  input AddCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String!
  }
`;
