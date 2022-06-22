import { FastifyInstance } from 'fastify';
import { ApolloInstance, createApolloServer } from './apollo';
import { config } from './config';
import { createFastifyApp } from './framework/fastify/fastify-app';
import { poolFactory } from './framework/sql/pool.factory';
import { createRunFragment } from './framework/database/create-run-fragment';
import { sqlTransactionServiceFactory } from './framework/transaction/sql-transaction-service';
import { categoryRepoFactory } from './repositories/category/category-repo';
import { getCategoryUseCaseFactory } from './use-cases/category/get-category.use-case';
import { getCategoriesUseCaseFactory } from './use-cases/category/get-categories.use-case';
import { createCategoryUseCaseFactory } from './use-cases/category/create-category.use-case';
import { deleteCategoryUseCaseFactory } from './use-cases/category/delete-category.use.case';
import { updateCategoryUseCaseFactory } from './use-cases/category/update-category.use-case';
import { getReviewsUseCaseFactory } from './use-cases/review/get-reviews.use-case';
import { reviewRepoFactory } from './repositories/review/review-repo';
import { createReviewUseCaseFactory } from './use-cases/review/create-review.use-case';
import { getReviewUseCaseFactory } from './use-cases/review/get-review.use-case';
import { deleteReviewUseCaseFactory } from './use-cases/review/delete-review.use.case';
import { updateReviewUseCaseFactory } from './use-cases/review/update-review.use-case';
import { createProductUseCaseFactory } from './use-cases/product/create-product.use-case';
import { deleteProductUseCaseFactory } from './use-cases/product/delete-product.use.case';
import { getProductUseCaseFactory } from './use-cases/product/get-product.use-case';
import { getProductsUseCaseFactory } from './use-cases/product/get-products.use-case';
import { updateProductUseCaseFactory } from './use-cases/product/update-product.use-case';
import { productRepoFactory } from './repositories/product/product-repo';
import { getReviewsByProductUseCaseFactory } from './use-cases/review/get-reviews-by-product.use-case';
export interface FastifyInstanceWithApolloServer extends FastifyInstance {
  apollo: ApolloInstance;
}

export const createApp = async (): Promise<FastifyInstanceWithApolloServer> => {
  const pool = poolFactory(config.databaseUrl);
  const transactionService = sqlTransactionServiceFactory({ pool });
  const runFragment = createRunFragment(transactionService);

  const categoryRepo = categoryRepoFactory(runFragment);
  const reviewRepo = reviewRepoFactory(runFragment);
  const productRepo = productRepoFactory(runFragment);

  const getCategoriesUseCase = getCategoriesUseCaseFactory({
    categoryRepo,
  });
  const getCategoryUseCase = getCategoryUseCaseFactory({
    categoryRepo,
  });
  const createCategoryUseCase = createCategoryUseCaseFactory({
    categoryRepo,
  });
  const deleteCategoryUseCase = deleteCategoryUseCaseFactory({
    categoryRepo,
  });
  const updateCategoryUseCase = updateCategoryUseCaseFactory({
    categoryRepo,
  });

  const getProductsUseCase = getProductsUseCaseFactory({
    productRepo,
  });
  const getProductUseCase = getProductUseCaseFactory({
    productRepo,
  });
  const createProductUseCase = createProductUseCaseFactory({
    productRepo,
  });
  const deleteProductUseCase = deleteProductUseCaseFactory({
    productRepo,
  });
  const updapteProductUseCase = updateProductUseCaseFactory({
    productRepo,
  });

  const getReviewsUseCase = getReviewsUseCaseFactory({
    reviewRepo,
  });
  const getReviewUseCase = getReviewUseCaseFactory({
    reviewRepo,
  });
  const createReviewUseCase = createReviewUseCaseFactory({
    reviewRepo,
  });
  const deleteReviewUseCase = deleteReviewUseCaseFactory({
    reviewRepo,
  });
  const updapteReviewUseCase = updateReviewUseCaseFactory({
    reviewRepo,
  });
  const getReviewsByProductUseCase = getReviewsByProductUseCaseFactory({
    reviewRepo,
  });

  const apolloServer = createApolloServer({
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
    getReviewsByProductUseCase,
  });

  const fastifyApp = createFastifyApp({
    apolloInstance: apolloServer,
  });

  return fastifyApp;
};
