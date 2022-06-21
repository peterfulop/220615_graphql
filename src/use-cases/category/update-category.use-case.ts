import { ApolloContext } from '../../apollo';
import { EEntity } from '../../enum/entity.enum';
import { DuplicationError, NotFoundError } from '../../framework/errors/errors';
import { AsyncUseCase } from '../../framework/use-case/use-case';
import { CategoryRepo } from '../../repositories/category/category-repo';
import {
  MutationUpdateCategoryArgs,
  Category,
} from '../../types/graphql-generated/graphql';

export type UpdateCategoryInput = {
  args: MutationUpdateCategoryArgs;
  context: ApolloContext;
};

export type UpdateCategoryOutput = Category;

export type UpdateCategoryUseCase = AsyncUseCase<
  UpdateCategoryInput,
  UpdateCategoryOutput
>;

export const updateCategoryUseCaseFactory =
  ({ categoryRepo }: { categoryRepo: CategoryRepo }): UpdateCategoryUseCase =>
  async (input) => {
    const category = await categoryRepo.getByID(input.args.id);
    if (!category) {
      throw new NotFoundError(EEntity.CATEGORY);
    }

    const existsCategory = await categoryRepo.getCategoryByName(
      input.args.options.name
    );

    if (existsCategory) {
      throw new DuplicationError(EEntity.CATEGORY, {
        key: input.args.options.name,
        value: input.args.options.name,
      });
    }

    const itemOptions = {
      ...input.args.options,
      name: input.args.options.name,
    };
    const itemId = input.args.id;
    return (await categoryRepo.updateByID(itemId, itemOptions))[0] as Category;
  };
