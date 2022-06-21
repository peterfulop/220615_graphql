import { gql } from 'apollo-server-fastify';

export const BASE_TYPE_DEF = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;
