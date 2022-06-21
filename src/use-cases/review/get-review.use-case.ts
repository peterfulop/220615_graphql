import type { ApolloContext } from '../../apollo';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import { ReviewRepo } from '../../repositories/review/review-repo';
import { QueryReviewArgs, Review } from '../../types/graphql-generated/graphql';

export type GetReviewInput = {
  args: QueryReviewArgs;
  context: ApolloContext;
};

export type GetReviewOutput = Review;

export type GetReviewUseCase = AsyncUseCase<GetReviewInput, GetReviewOutput>;

export const getReviewUseCaseFactory =
  ({ reviewRepo }: { reviewRepo: ReviewRepo }): GetReviewUseCase =>
  async (input) => {
    const item = (await reviewRepo.getByID(input.args.id)) as Review;
    return item;
  };
