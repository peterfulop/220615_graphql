import { ApolloContext } from '../../apollo';
import { AsyncUseCase } from '../../framework/use-case/use-case';
import { ProductRepo } from '../../repositories/product/product-repo';
import { MutationDeleteProductArgs } from '../../types/graphql-generated/graphql';

export type DeleteProductInput = {
  args: MutationDeleteProductArgs;
  context: ApolloContext;
};
export type DeleteProductOutput = Boolean;

export type DeleteProductUseCase = AsyncUseCase<
  DeleteProductInput,
  DeleteProductOutput
>;

export const deleteProductUseCaseFactory =
  ({ productRepo }: { productRepo: ProductRepo }): DeleteProductUseCase =>
  async (input) => {
    return (await productRepo.removeByID(input.args.id)).length > 0;
  };
