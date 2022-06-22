import type { ApolloContext } from '../../apollo';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import { ProductRepo } from '../../repositories/product/product-repo';
import {
  Product,
  QueryProductArgs,
} from '../../types/graphql-generated/graphql';

export type GetProductsInput = {
  source: any;
  args: QueryProductArgs;
  context: ApolloContext;
};

export type GetProductsOutput = Product[];

export type GetProductsUseCase = AsyncUseCase<
  GetProductsInput,
  GetProductsOutput
>;

export const getProductsUseCaseFactory =
  ({ productRepo }: { productRepo: ProductRepo }): GetProductsUseCase =>
  async (input) => {
    console.log(input.source);
    const item = (await productRepo.getAll()) as unknown as Product[];
    return item;
  };
