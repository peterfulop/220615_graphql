import { ApolloContext } from '../../apollo';
import { EEntity } from '../../enum/entity.enum';
import { NotFoundError } from '../../framework/errors/errors';
import { AsyncUseCase } from '../../framework/use-case/use-case';
import { ReviewRepo } from '../../repositories/review/review-repo';
import {
  MutationUpdateReviewArgs,
  Review,
} from '../../types/graphql-generated/graphql';

export type UpdateReviewInput = {
  args: MutationUpdateReviewArgs;
  context: ApolloContext;
};

export type UpdateReviewOutput = Review;

export type UpdateReviewUseCase = AsyncUseCase<
  UpdateReviewInput,
  UpdateReviewOutput
>;

export const updateReviewUseCaseFactory =
  ({ reviewRepo }: { reviewRepo: ReviewRepo }): UpdateReviewUseCase =>
  async (input) => {
    const Review = await reviewRepo.getByID(input.args.id);
    if (!Review) {
      throw new NotFoundError(EEntity.CATEGORY);
    }
    const itemOptions = {
      ...input.args.options,
      date: new Date(input.args.options.date),
      title: input.args.options.title,
      comment: input.args.options.comment,
      rating: input.args.options.rating,
      productId: input.args.options.productId,
    };
    const itemId = input.args.id;
    return (await reviewRepo.updateByID(itemId, itemOptions))[0] as Review;
  };
