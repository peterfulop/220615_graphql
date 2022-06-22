import type { ApolloContext } from '../../apollo';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import { ProductRepo } from '../../repositories/product/product-repo';
import {
  Product,
  QueryProductArgs,
} from '../../types/graphql-generated/graphql';

export type GetProductInput = {
  args: QueryProductArgs;
  context: ApolloContext;
};

export type GetProductOutput = Product;

export type GetProductUseCase = AsyncUseCase<GetProductInput, GetProductOutput>;

export const getProductUseCaseFactory =
  ({ productRepo }: { productRepo: ProductRepo }): GetProductUseCase =>
  async (input) => {
    const item = (await productRepo.getByID(
      input.args.id
    )) as unknown as Product;
    return item;
  };
