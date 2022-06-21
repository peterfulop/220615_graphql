import { IResolvers } from 'apollo-server-fastify';
import { TransactionService } from '../../framework/transaction/transaction-service';
import { runInTransactionFactory } from '../../framework/transaction/run-in-transaction';
import { ApolloContext } from '../../apollo';
import { GetReviewsUseCase } from '../../use-cases/review/get-reviews.use-case';
import { GetReviewUseCase } from '../../use-cases/review/get-review.use-case';
import {
  MutationCreateReviewArgs,
  QueryReviewArgs,
} from '../../types/graphql-generated/graphql';
import { CreateReviewUseCase } from '../../use-cases/review/create-review.use-case';

export const reviewGQLModuleFactory = ({
  transactionService,
  getReviewsUseCase,
  getReviewUseCase,
  createReviewUseCase,
}: {
  transactionService: TransactionService;
  getReviewsUseCase: GetReviewsUseCase;
  getReviewUseCase: GetReviewUseCase;
  createReviewUseCase: CreateReviewUseCase;
}): IResolvers => {
  const transacting = runInTransactionFactory({ transactionService });
  return {
    Query: {
      review: transacting(
        async (_source, args: QueryReviewArgs, context: ApolloContext) =>
          await getReviewUseCase({ args, context })
      ),
      reviews: transacting(
        async (_source, args: QueryReviewArgs, context: ApolloContext) =>
          await getReviewsUseCase({ args, context })
      ),
    },
    Mutation: {
      createReview: transacting(
        async (
          _source,
          args: MutationCreateReviewArgs,
          context: ApolloContext
        ) => await createReviewUseCase({ args, context })
      ),
    },
  };
};
