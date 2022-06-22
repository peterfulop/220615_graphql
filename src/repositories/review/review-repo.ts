import { selectOne } from 'zapatos/db';
import { zapatosBaseRepoFactory, ZapatosRepo } from '../base-repo';
import type { RunFragment } from '../../framework/database/create-run-fragment';
import type { JSONSelectableForTable, WhereableForTable } from 'zapatos/schema';
import {
  getReviewsByProductQuery,
  ReviewsByProductResult,
} from './queries/get-reviews-by-product.query';

type ReviewResource = 'reviews';
export const ReviewResource = 'reviews' as const;

export type ReviewRepo = ZapatosRepo<ReviewResource> & {
  getReviewByName: (
    name: string
  ) => Promise<JSONSelectableForTable<ReviewResource> | null>;
  getReviewsByProduct: (productId: string) => Promise<{
    items: ReviewsByProductResult[];
    count: number;
  }>;
};

export const reviewRepoFactory = (runFragment: RunFragment): ReviewRepo => {
  const baseRepo = zapatosBaseRepoFactory(ReviewResource, runFragment);
  return {
    ...baseRepo,
    getReviewByName: async (name) => {
      return (
        (await runFragment(
          selectOne(ReviewResource, {
            name,
          } as WhereableForTable<ReviewResource>)
        )) ?? null
      );
    },
    getReviewsByProduct: async (productId) => {
      const { reviews, count } = getReviewsByProductQuery(productId);
      const countResult = await runFragment(count);
      return {
        items: await runFragment(reviews),
        count: countResult,
      };
    },
  };
};
