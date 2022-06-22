import { SQLFragment, sql, param, count } from 'zapatos/db';
import { reviews } from 'zapatos/schema';

export type ReviewsByProductResult = reviews.Selectable;

const obtainWhereSQLStatement = (
  productId: string
): SQLFragment<unknown[], never> => {
  const whereFragment = sql<reviews.SQL, ReviewsByProductResult[]>`
    ${'reviews'}.${'productId'} = (${param(productId)})`;
  return whereFragment;
};

export type SearchReviewsByProductQueryParams = {
  productId: string;
};

export const getReviewsByProductQuery = (
  productId: string
): {
  reviews: SQLFragment<ReviewsByProductResult[]>;
  count: SQLFragment<number, unknown>;
} => {
  const reviewFragment = sql<reviews.SQL, ReviewsByProductResult[]>`
  SELECT *
      FROM ${'reviews'}
      WHERE ${obtainWhereSQLStatement(productId)}
    `;
  return {
    reviews: reviewFragment,
    count: count('reviews', obtainWhereSQLStatement(productId)),
  };
};
