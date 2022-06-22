import { ApolloContext } from '../../apollo';
import { EEntity } from '../../enum/entity.enum';
import { NotFoundError } from '../../framework/errors/errors';
import { AsyncUseCase } from '../../framework/use-case/use-case';
import { ProductRepo } from '../../repositories/product/product-repo';
import {
  MutationUpdateProductArgs,
  Product,
} from '../../types/graphql-generated/graphql';

export type UpdateProductInput = {
  args: MutationUpdateProductArgs;
  context: ApolloContext;
};

export type UpdateProductOutput = Product;

export type UpdateProductUseCase = AsyncUseCase<
  UpdateProductInput,
  UpdateProductOutput
>;

export const updateProductUseCaseFactory =
  ({ productRepo }: { productRepo: ProductRepo }): UpdateProductUseCase =>
  async (input) => {
    const Product = await productRepo.getByID(input.args.id);
    if (!Product) {
      throw new NotFoundError(EEntity.PRODUCT);
    }
    const itemOptions = {
      categoryId: input.args.options.categoryId,
      description: input.args.options.description,
      image: input.args.options.image,
      name: input.args.options.name,
      onSale: input.args.options.onSale,
      price: input.args.options.price,
      quantity: input.args.options.quantity,
    };
    const itemId = input.args.id;
    return (
      await productRepo.updateByID(itemId, itemOptions)
    )[0] as unknown as Product;
  };
