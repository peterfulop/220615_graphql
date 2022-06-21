import { ApolloContext } from '../../apollo';
import { v4 as uuidv4 } from 'uuid';
import type {
  Review,
  MutationCreateReviewArgs,
} from '../../types/graphql-generated/graphql';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import { ReviewRepo } from '../../repositories/review/review-repo';

export type CreateReviewInput = {
  args: MutationCreateReviewArgs;
  context: ApolloContext;
};

export type CreateReviewOutput = Review;

export type CreateReviewUseCase = AsyncUseCase<
  CreateReviewInput,
  CreateReviewOutput
>;

export const createReviewUseCaseFactory =
  ({ reviewRepo }: { reviewRepo: ReviewRepo }): CreateReviewUseCase =>
  async (input) => {
    const itemOptions = {
      id: uuidv4(),
      date: new Date(Date.now()),
      title: input.args.options.title,
      comment: input.args.options.comment,
      rating: input.args.options.rating as number,
      productId: input.args.options.productId,
    };
    await reviewRepo.add(itemOptions);
    return { ...itemOptions } as unknown as Review;
  };
