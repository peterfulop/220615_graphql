import { ApolloContext } from '../../apollo';
import { v4 as uuidv4 } from 'uuid';
import type {
  MutationCreateProductArgs,
  Product,
} from '../../types/graphql-generated/graphql';
import type { AsyncUseCase } from '../../framework/use-case/use-case';
import { ProductRepo } from '../../repositories/product/product-repo';

export type CreateProductInput = {
  args: MutationCreateProductArgs;
  context: ApolloContext;
};

export type CreateProductOutput = Product;

export type CreateProductUseCase = AsyncUseCase<
  CreateProductInput,
  CreateProductOutput
>;

export const createProductUseCaseFactory =
  ({ productRepo }: { productRepo: ProductRepo }): CreateProductUseCase =>
  async (input) => {
    const itemOptions = {
      id: uuidv4(),
      categoryId: input.args.options.categoryId,
      description: input.args.options.description,
      image: input.args.options.image,
      name: input.args.options.name,
      onSale: input.args.options.onSale,
      price: input.args.options.price,
      quantity: input.args.options.quantity,
    };
    await productRepo.add(itemOptions);
    return { ...itemOptions } as unknown as Product;
  };
