import type { ApolloContext } from '../../apollo';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import type { CategoryRepo } from '../../repositories/category/category-repo';
import {
  Category,
  QueryCategoryArgs,
} from '../../types/graphql-generated/graphql';

export type GetCategoriesInput = {
  args: QueryCategoryArgs;
  context: ApolloContext;
};

export type GetCategoryOutput = Category[];

export type GetCategoriesUseCase = AsyncUseCase<
  GetCategoriesInput,
  GetCategoryOutput
>;

export const getCategoriesUseCaseFactory =
  ({ categoryRepo }: { categoryRepo: CategoryRepo }): GetCategoriesUseCase =>
  async () => {
    const item = (await categoryRepo.getAll()) as Category[];
    return item;
  };
