import type { ApolloContext } from '../../apollo';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import type { CategoryRepo } from '../../repositories/category/category-repo';
import {
  Category,
  QueryCategoryArgs,
} from '../../types/graphql-generated/graphql';

export type GetCategoryInput = {
  args: QueryCategoryArgs;
  context: ApolloContext;
};

export type GetCategoryOutput = Category;

export type GetCategoryUseCase = AsyncUseCase<
  GetCategoryInput,
  GetCategoryOutput
>;

export const getCategoryUseCaseFactory =
  ({ categoryRepo }: { categoryRepo: CategoryRepo }): GetCategoryUseCase =>
  async (input) => {
    const item = (await categoryRepo.getByID(input.args.id)) as Category;
    return item;
  };
