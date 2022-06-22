import type { ApolloContext } from '../../apollo';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import type { ReviewRepo } from '../../repositories/review/review-repo';
import { Review, QueryReviewArgs } from '../../types/graphql-generated/graphql';

export type GetReviewsByProductInput = {
  args: QueryReviewArgs;
  context: ApolloContext;
};

export type GetReviewsByProductOutput = Review[];

export type GetReviewsByProductUseCase = AsyncUseCase<
  GetReviewsByProductInput,
  GetReviewsByProductOutput
>;

export const getReviewsByProductUseCaseFactory =
  ({ reviewRepo }: { reviewRepo: ReviewRepo }): GetReviewsByProductUseCase =>
  async (item) => {
    const { count, items } = await reviewRepo.getReviewsByProduct(item.args.id);
    const mappedResult = {
      count: count,
      items,
    } as unknown as Review[];
    return mappedResult;
  };
