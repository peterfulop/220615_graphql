import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { db } from './data/data';
import { ApolloServer } from 'apollo-server-fastify';
import { GetCategoryUseCase } from './use-cases/category/get-category.use-case';
import { GetCategoriesUseCase } from './use-cases/category/get-categories.use-case';
import { categoryGQLModuleFactory } from './graphql/category/category.module';
import { TransactionService } from './framework/transaction/transaction-service';
import { CreateCategoryUseCase } from './use-cases/category/create-category.use-case';
import { BASE_TYPE_DEF } from './framework/graphql/base.schema';
import { categoryTypeDef } from './graphql/category/category.schema';
import { DeleteCategoryUseCase } from './use-cases/category/delete-category.use.case';
import { UpdateCategoryUseCase } from './use-cases/category/update-category.use-case';
import { reviewTypeDef } from './graphql/review/review.schema';
import { productTypeDef } from './graphql/product/products.schema';
import { reviewGQLModuleFactory } from './graphql/review/review.module';
import { CreateReviewUseCase } from './use-cases/review/create-review.use-case';
import { GetReviewsUseCase } from './use-cases/review/get-reviews.use-case';
import { GetReviewUseCase } from './use-cases/review/get-review.use-case';
import { DeleteReviewUseCase } from './use-cases/review/delete-review.use.case';
import { UpdateReviewUseCase } from './use-cases/review/update-review.use-case';
import { CreateProductUseCase } from './use-cases/product/create-product.use-case';
import { DeleteProductUseCase } from './use-cases/product/delete-product.use.case';
import { GetProductUseCase } from './use-cases/product/get-product.use-case';
import { GetProductsUseCase } from './use-cases/product/get-products.use-case';
import { UpdateProductUseCase } from './use-cases/product/update-product.use-case';
import { productGQLModuleFactory } from './graphql/product/product.module';
export interface ApolloInstance {
  server: ApolloServer;
  schema: GraphQLSchema;
}

export type ApolloContext = {
  db: any;
};

export const createApolloServer = ({
  transactionService,
  getCategoryUseCase,
  getCategoriesUseCase,
  createCategoryUseCase,
  deleteCategoryUseCase,
  updateCategoryUseCase,
  getProductsUseCase,
  getProductUseCase,
  createProductUseCase,
  deleteProductUseCase,
  updapteProductUseCase,
  getReviewsUseCase,
  getReviewUseCase,
  createReviewUseCase,
  deleteReviewUseCase,
  updapteReviewUseCase,
}: {
  transactionService: TransactionService;
  getCategoryUseCase: GetCategoryUseCase;
  getCategoriesUseCase: GetCategoriesUseCase;
  createCategoryUseCase: CreateCategoryUseCase;
  deleteCategoryUseCase: DeleteCategoryUseCase;
  updateCategoryUseCase: UpdateCategoryUseCase;
  getProductsUseCase: GetProductsUseCase;
  getProductUseCase: GetProductUseCase;
  createProductUseCase: CreateProductUseCase;
  updapteProductUseCase: UpdateProductUseCase;
  deleteProductUseCase: DeleteProductUseCase;
  getReviewsUseCase: GetReviewsUseCase;
  getReviewUseCase: GetReviewUseCase;
  createReviewUseCase: CreateReviewUseCase;
  deleteReviewUseCase: DeleteReviewUseCase;
  updapteReviewUseCase: UpdateReviewUseCase;
}): ApolloInstance => {
  const categoryGQLModule = categoryGQLModuleFactory({
    transactionService,
    getCategoryUseCase,
    getCategoriesUseCase,
    createCategoryUseCase,
    deleteCategoryUseCase,
    updateCategoryUseCase,
  });

  const productGQLModule = productGQLModuleFactory({
    transactionService,
    getProductsUseCase,
    getProductUseCase,
    createProductUseCase,
    updapteProductUseCase,
    deleteProductUseCase,
  });

  const reviewGQLModule = reviewGQLModuleFactory({
    transactionService,
    getReviewsUseCase,
    getReviewUseCase,
    createReviewUseCase,
    updapteReviewUseCase,
    deleteReviewUseCase,
  });

  const schema = makeExecutableSchema({
    typeDefs: [BASE_TYPE_DEF, categoryTypeDef, reviewTypeDef, productTypeDef],
    resolvers: [categoryGQLModule, productGQLModule, reviewGQLModule],
  });

  return {
    server: new ApolloServer({
      context: async (): Promise<ApolloContext> => {
        return db as any;
      },
      schema,
    }),
    schema,
  };
};
