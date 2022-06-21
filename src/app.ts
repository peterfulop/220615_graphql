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
export interface FastifyInstanceWithApolloServer extends FastifyInstance {
  apollo: ApolloInstance;
}

export const createApp = async (): Promise<FastifyInstanceWithApolloServer> => {
  const pool = poolFactory(config.databaseUrl);
  const transactionService = sqlTransactionServiceFactory({ pool });
  const runFragment = createRunFragment(transactionService);

  const categoryRepo = categoryRepoFactory(runFragment);
  const reviewRepo = reviewRepoFactory(runFragment);

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

  const getReviewsUseCase = getReviewsUseCaseFactory({
    reviewRepo,
  });
  const getReviewUseCase = getReviewUseCaseFactory({
    reviewRepo,
  });
  const createReviewUseCase = createReviewUseCaseFactory({
    reviewRepo,
  });

  const apolloServer = createApolloServer({
    transactionService,
    getCategoryUseCase,
    getCategoriesUseCase,
    createCategoryUseCase,
    deleteCategoryUseCase,
    updateCategoryUseCase,
    getReviewsUseCase,
    getReviewUseCase,
    createReviewUseCase,
  });

  const fastifyApp = createFastifyApp({
    apolloInstance: apolloServer,
  });

  return fastifyApp;
};
