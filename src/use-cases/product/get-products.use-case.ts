import type { ApolloContext } from '../../apollo';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import { ProductRepo } from '../../repositories/product/product-repo';
import {
  Product,
  QueryProductArgs,
} from '../../types/graphql-generated/graphql';

export type GetProductsInput = {
  args: QueryProductArgs;
  context: ApolloContext;
};

export type GetProductOutput = Product[];

export type GetProductsUseCase = AsyncUseCase<
  GetProductsInput,
  GetProductOutput
>;

export const getProductsUseCaseFactory =
  ({ productRepo }: { productRepo: ProductRepo }): GetProductsUseCase =>
  async () => {
    const item = (await productRepo.getAll()) as unknown as Product[];
    return item;
  };
