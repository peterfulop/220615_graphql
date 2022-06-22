import type { ApolloContext } from '../../apollo';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import type { ReviewRepo } from '../../repositories/review/review-repo';
import { Review, QueryReviewArgs } from '../../types/graphql-generated/graphql';

export type GetReviewsInput = {
  args: QueryReviewArgs;
  context: ApolloContext;
};

export type GetReviewOutput = Review[];

export type GetReviewsUseCase = AsyncUseCase<GetReviewsInput, GetReviewOutput>;

export const getReviewsUseCaseFactory =
  ({ reviewRepo }: { reviewRepo: ReviewRepo }): GetReviewsUseCase =>
  async () => {
    const item = (await reviewRepo.getAll()) as Review[];
    return item;
  };
