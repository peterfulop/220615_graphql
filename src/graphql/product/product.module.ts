import { IResolvers } from 'apollo-server-fastify';
import { TransactionService } from '../../framework/transaction/transaction-service';
import { runInTransactionFactory } from '../../framework/transaction/run-in-transaction';
import { ApolloContext } from '../../apollo';
import {
  MutationCreateProductArgs,
  MutationDeleteProductArgs,
  MutationUpdateProductArgs,
  QueryProductArgs,
} from '../../types/graphql-generated/graphql';
import { CreateProductUseCase } from '../../use-cases/product/create-product.use-case';
import { DeleteProductUseCase } from '../../use-cases/product/delete-product.use.case';
import { GetProductUseCase } from '../../use-cases/product/get-product.use-case';
import { GetProductsUseCase } from '../../use-cases/product/get-products.use-case';
import { UpdateProductUseCase } from '../../use-cases/product/update-product.use-case';

export const productGQLModuleFactory = ({
  transactionService,
  getProductsUseCase,
  getProductUseCase,
  createProductUseCase,
  updapteProductUseCase,
  deleteProductUseCase,
}: {
  transactionService: TransactionService;
  getProductsUseCase: GetProductsUseCase;
  getProductUseCase: GetProductUseCase;
  createProductUseCase: CreateProductUseCase;
  updapteProductUseCase: UpdateProductUseCase;
  deleteProductUseCase: DeleteProductUseCase;
}): IResolvers => {
  const transacting = runInTransactionFactory({ transactionService });
  return {
    Query: {
      product: transacting(
        async (_source, args: QueryProductArgs, context: ApolloContext) =>
          await getProductUseCase({ args, context })
      ),
      products: transacting(
        async (args: QueryProductArgs, context: ApolloContext) =>
          await getProductsUseCase({ args, context })
      ),
    },
    Mutation: {
      createProduct: transacting(
        async (
          _source,
          args: MutationCreateProductArgs,
          context: ApolloContext
        ) => await createProductUseCase({ args, context })
      ),
      updateProduct: transacting(
        async (
          _source,
          args: MutationUpdateProductArgs,
          context: ApolloContext
        ) => await updapteProductUseCase({ args, context })
      ),
      deleteProduct: transacting(
        async (
          _source,
          args: MutationDeleteProductArgs,
          context: ApolloContext
        ) => await deleteProductUseCase({ args, context })
      ),
    },
  };
};
