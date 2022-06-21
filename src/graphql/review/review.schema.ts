import { gql } from 'apollo-server';

export const reviewTypeDef = gql`
  extend type Query {
    reviews: [Review]
    review(id: ID!): Review
  }

  type Mutation {
    createReview(options: CreateReviewInput!): Review
    deleteReview(id: ID!): Boolean!
    updateReview(id: ID!, options: UpdateReviewInput!): Review
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }

  input CreateReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }

  input UpdateReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }
`;
