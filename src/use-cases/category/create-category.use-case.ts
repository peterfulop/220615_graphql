import { ApolloContext } from '../../apollo';
import { v4 as uuidv4 } from 'uuid';

import type {
  Category,
  MutationAddCategoryArgs,
} from '../../types/graphql-generated/graphql';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import type { CategoryRepo } from '../../repositories/category/category-repo';

export type CreateCategoryInput = {
  args: MutationAddCategoryArgs;
  context: ApolloContext;
};

export type CreateCategoryOutput = Category;

export type CreateCategoryUseCase = AsyncUseCase<
  CreateCategoryInput,
  CreateCategoryOutput
>;

export const createItemUseCaseFactory =
  ({ categoryRepo }: { categoryRepo: CategoryRepo }): CreateCategoryUseCase =>
  async (input) => {
    const itemOptions = {
      id: uuidv4(),
      name: input.args.input.name,
    };
    await categoryRepo.add(itemOptions);
    return { ...input.args } as unknown as Category;
  };
