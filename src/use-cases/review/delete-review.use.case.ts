import { ApolloContext } from '../../apollo';
import { AsyncUseCase } from '../../framework/use-case/use-case';
import { ReviewRepo } from '../../repositories/review/review-repo';
import { MutationDeleteReviewArgs } from '../../types/graphql-generated/graphql';

export type DeleteReviewInput = {
  args: MutationDeleteReviewArgs;
  context: ApolloContext;
};
export type DeleteReviewOutput = Boolean;

export type DeleteReviewUseCase = AsyncUseCase<
  DeleteReviewInput,
  DeleteReviewOutput
>;

export const deleteReviewUseCaseFactory =
  ({ reviewRepo }: { reviewRepo: ReviewRepo }): DeleteReviewUseCase =>
  async (input) => {
    return (await reviewRepo.removeByID(input.args.id)).length > 0;
  };
