import { ApolloContext } from '../../apollo';
import { AsyncUseCase } from '../../framework/use-case/use-case';
import { CategoryRepo } from '../../repositories/category/category-repo';
import { MutationDeleteCategoryArgs } from '../../types/graphql-generated/graphql';

export type DeleteCategoryInput = {
  args: MutationDeleteCategoryArgs;
  context: ApolloContext;
};
export type DeleteCategoryOutput = Boolean;

export type DeleteCategoryUseCase = AsyncUseCase<
  DeleteCategoryInput,
  DeleteCategoryOutput
>;

export const deleteCategoryUseCaseFactory =
  ({ categoryRepo }: { categoryRepo: CategoryRepo }): DeleteCategoryUseCase =>
  async (input) => {
    return (await categoryRepo.removeByID(input.args.id)).length > 0;
  };
